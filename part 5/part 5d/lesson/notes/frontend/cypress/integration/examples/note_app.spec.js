describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  // it('user can log in', function () {
  //   cy.contains('login').click()
  //   cy.get('#username').type('gaurav')
  //   cy.get('#password').type('anything')
  //   cy.get('#login-button').click()

  //   cy.contains('gaurav logged-in')
  // })

  // it.only('login fails with wrong password', function() {
  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('not right password')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  describe('when logged in', function () {
    // beforeEach(function () {
    //   cy.contains('login').click()
    //   cy.get('input:first').type('mluukkai')
    //   cy.get('input:last').type('salainen')
    //   cy.get('#login-button').click()
    // })

    // beforeEach(function() {
    //   cy.request('POST', 'http://localhost:3001/api/login', {
    //     username: 'mluukkai', password: 'salainen'
    //   }).then(response => {
    //     localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
    //     cy.visit('http://localhost:3000')
    //   })
    // })

    beforeEach(function (){
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        // cy.contains('second note')
        //   .contains('make important')
        //   .click()

        // cy.contains('second note').parent().find('button').click()
        // cy.contains('second note').parent().find('button')
        //   .should('contain', 'make not important')

        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })

      // it.only('then example', function() {
      //   cy.get('button').then( buttons => {
      //     console.log('number of buttons', buttons.length)
      //     cy.wrap(buttons[0]).click()
      //   })
      // })

    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      // beforeEach(function () {
      //   cy.contains('new note').click()
      //   cy.get('input').type('another note cypress')
      //   cy.contains('save').click()
      // })

      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('it can be made important', function () {
        // cy.contains('another note cypress')
        //   .contains('make important')
        //   .click()

        cy.contains('another note cypress').parent().find('button').click()
        cy.contains('another note cypress').parent().find('button')
          .should('contain', 'make not important')

        // cy.contains('another note cypress')
        //   .contains('make not important')
      })
    })
  })

})
