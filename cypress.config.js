const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false, //desabilita segurança do chrome para utilizar o cartao iframe
  e2e: {
    baseUrl: 'https://notes-serverless-app.com',
    env: {
      viewportWidthBreakpoint: 768, //ate 768px é web, abaixo é mobile
    },
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config)
      return config
    },
    defaultCommandTimeout: 50000, // comando padrão de tempo limite para não tomar timeout padrão 4000ms
  },
  projectId: 'your-project',
})
