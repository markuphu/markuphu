<template>
  <nuxt-content :document="article" class="prose mx-auto" />
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  }
}
</script>
