<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="relative bg-gray-800 min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
  >
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3"></div>
    </div>
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center">
        <h2
          class="text-3xl tracking-tight font-extrabold font-heading text-white sm:text-4xl"
        >
          MarioWhoWrites
        </h2>
        <p
          class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-body"
        >
          Words about various subjects.
        </p>
      </div>
      <aside id="CategorySelect" class="max-w-lg mx-auto mt-8 mb-12 flex">
        <BlogIndexCategoryButton
          v-for="category in categories"
          :key="category"
          :category="category"
          :selected-category="selectedCategory"
          @select-category="selectCategory"
        />
      </aside>
      <div class="mt-12 max-w-lg mx-auto flex flex-col">
        <BlogIndexArticle
          v-for="article in filteredArticles"
          :key="article.title"
          :article="article"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'category', 'image'])
      .sortBy('createdAt', 'asc')
      .fetch()

    return {
      articles,
    }
  },

  data() {
    return {
      selectedCategory: null,
    }
  },

  computed: {
    categories() {
      const categories = new Set(
        this.articles.map(({ category }) => category)
      ).values()

      console.debug('categories', categories)

      return categories
    },

    filteredArticles() {
      if (this.selectedCategory === null) {
        return this.articles
      }

      return this.articles.filter(
        ({ category }) => category === this.selectedCategory
      )
    },
  },

  methods: {
    selectCategory(category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null
        return
      }

      this.selectedCategory = category
    },
  },
}
</script>
