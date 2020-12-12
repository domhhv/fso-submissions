import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls submit handler with the right details', () => {
    const addBlog = jest.fn()
    const component = render(<BlogForm addBlog={addBlog} />)
    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const titleInputValue = 'A title input'
    const authorInputValue = 'An author input'
    const urlInputValue = 'A url input'

    const composeOptions = value => ({ target: { value } })

    fireEvent.change(titleInput, composeOptions(titleInputValue))
    fireEvent.change(authorInput, composeOptions(authorInputValue))
    fireEvent.change(urlInput, composeOptions(urlInputValue))
    fireEvent.submit(form)

    const submitFnCalls = addBlog.mock.calls
    const [[submitFnArgs]] = submitFnCalls
    const { title, author, url } = submitFnArgs

    expect(submitFnCalls).toHaveLength(1)
    expect(title).toEqual(titleInputValue)
    expect(author).toEqual(authorInputValue)
    expect(url).toEqual(urlInputValue)
  })
})
