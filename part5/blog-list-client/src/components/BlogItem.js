import React, { useState } from 'react'

import BlogDetails from './BlogDetails'

const BlogItem = ({
  id,
  title,
  author,
  likes,
  url,
  user,
  updateLikes,
  removeBlog,
  currentUserUsername,
}) => {
  const blogItemStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)

  return (
    <li style={blogItemStyle} className="blog-item">
      {title} <b>by</b> {author}
      <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {detailsVisible ? 'hide' : 'view'}
      </button>
      {detailsVisible && (
        <BlogDetails
          id={id}
          likes={likes}
          url={url}
          user={user}
          updateLikes={updateLikes}
          removeBlog={removeBlog}
          currentUserUsername={currentUserUsername}
        />
      )}
    </li>
  )
}

export default BlogItem
