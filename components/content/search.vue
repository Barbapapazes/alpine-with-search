<script lang="ts" setup>
const { data } = await useFetch('/api/search')

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: 'Cannot find search data',
  })
}

const search = ref('')

const results = useIndexedMiniSearch(search, data as Ref<string>)
</script>

<template>
  <!-- Add the style you want -->
  <div>
    <h1>Search</h1>

    <input v-model="search" type="text" placeholder="Search">

    <p>
      {{ results.length }} results
    </p>

    <ol v-if="results.length">
      <li v-for="result in results" :key="result.id">
        <NuxtLink :to="result.id">
          {{ result.title }}, go to {{ result.id }}
        </NuxtLink>
      </li>
    </ol>

    <p v-else>
      No results
    </p>
  </div>
</template>
