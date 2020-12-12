import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import BlogItem from './BlogItem'

describe('<BlogItem />', () => {
  let component
  let blogItemNode
  let author
  let title
  let url
  let likes
  let updateLikes

  beforeEach(() => {
    title = 'Title'
    author = 'Author'
    url = 'www.some-url.com'
    likes = 42
    updateLikes = jest.fn()
    const blogItemProps = {
      id: 'id',
      title,
      author,
      likes,
      url,
      updateLikes,
      user: {},
    }
    component = render(<BlogItem {...blogItemProps} />)
    blogItemNode = component.container.querySelector('.blog-item')
  })

  test('initially displays only title and author', () => {
    expect(blogItemNode).toHaveTextContent(title)
    expect(blogItemNode).toHaveTextContent(author)
    expect(blogItemNode).not.toHaveTextContent(url)
    expect(blogItemNode).not.toHaveTextContent(likes)
  })

  test('displays url and likes amount upon clicking the "view" button', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(blogItemNode).toHaveTextContent(url)
    expect(blogItemNode).toHaveTextContent(likes)
  })

  test('clicks like button properly', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateLikes.mock.calls).toHaveLength(2)
  })
})
