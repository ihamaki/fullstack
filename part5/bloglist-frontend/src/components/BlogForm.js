import React from 'react'

const BlogForm = ({ state, onSubmit, onBlogFormChange }) => {
  return (
    <div>
      <h3>Add a new blog</h3>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input name="newTitle" value={state.newTitle} onChange={onBlogFormChange} />
        </div>
        <div>
          author:
          <input name="newAuthor" value={state.newAuthor} onChange={onBlogFormChange} />
        </div>
        <div>
          url:
          <input name="newUrl" value={state.newUrl} onChange={onBlogFormChange} />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm