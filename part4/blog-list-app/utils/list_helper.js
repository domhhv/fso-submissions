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

module.exports = { dummy, totalLikes, favoriteBlog }
