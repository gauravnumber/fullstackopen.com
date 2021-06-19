import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`


// export const ALL_BOOKS = gql`
// query {
//   allBooks {
//     title 
//     author
//     published
//   }
// }
// `

export const ALL_BOOKS = gql`
  query {
    allBooks{
      title
      genres
      author {
        name
        born
      }
      published
    }
  }
`
export const ADD_BOOK = gql`
  mutation createBook (
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const EDIT_AUTHOR_BORN = gql`
  mutation editAuthor(
    $name: String!,
    $born: Int!
  ) {
      editAuthor(
        name: $name, 
        setBornTo: $born
      ) {
        name
        born
    }
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  
  }
`