import React from 'react'

const BlogItem = ({ title, author }) => (
  <li>
    {title} <b>by</b> {author}
  </li>
)

export default BlogItem
