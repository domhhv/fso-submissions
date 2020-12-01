import React from 'react'

const BlogForm = ({ setTitle, setAuthor, setUrl, submit }) => (
  <form onSubmit={submit}>
    <h2>Create new</h2>
    <div>
      <label htmlFor="title">Title</label>
      &nbsp;
      <input type="text" id="title" name="title" onChange={setTitle} />
    </div>
    <div>
      <label htmlFor="author">Author</label>
      &nbsp;
      <input type="text" id="author" name="author" onChange={setAuthor} />
    </div>
    <div>
      <label htmlFor="url">URL</label>
      &nbsp;
      <input type="text" id="url" name="url" onChange={setUrl} />
    </div>
    <button type="submit">Submit</button>
  </form>
)

export default BlogForm
