describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Matti Luukkainen is logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      const blog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      }
      cy.contains('create').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#submit-button').click()

      cy.get('.success')
        .should('contain', `a new blog ${blog.title} added`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains(`${blog.title} ${blog.author}`)
      cy.contains('view').click()
      cy.contains(`${blog.url}`)
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 6
        })
      })

      it('users can like a blog', function () {
        cy.contains('view').click()
        cy.get('.like-button').click()
        cy.contains('likes 7')
      })

      it('the user who added the blog can delete it', function () {
        cy.on('window.confirm', () => true)

        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.success')
          .should('contain', 'Go To Statement Considered Harmful deleted!')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
        cy.should('not.contain', 'Go To Statement Considered Harmful deleted! Edsger W. Dijkstra')
      })

      it('other user cannot delete the blog', function () {
        const user = {
          name: 'Arto Hellas',
          username: 'hellas',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.contains('logout').click()
        cy.login({ username: 'hellas', password: 'salainen' })

        cy.on('window.confirm', () => true)
        cy.contains('view').click()
        cy.should('not.contain', 'remove')

        cy.contains('Go To Statement Considered Harmful Edsger W. Dijkstra')
      })

      describe('and many blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
          })
          cy.createBlog({
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
          })
        })

        it('the blogs are ordered according to likes, with the blog with most likes being first', function () {
          cy.get('.view-button').click({ multiple: true })
          cy.get('.blog')
            .then((blog) => {
              cy.wrap(blog[0]).contains('likes 12')
              cy.wrap(blog[1]).contains('likes 7')
              cy.wrap(blog[2]).contains('likes 6')

              cy.wrap(blog[2]).contains('like').click()
              cy.wait(500)
              cy.wrap(blog[2]).contains('like').click()
              cy.wait(500)
            })
          cy.get('.blog')
            .then((blog) => {
              cy.wrap(blog[0]).contains('likes 12')
              cy.wrap(blog[1]).contains('likes 8')
              cy.wrap(blog[2]).contains('likes 7')
            })
        })
      })
    })
  })
})
