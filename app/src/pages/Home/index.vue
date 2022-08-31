<template>
  <div>
   <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要在引入 -->
   <p @click="test">text</p>
   <TypeNav/>
   <ListContainer/>
   <Recommand/>
   <Rank/>
   <Like/>
   <Floor v-for="(floor) in floorList" :key="floor" :list="floor"/>
   <Brand/>
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from '@/pages/Home/ListContainer/index.vue'
import Recommand from '@/pages/Home/Recommand/index.vue'
import Rank from '@/pages/Home/Rank/index.vue'
import Like from '@/pages/Home/Like/index.vue'
import Floor from '@/pages/Home/Floor/index.vue'
import Brand from '@/pages/Home/Brand/index.vue'
import {mapState} from 'vuex'
export default {
name:'',
components:{
  ListContainer,
  Recommand,
  Rank,
  Like,
  Floor,
  Brand
},
mounted() {
  //派发action获取floor组件的数据
   this.$store.dispatch("getFloorList");

},
computed:{
  ...mapState({
    floorList:state=>state.home.floorList
  })
},
methods: {
  test(){
    var x=y=1;
    console.log("y",y)
    console.log("x",x)
  }
},
}
</script>

<style>
   p{
     color: red;
     font-size: 15pt;
   }
</style>