import React, { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogsList from './components/BlogsList'
import Togglable from './components/Togglable'
import { Notification, NOTIFICATION_STATES } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { withValue, preventify } from './utils'

const authKey = 'blogListAppLoggedInUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationState, setNotificationState] = useState('')
  const [cleanUpMessageTimeoutId, setCleanUpMessageTimeoutId] = useState(null)
  const togglableBlogFormRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    setUser(
      JSON.parse(
        window.localStorage.getItem(authKey)
      )
    )
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((l, r) => r.likes - l.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  const clearMessage = () => {
    setNotificationMessage('')
    setNotificationState('')
  }

  const scheduleMessageCleanUp = delay => window.setTimeout(clearMessage, delay)

  const notify = ({ message, state }) => {
    window.clearTimeout(cleanUpMessageTimeoutId)
    setNotificationMessage(message)
    setNotificationState(state)
    setCleanUpMessageTimeoutId(
      scheduleMessageCleanUp(5000)
    )
  }

  const logIn = async () => {
    try {
      const user = await loginService.logIn({ username, password })
      window.localStorage.setItem(authKey, JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      notify({
        state: NOTIFICATION_STATES.SUCCESS,
        message: 'Logged in',
      })
    } catch (e) {
      notify({
        state: NOTIFICATION_STATES.ERROR,
        message: 'Wrong credentials, please try again',
      })
    }
  }

  const logOut = () => {
    window.localStorage.removeItem(authKey)
    setUser(null)
    notify({
      state: NOTIFICATION_STATES.SUCCESS,
      message: 'Logged out',
    })
  }

  const addBlog = async ({ title, author, url }) => {
    try {
      setBlogs([...blogs, await blogService.create({ title, author, url }, user.token)]) // eslint-disable-line
      notify({
        state: NOTIFICATION_STATES.SUCCESS,
        message: `A new blog "${title}" by ${author} added`,
      })
      togglableBlogFormRef.current.toggleVisibility()
    } catch (exception) {
      notify({
        state: NOTIFICATION_STATES.ERROR,
        message: exception.response.data.error,
      })
      return Promise.reject()
    }
  }

  const updateLikes = async (blogId, likes) => {
    try {
      const blogToUpdate = blogs.find(({ id }) => id === blogId)
      const blogData = {
        author: blogToUpdate.author,
        title: blogToUpdate.title,
        url: blogToUpdate.url,
        user: blogToUpdate.user.id,
        likes,
      }
      const updatedBlog = await blogService.update(blogId, blogData)
      notify({
        state: NOTIFICATION_STATES.SUCCESS,
        message: `Liked "${updatedBlog.title}" by ${updatedBlog.author}`,
      })
      const newBlogs = blogs.reduce((acc, blog) => {
        if (blog.id === updatedBlog.id) {
          return [...acc, updatedBlog]
        }

        return [...acc, blog]
      }, [])
      setBlogs(newBlogs)
    } catch (exception) {
      notify({
        state: NOTIFICATION_STATES.ERROR,
        message: exception.response.data.error || 'Error while updating the blog',
      })
      return Promise.reject()
    }
  }

  const removeBlog = async blogId => {
    try {
      const blogToDelete = blogs.find(({ id }) => id === blogId)
      if (window.confirm(`Delete ${blogToDelete.title} by ${blogToDelete.author}`)) {
        await blogService.remove(blogId, user.token)
        const newBlogs = blogs.filter(({ id }) => id !== blogId)
        notify({
          state: NOTIFICATION_STATES.SUCCESS,
          message: `Deleted "${blogToDelete.title}" by ${blogToDelete.author}`,
        })
        setBlogs(newBlogs)
      }
    } catch (exception) {
      notify({
        state: NOTIFICATION_STATES.ERROR,
        message: exception.response.data.error || 'Error while deleting the blog',
      })
      return Promise.reject()
    }
  }

  const handleBlogFormCancel = () => {
    blogFormRef.current.clearFields()
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMessage} state={notificationState} />
      {!user && (
        <LoginForm
          submit={preventify(logIn)}
          setUsername={withValue(setUsername)}
          setPassword={withValue(setPassword)}
        />
      )}
      {user && (
        <>
          <BlogsList
            user={user}
            logOut={logOut}
            blogs={blogs}
            updateLikes={updateLikes}
            removeBlog={removeBlog}
          />
          <Togglable buttonLabel="New blog" ref={togglableBlogFormRef} onCancel={handleBlogFormCancel}>
            <BlogForm addBlog={addBlog} ref={blogFormRef} />
          </Togglable>
        </>
      )}
    </div>
  )
}

export default App
