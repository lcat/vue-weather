<template>
  <div class="main-header header">
    <div class="header-icon" @click="showBar">
      <i class="iconfont">&#xe628;</i>
    </div>
    <div class="header-cont"></div>
    <div class="header-icon">
      <i class="iconfont refresh" @click="refresh(point)">&#xe62c;</i>
      <!-- <i class="iconfont">&#xe60a;</i> -->
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'point'
      ])
    },
    methods: {
      ...mapActions([
        'refresh'
      ]),
      ...mapMutations({
        showBar: 'TOGGLE_SIDEBAR'
      })
    }
  }
</script>

<style>
  .header-icon .iconfont {
    margin-right: 0.2rem;
  }
  .header-icon .refresh {
    font-size: 0.6rem;
  }
</style>