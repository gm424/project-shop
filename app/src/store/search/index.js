//search模块的小仓库
import {reqGetSearchInfo} from '@/API'
const state={
    //初始状态
    searchList:{}
};
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
};
const actions={
 //获取search模块数据
  async getSearchList({commit},params={}){
      //reqGetSearchInfo在调取服务器获取数据的时候至少传递一个空对象
      //params形参是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
      let result=await reqGetSearchInfo(params)
      console.log("666",result.data)
      if(result.code==200){
          commit("GETSEARCHLIST",result.data)
      }
 }
};
//计算属性，在项目中为了简化数据而生
//可以把我们将来在组件当中需要的数据简化一下
const getters={ 
    // 当前形参state是当前仓库中的state(search),不是大仓库中的state
    //假如没有网路或者网络不给力，会返回undefined
    //计算新的属性要返回一个空数组
  goodsList(state){
        return state.searchList.goodsList||[];
  } ,
  trademarkList(state){
    return state.searchList.trademarkList||[];
  },
  attrsList(state){
    return state.searchList.attrsList||[];
  }
};
export default {
    state,
    mutations,
    actions,
    getters,
}