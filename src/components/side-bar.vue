<template>
  <div class="sidebar-box" :class="{'show-sidebar': isShowSidebar}">
    <div class="swiper-slide">
      <div class="side-header">
        <div class="header-cont">
          <!-- <a v-link="{ path: '/add' }" class="iconfont add-link">&#xe608;</a> -->
          <router-link to="/add" class="iconfont add-link">&#xe608;</router-link>
        </div>
      </div>
      <ul class="city-list">
        <li v-for="city in cityList">
          <div class="name" @click="setCurrentCity(city)">{{ city.name }}</div>
          <div class="handle" v-if="!city.isDefault" @click="deleteCity(city)"><i class="iconfont">&#xe619;</i></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'cityList',
        'searchData',
        'isShowSidebar'
      ])
    },
    methods: {
      ...mapActions([
        'setCurCity',
        'searchCity',
        'addCity'
      ]),
      ...mapMutations({
        toggleSidebar: 'TOGGLE_SIDEBAR',
        delCity: 'DELETE_CITY'
      }),
      setCurrentCity (data) {
        this.setCurCity(data)
        this.toggleSidebar()
      },
      deleteCity (data) {
        this.delCity(data)
      }
    }
  }
</script>

<style scoped>
  .side-header {
    position: relative;
  }
  .header-cont {
    text-align: right;
  }
  .add-link {
    color: #1bb1b2;
    font-size: 0.6rem;
    margin: 0 0.2rem;
  }
  
  .swiper-slide li {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.4rem;
    border-bottom: solid 1px #dedede;
    margin: 0 0.266667rem;
    overflow: hidden;
  }
  .city-list li {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .city-list li .handle {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
  }
  .city-list li .name {
    -webkit-box-flex: 6;
    -webkit-flex: 6;
    flex: 6;
  }
  .city-list li .handle .iconfont {
    color: #999;
    font-size: 0.4rem;
    padding-right: 0.266666rem;
  }
</style>