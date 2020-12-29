import React from 'react'

const LoginForm = ({ submit, setUsername, setPassword }) => (
  <form onSubmit={submit}>
    <div>
      <label htmlFor="username">Username</label>
      &nbsp;
      <input type="text" id="username" name="username" onChange={setUsername}/>
    </div>
    <div>
      <label htmlFor="password">Password</label>
      &nbsp;
      <input type="password" id="password" name="password" onChange={setPassword}/>
    </div>
    <button id="log-in-button" type="submit">Log in</button>
  </form>
)

export default LoginForm
