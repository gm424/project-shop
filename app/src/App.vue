<template>
<div>
  <Header></Header>
  <!--路由组件出口  -->
  <router-view></router-view>
  <Footer v-show="$route.meta.show"></Footer>
</div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
     //通知Vuex发请求，获取数据，存储于仓库中
     //触发一个action获取商品分类的三级列表的数据，只发一次请求
     this.$store.dispatch('categoryList')

  },
};
</script>

<style scoped lang="less">

</style>
