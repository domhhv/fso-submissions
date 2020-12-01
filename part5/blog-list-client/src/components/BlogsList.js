import React from 'react'

import BlogItem from './BlogItem'

const BlogsList = ({ user, logOut, blogs }) => (
  <>
    <div>
      <span>{user.user} is logged in</span>
      &nbsp;
      <button onClick={logOut}>Log out</button>
    </div>
    <br/>
    {
      blogs.length
        ? (
          <ul>
            {blogs.map(blog => <BlogItem key={blog.id} {...blog} />)}
          </ul>
        )
        : <p>No blogs yet</p>
    }
  </>
)

export default BlogsList
