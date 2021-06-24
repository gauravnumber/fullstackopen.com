const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
  PubSub,
} = require('apollo-server')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'secret key'

const MONGODB_URI = 'mongodb+srv://fullstack:passwordoffullstack@cluster0.23qc1.mongodb.net/library?retryWrites=true'
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

mongoose.set('debug', true)

const pubsub = new PubSub()

const typeDefs = gql`
  type Book {
  	title: String!
  	author: Author!
  	published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String
    born: Int
  	bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
  	bookCount: Int!
  	authorCount: Int!
  	allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
  }


  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (Object.keys(args).length === 0) {
        return await Book.find({}).populate('author')
      }
      if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book
          .find({ author: author._id })
          .populate('author')
          .then(books => {
            return books.filter(book => book.genres.includes(args.genre))
          })

        return books
      }

      if (args.genre) {
        return await Book.find({ genres: { $in: args.genre } })
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book
          .find({ author: author._id })
          .populate('author')
          .then(books => {
            return books
          })

        return books
      }
    },

    allAuthors: (root, args) => {
      return Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Author: {
    bookCount: async (root) => {
      const times = await Book.findOne({ author: root._id }).countDocuments()
      return times
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.author })
      if (!author) {
        const author = await Author({ name: args.author })
        await author.save().catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args.author,
          })
        })

        const book = new Book({
          author: author._id,
          title: args.title,
          published: args.published,
          genres: args.genres
        })

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        // await book.save()
        // pubsub.publish('BOOK_ADDED', { bookAdded: book })
        // return 

        return await book.save().catch(error => {
          throw new UserInputError(error.message)
        })
      } else {
        const book = new Book({
          author: author._id,
          title: args.title,
          published: args.published,
          genres: args.genres
        })

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return await book.save().catch(error => {
          throw new UserInputError(error.message)
        })
      }

      // pubsub.publish('BOOK_ADDED', { bookAdded: book })
    },

    // addAuthor: async (root, args, { currentUser }) => {
    addAuthor: (root, args) => {
      // if (!currentUser) {
      //   throw new AuthenticationError('not authenticated')
      // }
      const author = new Author(args)
      return author.save()
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })

      if (author === undefined) return null

      return await author.save()
    },

    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })

    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new AuthenticationError('wrong credentials')
      }

      const userForToken = {
        username: args.username,
        id: user._id
      }

      return {
        value: jwt.sign(userForToken, JWT_SECRET)
      }

    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
