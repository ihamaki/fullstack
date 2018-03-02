import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, onBlogLike }) => {
  return (
    <div>
      <h3>List of blogs</h3>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} onBlogLike={onBlogLike} />)}
    </div>
  )
}

export default BlogList