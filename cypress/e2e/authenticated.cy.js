
import { faker } from '@faker-js/faker/locale/en'//en para gerar somemte em inglês

describe('Scenarios where authentication is a pre-condition', () => {
  beforeEach(() => { //executa antes de cada teste
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.sessionLogin()  //loga na sessão e em cada teste ele recupera a sessão
  })

  // let attachFile = false //tem que atribuir como LET para mudar, se for true, anexa um arquivo

  it('CRUDs a note', () => {
    const noteDescription = faker.lorem.words(4)

    cy.createNote(noteDescription)
    cy.wait('@getNotes')

    const updatedNoteDescription = faker.lorem.words(4) //gera outras 4 palavras aleatórias
    const attachFile = true

    cy.editNote(noteDescription, updatedNoteDescription, attachFile)
    cy.wait('@getNotes')//aguarda para voltar a lista de notas

    cy.deleteNote(updatedNoteDescription)
    cy.wait('@getNotes')
  })

  it('successfully submits the settings form', () => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')

    cy.fillSettingsFormAndSubmit()

    cy.wait('@getNotes')
    cy.wait('@paymentRequest')
      .its('state')
      .should('be.equal', 'Complete')
  })

  it('logs out', () => {
    cy.visit('/')
    cy.wait('@getNotes')

    if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) { //se for menor que 768px
      cy.get('.navbar-toggle.collapsed')
        .should('be.visible')
        .click()
    }

    cy.contains('.nav a', 'Logout').click()

    cy.get('#email').should('be.visible')
  })
})
