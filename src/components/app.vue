<template>
  <div class="app">
    <router-view></router-view>

  </div>
</template>

<script>
  import store from '../store'
  // import { getDefaultCity } from '../vuex/actions'
  import { mapActions } from 'vuex'
  export default {
    created () {
      this.getDefaultCity()
    },
    methods: {
      ...mapActions([
        'getDefaultCity'
      ])
    },
    store: store
  }
</script>