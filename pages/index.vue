<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
  export default {
    async asyncData ({ route, store, redirect }) {
      const url = route.path.replace('/', '')

      try {
        if (url.length) {
          let selectedFilm

          if (store.state.films.data && store.state.films.data.length) {
            selectedFilm = store.state.films.data.filter(film => film.description.url === url)[0]
            store.dispatch('film/selectFilm', selectedFilm)
          } else {
            selectedFilm = await store.dispatch('film/getFilmByName', { url })
          }

          return {
            selectedFilm
          }
        } else {
          redirect('/home')
          return null
        }
      } catch (e) {
        console.log(e)
      }
    },
    head () {
      if (this.selectedFilm) {
        return {
          meta: [
            { property: 'og:url', content: `${process.env.baseUrl}/${this.selectedFilm.description.url}` },
            { hid: 'og:title', name: 'og:title', content: `${this.selectedFilm.description.name}` },
            { property: 'og:description', content: `${this.selectedFilm.description.description_short}` },
            { property: 'og:image', content: this.selectedFilm.description.image_mobile },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:type', content: 'image/png' }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
