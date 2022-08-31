import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/API";
//home模块的小仓库
const state={
    //state中的默认数据初始值别乱写,服务器返回的是对象
    //它就是对象,服务器返回的是数组,它就是数组[根据接口返回值初始化的]
   //home仓库中存储三级菜单中的数据
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor轮播图数据
    floorList:[]
};
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
};
const actions={
    //通过API里面的接口函数调用，获取服务器的数据
    async categoryList({commit}){
        //reqCategoryList是一个封装好的请求函数
         let result=await reqCategoryList();
         //返回的是一个promise,await拿到的是一个成功的结果,所以这个时候可以拿到数据了
         if(result.code==200){
             commit("CATEGORYLIST",result.data)
         }
    },
    //获取首页轮播图数据
    async getBannerList({commit}){
        let result=await reqGetBannerList();
        // console.log(result);
        if(result.code==200){
            commit("GETBANNERLIST",result.data)
        }
    },
    //获取首页Floor轮播图
    async getFloorList({commit}){
        let result=await reqFloorList();
        // console.log(result);
        if(result.code==200){
            commit("GETFLOORLIST",result.data)
        }
    }


};
const getter={};
export default {
    state,
    mutations,
    actions,
    getter
}