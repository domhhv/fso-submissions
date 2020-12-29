describe('Blog app', function() {
  const user = {
    name: 'Dominic Grishajev',
    username: 'dgrishajev',
    password: '123456'
  }

  const anotherUser = {
    name: 'Mickey Mouse',
    username: 'mmouse',
    password: 'qwerty',
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
  })

  describe('Logging in',function() {
    it('Succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#log-in-button').click()

      cy.contains(`${user.name} is logged in`)
    })

    it('Fails with wrong credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password.split('').reverse().join(''))
      cy.get('#log-in-button').click()

      cy.get('.notification-box__error')
        .should('contain', 'Wrong credentials, please try again')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', `${user.name} is logged in`)
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', function() {
      const blogTitle = 'A blog created by cypress'
      cy.contains('New blog').click()
      cy.get('#title').type(blogTitle)
      cy.get('#author').type('Author')
      cy.get('#url').type('http://some-url.com')
      cy.get('#create-blog-button').click()

      cy.contains(blogTitle)
    })

    describe('And a blog exists', function () {
      const blogs = [
        { title: 'First blog', author: 'First blog author', url: 'http://first-blog-url.com', likes: 0 },
        { title: 'Second blog', author: 'Second blog author', url: 'http://second-blog-url.com', likes: 42 },
        { title: 'Third blog', author: 'Third blog author', url: 'http://third-blog-url.com', likes: 21 },
      ]

      beforeEach(function () {
        blogs.forEach(blog => {
          cy.createBlog(blog)
        })
      })

      it('It can be liked', function () {
        cy.contains('First blog').parent().contains('view').click()
        cy.contains('First blog').parent().find('.like-button').click()
        cy.contains('First blog').parent().find('.likes-amount').contains(1)
      })

      it('It can be deleted', function () {
        const { title, author } = blogs[0]
        cy.contains(title).parent().contains('view').click()
        cy.contains(title).parent().contains('remove').click()
        cy.contains(`Deleted "${title}" by ${author}`)
      })

      it('It cannot be deleted by another user', function () {
        cy.request('POST', 'http://localhost:3003/api/users', anotherUser)
        cy.login({ username: anotherUser.username, password: anotherUser.password })
        cy.get('.blog-item').parent().contains('view').click()
        cy.get('.blog-item').parent().contains('remove').should('not.exist')
      })

      it('It displays blogs ordered by likes', function () {
        const sortedBlogs = blogs.sort((l, r) => r.likes - l.likes)

        cy.get('.blog-item').then(blogNodes => {
          sortedBlogs.forEach((blogItem, idx) => {
            cy.wrap(blogNodes[idx]).contains(sortedBlogs[idx].title)
          })
        })
      })
    })
  })
})
