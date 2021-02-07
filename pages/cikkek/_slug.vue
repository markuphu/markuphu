<template>
  <nuxt-content :document="article" class="prose mx-auto"/>
</template>

<script>
export default {
  head () {
    const title = `${this.article.title} - <markup>`

    return {
      title,

      meta: [
        {
          hid: 'title',
          name: 'title',
          content: title
        },
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://markup.hu/cikkek/${this.$route.params.slug}`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.article.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.article.image ?? '',
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `https://markup.hu/cikkek/${this.$route.params.slug}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.article.description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.article.image ?? '',
        },
        {
          hid: 'twitter:label1',
          name: 'twitter:label1',
          content: 'Written by'
        },
        {
          hid: 'twitter:data1',
          name: 'twitter:data1',
          content: this.article.author.name.split(' ').reverse().join(' ')
        },
        {
          hid: 'twitter:label2',
          name: 'twitter:label2',
          content: 'Filed under'
        },
        {
          hid: 'twitter:data2',
          name: 'twitter:data2',
          content: this.article.tags ? this.article.tags.join(', ') : '',
        },
        {
          hid: 'article:published_time',
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          hid: 'article:modified_time',
          property: 'article:modified_time',
          content: this.article.updatedAt,
        },
        {
          hid: 'article:tag',
          property: 'article:tag',
          content: this.article.tags ? this.article.tags.join(', ') : '',
        }
      ]
    }
  },

  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  }
}
</script>
