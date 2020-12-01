import React, { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogsList from './components/BlogsList'
import { Notification, NOTIFICATION_STATES } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const authKey = 'blogListAppLoggedInUser'

const withValue = callback => ({ target: { value } }) => callback(value)

const preventify = callback => event => {
  event.preventDefault()
  callback()
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationState, setNotificationState] = useState('')
  const [cleanUpMessageTimeoutId, setCleanUpMessageTimeoutId] = useState(null)

  useEffect(() => {
    setUser(
      JSON.parse(
        window.localStorage.getItem(authKey)
      )
    )
    const loadBlogs = async () => setBlogs(await blogService.getAll())
    loadBlogs()
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
      const user = await loginService.logIn({ username, password})
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

  const addNote = async () => {
    try {
      setBlogs([...blogs, await blogService.create({ title, author, url }, user?.token)])
      notify({
        state: NOTIFICATION_STATES.SUCCESS,
        message: `A new blog "${title}" by ${author} added`,
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      notify({
        state: NOTIFICATION_STATES.ERROR,
        message: exception?.response?.data?.error,
      })
    }
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
          <BlogsList user={user} logOut={logOut} blogs={blogs} />
          <BlogForm
            setTitle={withValue(setTitle)}
            setAuthor={withValue(setAuthor)}
            setUrl={withValue(setUrl)}
            submit={preventify(addNote)}
          />
        </>
      )}
    </div>
  )
}

export default App
