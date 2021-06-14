const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { v1: uuid } = require('uuid')

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


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['Agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'Revolution']
  },
]

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
      // const authors = new Author.find({})
      return Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Author: {
    bookCount: async (root) => {
      // console.log('root', root)
      const times = await Book.findOne({ author: root._id }).countDocuments()
      // console.log('times', times)
      return times
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      // console.log('currentUser', currentUser)
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
        // console.log('author', author)

        const book = new Book({
          author: author._id,
          title: args.title,
          published: args.published,
          genres: args.genres
        })

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

        return await book.save().catch(error => {
          throw new UserInputError(error.message)
        })
      }

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
      // console.log('root: editAuthor', root)
      // console.log('root: args', args)
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })

      if (author === undefined) return null

      // console.log('root', root)
      // console.log('author', author)

      return await author.save()

      // return {
      //   name: author.name,
      //   born: args.setBornTo
      // }
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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
