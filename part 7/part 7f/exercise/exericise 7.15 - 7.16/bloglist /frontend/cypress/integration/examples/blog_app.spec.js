describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'gaurav',
      password: 'anything',
      name: 'Gaurav Singh'
    })

    // cy.request({
    //   url: 'http://localhost:3003/login',
    //   body:
    // })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="username"]').type('gaurav')
      cy.get('input[name="password"]').type('anything')
      cy.get('#submit-button').click()
      cy.contains('logout').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="username"]').type('gaurav')
      cy.get('input[name="password"]').type('wrong password')
      cy.get('#submit-button').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input[name="username"]').type('gaurav')
      cy.get('input[name="password"]').type('anything')
      cy.get('#submit-button').click()
    })

    describe('user create own blog', function () {
      beforeEach(function () {
        cy.contains('create new note').click()
        cy.contains('title').find('input').type('created by gaurav test title')
        cy.contains('author').find('input').type('created by gaurav test author')
        cy.contains('url').find('input').type('created by gaurav test url')
        cy.get('#create-button').click()
      })

      it('A blog can be created', function () {
        cy.get('.added').should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('#logout-button').click()
      })

      it('make sure user can press like button', function () {
        // cy.contains('view').click()
        cy.get('#toggleViewHide-button').click()
        cy.get('#like-button').click()
        cy.get('#logout-button').click()
      })

      it('user can remove own blog', function () {
        cy.get('input[name="title"]').type('created by gaurav 2nd test title')
        cy.get('input[name="author"]').type('created by gaurav 2nd test author')
        cy.get('input[name="url"]').type('created by gaurav 2nd url')
        cy.get('#create-button').click()

        cy.get('#toggleViewHide-button').click()
        cy.get('#remove-button').click()
        cy.on('window:confirm', () => true)
        cy.get('#logout-button').click()

        cy.visit('http://localhost:3000')
        cy.request('POST', 'http://localhost:3003/api/users', {
          username: 'saurav',
          password: 'ant',
          name: 'Saurav Kumar'
        })

        cy.get('input[name="username"]').type('saurav')
        cy.get('input[name="password"]').type('ant')
        cy.get('#submit-button').click()

        cy.get('#toggleViewHide-button').click()
        cy.get('#remove-button').click()
        cy.on('window:confirm', () => false)
        cy.get('#logout-button').click()
      })
    })

    describe.only('blogs are highest likes ordered first', function () {
      beforeEach(function () {
        cy.contains('create new note').click()
        cy.get('input[name="title"]').type('1[gaurav] highest likes ordered first title')
        cy.get('input[name="author"]').type('1[gaurav] highest likes ordered first author')
        cy.get('input[name="url"]').type('1[gaurav] highest likes ordered first url')
        cy.get('#create-button').click()

        cy.get('input[name="title"]').type('[gaurav] 22 highest likes ordered first title')
        cy.get('input[name="author"]').type('[gaurav] 22 highest likes ordered first author')
        cy.get('input[name="url"]').type('[gaurav] 22 highest likes ordered first url')
        cy.get('#create-button').click()
        cy.get('#toggleViewHide-button').click()
        cy.get('#like-button').click()
        cy.get('#like-button').click()
        cy.get('#like-button').click()
        // cy.get('#toggleViewHide-button').click()

        // cy.get('input[name="title"]').type('333[gaurav] highest likes ordered first title')
        // cy.get('input[name="author"]').type('333[gaurav] highest likes ordered first author')
        // cy.get('input[name="url"]').type('333[gaurav] highest likes ordered first url')
        // cy.get('#create-button').click()

        // cy.get('input[name="title"]').type('[gaurav] 4444 highest likes ordered first title')
        // cy.get('input[name="author"]').type('[gaurav] 4444 highest likes ordered first author')
        // cy.get('input[name="url"]').type('[gaurav] 4444 highest likes ordered first url')
        // cy.get('#create-button').click()
      })

      it('check the highest likes', function () {
        cy.contains('likes 3')
        cy.get('#blogs-container > div').then(($div) => {
          // const cls = $div.attr('class')
          const cls = $div.find('button')
          console.log('cls', cls)
          console.log('$div', $div)
          console.log('$div[0]', $div[0])

          // cy.wrap($div).should('match', cls)
          cy.wrap($div).children().should('have.length', 2)
        })

      })
    })
  })
})