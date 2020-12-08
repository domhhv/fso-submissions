import React from 'react'

import BlogItem from './BlogItem'

const BlogsList = ({ user, logOut, blogs, updateLikes, removeBlog }) => (
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
            {blogs.map(blog => (
              <BlogItem
                key={blog.id}
                {...blog}
                updateLikes={updateLikes}
                removeBlog={removeBlog}
                currentUserUsername={user.username}
              />
            ))}
          </ul>
        )
        : <p>No blogs yet</p>
    }
  </>
)

export default BlogsList
