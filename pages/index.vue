<template>
  <div>
    <ul>
      <li v-for="article in articles">
        <div>
          <nuxt-link :to="`cikkek/${article.slug}`" class="block">
            <p class="text-xl font-semibold text-gray-900">
              {{ article.title }}
            </p>
            <p class="mt-3 text-base text-gray-500">
              {{ article.description }}
            </p>
          </nuxt-link>
          <div class="mt-6 flex items-center">
            <div class="flex-shrink-0">
              <nuxt-link :to="`cikkek/${article.slug}`">
                <span class="sr-only">{{ article.author.name }}</span>
                <img class="h-10 w-10 rounded-full" :src="require('~/assets/images/authors/szlegradi.jpg')"
                     :alt="article.author.name">
              </nuxt-link>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">
                <nuxt-link :to="`cikkek/${article.slug}`">
                  {{ article.author.name }}
                </nuxt-link>
              </p>
              <div class="flex space-x-1 text-sm text-gray-500">
                <time :datetime="formatDateTimeAttribute(article.createdAt)">
                  {{ formatDate(article.createdAt) }}
                </time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const articles = await $content('articles', params.slug)
        .only(['title', 'description', 'img', 'slug', 'author', 'createdAt'])
        .sortBy('createdAt', 'asc')
        .fetch()

    return {
      articles
    }
  },

  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('hu', options)
    },

    formatDateTimeAttribute (dateString) {
      const date = new Date(dateString)
      return date.toISOString()
    }
  }
}
</script>
