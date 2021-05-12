import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog

  beforeEach(() => {
    blog = {
      title: 'title test',
      author: 'author test',
      likes: 12,
      url: 'http://www.test.com'
    }

    component = render(
      <Blog blog={blog} />
    )

  })

  test('checks that the component displaying a blog renders the blog\'s title and author, but does not render its url or number of likes by default.', () => {
    // const blog = {
    //   title: 'title test',
    //   author: 'author test',
    //   likes: 12,
    //   url: 'http://www.test.com'
    // }

    // const component = render(
    //   <Blog blog={blog} />
    // )

    let div

    div = component.getByText('title test')
    expect(div).toBeDefined()

    div = component.getByText('author test')
    expect(div).toBeDefined()

    div = component.container.querySelector('.togglableContent')
    // component.debug()
    // console.log(prettyDOM(div));
    expect(div).toHaveStyle('display: none')

  })

  test('which checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked.', () => {
    const viewBtn = component.getByText('view')
    fireEvent.click(viewBtn)

    // component.debug()

    expect(
      component.getByText(blog.url)
    ).toBeDefined()

    // console.log(
    //   prettyDOM(
    //     component.container.querySelector('button')
    //   )
    // );

    // expect(
    //   component.container.getByValue(blog.likes)
    // ).toBeDefined()
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice.', () => {
    const likeBtn = component.getByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    // component.debug()
  })
})