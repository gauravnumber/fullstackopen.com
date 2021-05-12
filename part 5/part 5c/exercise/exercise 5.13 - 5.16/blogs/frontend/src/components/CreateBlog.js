import React from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({
  handleCreateBlog,
  title,
  author,
  url,
  handleTitle,
  handleAuthor,
  handleUrl
}) => {
  return(
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={handleAuthor}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleUrl}
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>

    </form>
  )

}

CreateBlog.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  handleAuthor: PropTypes.func.isRequired,
  handleUrl: PropTypes.func.isRequired

}

export default CreateBlog