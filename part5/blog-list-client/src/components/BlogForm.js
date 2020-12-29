import React, { useState, useImperativeHandle, forwardRef } from 'react'

import { withValue, preventify } from '../utils'

const BlogForm = forwardRef(({ addBlog }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useImperativeHandle(ref, () => ({ clearFields }))

  const handleSubmit = () => {
    const promise = addBlog({ title, author, url })

    if (promise) {
      promise.then(clearFields)
    }
  }

  return (
    <form onSubmit={preventify(handleSubmit)}>
      <h2>Create new</h2>
      <div>
        <label htmlFor="title">Title</label>
        &nbsp;
        <input type="text" id="title" name="title" value={title} onChange={withValue(setTitle)} />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        &nbsp;
        <input type="text" id="author" name="author" value={author} onChange={withValue(setAuthor)} />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        &nbsp;
        <input type="text" id="url" name="url" value={url} onChange={withValue(setUrl)} />
      </div>
      <button id="create-blog-button" type="submit">Submit</button>
    </form>
  )
})

BlogForm.displayName = 'BlogForm'

export default BlogForm
