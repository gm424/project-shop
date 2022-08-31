import { reqGoodsInfo ,reqAddOrUpdateShopCar} from "@/API";
//封装游客身份模块uuid-->生成一个随机字符串（不能再变了）
import {getUUID} from '@/utils/uuid_token'
const state={
    goodInfo:{},
    //游客的临时身份
    uuid_token:getUUID()
};
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    },
    
};
const actions={
    //获取产品信息的
    async getGoodInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId);
        if(result.code==200){
            commit("GETGOODINFO",result.data)
        } 
    },
    //将产品添加到购物车中
     //加入购物车后（发请求），前台将参数带给服务器
        //服务器写入数据库成功，并没有返回其它数据，有code==200
        //因为服务器没有返回其它数据，所以不需要三连环，仓库中不需要存储数据
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result=await reqAddOrUpdateShopCar(skuId,skuNum);
        //当前的这个函数如果执行返回promise
        //promise要么成功要么失败
        //代表服务器加入购物车成功
        if(result.code==200){
            return "ok"
        }else{
            //加入购物车失败
            return Promise.reject(new Error('faile'));
        }
    }
};
//简化数据
const getters={
    //路径导航简化的数据
   categoryView(state){
       //state.goodInfo初始状态是一个空对象，所以categoryView是undefined
       return state.goodInfo.categoryView||{};
   },
   //简化产品信息的数据
   skuInfo(state){
       return state.goodInfo.skuInfo||{};
   },
   //产品的售卖属性的简化
   spuSaleAttrList(state){
       return state.goodInfo.spuSaleAttrList||[]
   }


};
export default{
    state,
    actions,
    mutations,
    getters
}