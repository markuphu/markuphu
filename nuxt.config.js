export default {
  target: 'static',
  modules: ['@nuxt/content'],
  buildModules: ['@nuxtjs/tailwindcss'],
  plugins: [{ src: '~/plugins/gtag.client.js' }],
  loading: false,
  components: true,

  head: {
    title: '<markup>',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Légrádi Szabolcs szakmai blogja webfejlesztéshez kapcsolódó témákban.'
      }
    ]
  }
}
