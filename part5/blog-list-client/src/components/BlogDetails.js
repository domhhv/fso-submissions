import React from 'react'

const BlogDetails = ({
  id,
  url,
  likes,
  user,
  updateLikes,
  removeBlog,
  currentUserUsername,
}) => (
  <>
    <div>
      <span>{url}</span>
    </div>
    <div>
      <span>likes {likes}</span>
      <button onClick={() => updateLikes(id, likes + 1)}>like</button>
    </div>
    <div>
      <span>{user.name}</span>
    </div>
    <div>
      {currentUserUsername === user.username && <button onClick={() => removeBlog(id)}>remove</button>}
    </div>
  </>
)

export default BlogDetails
