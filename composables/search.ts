import MiniSearch from 'minisearch'

export function useIndexedMiniSearch(search: Ref<string>, data: Ref<string>) {
  const indexedMiniSearch = computed(() => MiniSearch.loadJSON(data.value, {
    fields: ['title', 'content'],
    storeFields: ['title', 'content'],
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      boost: {
        title: 4,
        content: 2,
        titles: 1,
      },
    },
  }))

  const results = computed(() => {
    return indexedMiniSearch.value.search(search.value)
  })

  return results
}
