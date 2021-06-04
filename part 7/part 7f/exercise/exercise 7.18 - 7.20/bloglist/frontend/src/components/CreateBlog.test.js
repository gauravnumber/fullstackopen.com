import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {
  it('check, that the form calls the event handler it received as props with the right details when a new blog is created.', () => {
    const createBlog = jest.fn()
    const handleChange = ({ target }) => target.value
    const blog ={
      title: 'title test',
      author: 'author test',
      likes: 17,
      url: 'http://www.test.com'
    }

    const component = render(
      <CreateBlog 
        handleCreateBlog={createBlog}
        title={blog.title}
        author={blog.author}
        url={blog.url}
        handleTitle={handleChange}
        handleAuthor={handleChange}
        handleUrl={handleChange}
      />
    )

    const title = component.container.querySelector('input[name="title"]')
    expect(title).toHaveValue(blog.title)
    
    const author = component.container.querySelector('#author')
    expect(author).toHaveValue(blog.author)

    const url = component.container.querySelector('input[name="url"]')
    expect(url).toHaveValue(blog.url)

    
  })
})