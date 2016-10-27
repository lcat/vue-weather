<template>
  <div class="add-city">
    <input class="search-ipt" type="text" placeholder="搜索" @input="search" v-model="searchIpt">
    <ul class="search-list" v-if="searchData">
      <li v-if="!searchData.length && searchIpt">无数据</li>
      <li v-for="searchItem in searchData" @click="addCityBySearch(searchItem)">{{ searchItem.name }}</li>
    </ul>

    <ul class="hot-city">
      <li v-for="city in hotCity" @click="addHotCity(city)">{{ city.name }}</li>
    </ul>
  </div>
</template>

<script>
  import { hotCity } from '../config'
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  var searchTimeout

  export default {
    data () {
      return {
        hotCity,
        searchIpt: ''
      }
    },
    computed: {
      ...mapGetters([
        'searchData'
      ])
    },
    methods: {
      ...mapActions([
        'setCurCity',
        'searchCity',
        'addCity'
      ]),
      ...mapMutations({
        hiddenBar: 'HIDE_SIDEBAR'
      }),
      search (e) {
        var self = this
        // 延迟
        searchTimeout && clearTimeout(searchTimeout)
        searchTimeout = setTimeout(function () {
          self.searchCity(encodeURIComponent(e.target.value))
        }, 1000)
      },
      addCityBySearch (data) {
        this.searchIpt = ''
        this.addCity(data)
        this.setCurCity(data)
        this.hiddenBar()
        this.$router.back()
      },
      addHotCity (data) {
        this.addCity(data)
        this.setCurCity(data)
        this.hiddenBar()
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .search-list li {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.4rem;
    border-bottom: solid 1px #dedede;
    margin: 0 0.266667rem;
    overflow: hidden;
  }
  .add-city {
    padding: 0.267rem;
    position: relative;
  }
  .add-city .search-ipt {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    border: solid 1px #1bb1b2;
    border-radius: 20px;
    font-size: 0.4rem;
    text-indent: 0.4rem;
  }
  .add-city ul.search-list {
    position: absolute;
    background: #f5fbfb;
    top: 1.067rem;
    left: 0;
    width: 100%;
  }
  .hot-city {
    margin: 0.4rem 0;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    justify-content: space-around;
  }
  .hot-city li {
    border: solid 1px #999;
    border-radius: 20px;
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.2rem;
    text-align: center;
    margin: 0.1rem 2.5%;
    width: 20%;
  }
  .hot-city li.active {
    background: #1bb1b2;
    color: #fff;
    border: solid 1px #1bb1b2;
  }
</style>