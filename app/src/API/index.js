//所有的API接口进行统一的管理
import requests from "./ajax";
import mockRequests from "./mockAjax"
//三级联动的接口
//请求地址：/api/product/getBaseCategoryList get请求无参数
export const reqCategoryList=()=>{
    //发请求:axios发请求返回结果是Promise对象
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

//获取banner
export const reqGetBannerList=()=>{
    //发请求:axios发请求返回结果是Promise对象
    return mockRequests({
        url:'/banner',
        method:'get'
    })
}

//获取floor
export const reqFloorList=()=>{
    //发请求:axios发请求返回结果是Promise对象
    return mockRequests({
        url:'/floor',
        method:'get'
    })
}

//获取搜索模块数据 地址：/api/list 请求方式post 
//需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前这个函数需不需要接收外部传递的参数
//当前的接口给服务器传递参数params至少是一个空对象
export const reqGetSearchInfo=(params)=>{
    return requests({
        url:'/list',
        method:'post',
        data:params
    })
}
//获取产品详情信息接口
export const reqGoodsInfo=(skuId)=>{
    return requests({
        url:`item/${skuId}`,
        method:'get',
    })
}
//将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCar=(skuId,skuNum)=>{
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post',
    })
}
//获取购物车列表数据的接口
export const reqCartList=()=>{
    return requests({
        url:'/cart/cartList',
        method:'get',
        
    })
}
//删除购物车产品的接口
//URL：／api/cart/deleteCart/{skuId}
//method:DELETE
export const reqDeleteCartById=(skuId)=>{
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete',
        
    })
}
//修改商品的选中状态
export const reqUpdateCheckedByid=(skuId,isChecked)=>{
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get',
    })
}
//获取注册验证码
export const reqGetCode=(phone)=>{
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get',
    })
}
//注册
export const reqUserRegister=(data)=>{
    return requests({
        url:'/user/passport/register',
        method:'post',
        data:data
    })
}
//登录
export const reqUserLogin=(data)=>{
    return requests({
        url:'/user/passport/login',
        method:'post',
        data:data
    })
}
//获取用户的信息，需要带着用户的token向服务器要用户的信息
export const reqUserInfo=()=>{
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get',
    })
}
//退出登录
export const reqLogout=()=>{
    return requests({
        url:'/user/passport/logout',
        method:'get',
    })
}
//获取用户地址信息
export const reqAddressInfo=()=>{
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get',
    })
}
//获取商品清单
export const reqOrderInfo=()=>{
    return requests({
        url:'/order/auth/trade',
        method:'get',
    })
}
//提交订单的接口
export const reqSubmitOrder=(tradeNo,data)=>{
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:data
    })
}
//获取支付信息
export const reqPayInfo=(orderId)=>{
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get',
    })
}
//获取支付订单状态(支付中/支付成功/支付失败)
export const reqPayStatus=(orderId)=>{
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get',
    })
}
//获取个人订单的数据 page:页码 limit:每页几条数据
export const reqMyOrderList=(page,limit)=>{
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get',
    })
}