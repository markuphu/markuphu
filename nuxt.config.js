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
        hid: 'title',
        name: 'title',
        content: '<markup>'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Légrádi Szabolcs szakmai blogja webfejlesztéshez kapcsolódó témákban.'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://markup.hu'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: '<markup>'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Légrádi Szabolcs szakmai blogja webfejlesztéshez kapcsolódó témákban.'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '',
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://markup.hu'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: '<markup>'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Légrádi Szabolcs szakmai blogja webfejlesztéshez kapcsolódó témákban.'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '',
      }
    ]
  }
}
