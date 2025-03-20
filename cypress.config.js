const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false, //desabilita segurança do chrome para utilizar o cartao iframe
  e2e: {
    baseUrl: 'https://notes-serverless-app.com',
    env: {
      viewportWidthBreakpoint: 768, //ate 768px é web, abaixo é mobile
    },
    defaultCommandTimeout: 50000, // comando padrão de tempo limite para não tomar timeout padrão 4000ms
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
