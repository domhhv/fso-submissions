const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((total, { likes }) => total + likes, 0)

const favoriteBlog = blogs => {
  const found = blogs.reduce(
    (favorite, blog) => (
      blog.likes > favorite.likes
        ? blog
        : favorite
    ),
    { likes: 0 },
  )

  if (found.likes) {
    const { title, author, likes } = found

    return { title, author, likes }
  }

  return 0
}

const mostBlogs = blogs => {
  const map = blogs.reduce((mapped, { author }) => {
    mapped[author] = mapped[author] || {
      author: author,
      blogs: 0,
    }

    mapped[author].blogs++

    return mapped
  }, {})

  const max = Object.values(map).reduce(
    (most, item) => (
      most.blogs > item.blogs
        ? most
        : item
    ),
    { blogs: 0 },
  )

  return max
}

const mostLikes = blogs => {
  const map = blogs.reduce((mapped, { author, likes }) => {
    mapped[author] = mapped[author] || {
      author: author,
      likes: 0,
    }

    mapped[author].likes += likes

    return mapped
  }, {})

  const max = Object.values(map).reduce(
    (most, item) => (
      most.likes > item.likes
        ? most
        : item
    ),
    { likes: 0 },
  )

  return max
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
