import React, { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const hideWhenVisible = { display: isVisible ? 'none' : 'block' }
  const showWhenVisible = { display: isVisible ? 'block' : 'none' }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)

    if (typeof props.onCancel === 'function') {
      props.onCancel()
    }
  }

  useImperativeHandle(ref, () => ({ toggleVisibility }))

  return (
    <>
      <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
