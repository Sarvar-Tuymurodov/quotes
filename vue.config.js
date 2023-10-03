const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/sass/_mixins.sass"
          @import "@/assets/sass/_fonts.sass"
          @import "@/assets/sass/_variables.sass"
          @import "@/assets/sass/_normalize.sass"
        `
      }
    }
  }
};