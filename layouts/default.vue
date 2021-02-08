<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col min-h-screen max-w-7xl mx-auto">
      <AppHeader />
      <div class="flex-1">
        <Nuxt class="bg-white px-4 sm:px-6" />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

export default {
  components: { AppHeader, AppFooter }
}
</script>
