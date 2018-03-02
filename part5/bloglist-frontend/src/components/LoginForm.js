import React from 'react'

const LoginForm = ({ state, handleFieldChange, handleLogin }) => {
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
        <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          password
        <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleFieldChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm