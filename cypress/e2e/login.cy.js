/// <reference path="../support/commands.d.ts" />

describe('Login', () => {
  it('successfully logs in', () => {
    cy.intercept('GET', '**/notes').as('getNotes') // ao executar o login ele carrega notes (olhando o no intercep do network no navegador)
    cy.guiLogin() // aqui ele chama o login do commands.js
    cy.wait('@getNotes') // por isso aqui aguarda a resposta do getNotes para depois continuar e verificar a primeira pagina


    cy.contains('a', 'Create a new note').should('be.visible')
  })
})

