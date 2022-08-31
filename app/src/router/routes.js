//引入路由组件
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register';
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

/*路由懒加载：
 当打包构建应用时，javascript包会变得非常大，影响页面的加载
 如果我们能把不同路由对应得组件分割成不同得代码块，然后被路由
 访问时候才加载对应组件，这样就更高效了
*/
// 路由懒加载
// const foo=()=>{
//     return import('@/pages/Home')
// }
//路由配置信息
export default [
    {
        path:"/home",
        component:()=>import("@/pages/Home"),
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true},
        name:"search",
        //路由组件能不能传递props数据？
        //1.布尔值写法:params
        // props:true,
        //2.对象写法:额外的给路由组件传递一些props
        // props:{a:1,b:2},
        //3.函数写法：（常用）可以将params参数和query参数通过props传递给路由组件
        props:($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k}
        }

    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path:"/detail/:skuid",
        component:Detail,
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        component:AddCartSuccess,
        meta:{show:true},
        name:"addcartsuccess"
    },
    {
        path:"/shopcart",
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:"/trade",
        component:Trade,
        meta:{show:true},
        //路由独享守卫
        //去交易页面必须事从购物车来的
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next();
            }else{
                //其它的路由组件来的停留在当前
                next(false);
            }
        }
    },
    {
        path:"/pay",
        component:Pay,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next();
            }else{
                //其它的路由组件来的停留在当前
                next(false);
            }
        }
    },
    {
        path:"/paysuccess",
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:"/center",
        component:Center,
        meta:{show:true},
        //二级路由组件
        children:[
             {
                 path:"myorder",
                 component:MyOrder,
             },
             {
                path:"grouporder",
                component:GroupOrder,
             },
             //重定向
             {
                 path:'/center',
                 redirect:'/center/myorder'
             }
        ]
    },
    {
        //重定向，项目跑起来时立马定向到首页
         path:'*',
         redirect:"/home"
    }

]