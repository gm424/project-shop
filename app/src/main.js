import Vue from 'vue'
import App from './App.vue'
//三级联动组件---注册为一个全局组件
import TypeNav from '@/components/TypeNav' 
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//elementUI
import {Button,MessageBox} from 'element-ui'
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入MockServe.js---mock数据
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"
//统一接口api文件夹里面的全部请求函数
import * as API from '@/API'
Vue.config.productionTip = false
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store/index'
//引入插件图片懒加载
import VueLazyload from 'vue-lazyload'
import bll from '@/assets/1.gif'
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:bll
});
//引入表单校验插件
import '@/plugins/validate.js'
new Vue({
  render: h => h(App),
  //注册全局事件总线（兄弟间通信）$bus
  beforeCreate(){
      Vue.prototype.$bus=this;
      Vue.prototype.$API=API;
  },
  //注册路由
  router,
  //注册仓库:组件实例身上会多了一个属性$store属性
  store
}).$mount('#app')
