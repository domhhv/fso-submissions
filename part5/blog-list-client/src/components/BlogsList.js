import React from 'react'
import PropTypes from 'prop-types'

import BlogItem from './BlogItem'

const BlogsList = ({ user, logOut, blogs, updateLikes, removeBlog }) => (
  <>
    <div>
      <span>{user.name} is logged in</span>
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

BlogsList.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }),
  logOut: PropTypes.func.isRequired,
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      })
    })
  ),
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default BlogsList
