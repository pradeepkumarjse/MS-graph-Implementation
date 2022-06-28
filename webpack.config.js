module.exports = {
  chainWebpack: config => {
      // ...other chains
      config.module // fixes https://github.com/graphql/graphql-js/issues/1272
          .rule('mjs$')
          .test(/\.mjs$/)
          .include
              .add(/node_modules/)
              .end()
          .type('javascript/auto');
  },
  configureWebpack: {
      resolve: {
          // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
          extensions: ['*', '.mjs', '.js', '.vue', '.json']
      }
  }
}