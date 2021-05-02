import React from 'react'

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

export default CreateBlog