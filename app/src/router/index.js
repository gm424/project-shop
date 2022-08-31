//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
import routes from './routes'
//引入store
import store from '@/store'
//先把VueRouter原型对象的push，先保存一份
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
//重写 push replace
//第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
//第二个参数:成功的回调
//第三个参数：失败的 回调
VueRouter.prototype.push=function(location,resolve,reject){
   if (resolve&& reject)
   {
       originPush.call(this,location,resolve,reject);
   }else{
       originPush.call(this,location,()=>{},()=>{});
   }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if (resolve&& reject)
    {
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}
//配置路由
let router=new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior (to, from, savedPosition) {
        // 代表滚动条在最上方
        return {y:0}
      }
});
//全局守卫（全局前置守卫）在路由跳转之前进行判断
router.beforeEach(async(to,from,next)=>{
    //to:可以获取到你要跳转到哪个路由的信息
    //from可以获取到你从哪个路由来的信息
    //next：是一个放行函数  next()
    //next('/login')放行到指定的路由位置
    //next（false）中断路由
    //用户登录了才有token
    let token=store.state.user.token;
    //用户信息
    let name=store.state.user.userInfo.name;
    //用户已经登录了
    if(token){
       //用户已经登录了还想去login(不行)
       if(to.path=='/login'){
           next('/home')
       }else{
           //登陆了但是不是去login
             if(name){
               next();
             }else{
               //没有用户信息，派发action让仓库存储用户信息再跳转
                  try{
                    //获取用户信息成功，放行
                      await store.dispatch('getUserInfo'); 
                      console.log("hahahha")
                      next();
                    }catch(error){
                     //token失效了获取不到用户的信息，重新登录
                     //清除token
                     await store.dispatch('userLogout')
                     next('/login')
                    }
                }  
             }
    }else{
       //未登录不能去交易相关的，不能去支付相关的，不能去个人中心
       let topath=to.path;
        if(topath.indexOf('/trade')!=-1||topath.indexOf('/pay')!=-1||topath.indexOf('/center')!=-1){
            next('/login?redirect='+topath)
        }else{
           next();
        }
    }
})
export default router;