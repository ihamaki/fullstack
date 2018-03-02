import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, onBlogLike, onBlogDelete }) => {
  const compareLikes = (first, second) => {
    return second.likes - first.likes
  }
  blogs.sort(compareLikes)

  return (
    <div>
      <h3>List of blogs</h3>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          onBlogLike={onBlogLike}
          onBlogDelete={onBlogDelete}
        />)}
    </div>
  )
}

export default BlogList