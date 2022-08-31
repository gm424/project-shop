<template>
  <div>
    <!-- 商品的三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑，带有×的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 点击品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(":")[1]}}
              <i @click="removeTradeMark">×</i>
            </li>
            <!-- 点击售卖属性的面包屑 -->
            <!-- 不能用v-if，有多个属性，需要遍历 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">
              {{attrValue.split(":")[1]}}
              <i @click="removeAttrValue(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>
        <!--details-->
        <div class="details clearfix">
          <!-- 排序结构 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-jiantou_xiangshang':isAcs,'icon-jiantou_xiangxia_o':isDecs}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-jiantou_xiangshang':isAcs,'icon-jiantou_xiangxia_o':isDecs}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转的时候别忘记带id（params）参数 -->
                    <router-link :to="`/detail/${good.id}`">
                      <!-- <img v-lazy="good.defaultImg"/> -->
                       <img :src="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters , mapState} from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  //组件挂载完毕执行一次，所以在组件内的search中只发送了一次请求
  //而search需要带着参数发送很多次请求，所以不能写在mounted里面
  data() {
    return {
      //带给服务器的参数
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //分类名字
        categoryName: "",
        //搜索关键字
        keyword: "",
        //排序(1：综合 2：排序  asc:升序 desc:降序)初始值：综合|降序
        order: "1:desc",
        //分页器
        pageNo: 1,
        //每一页展示数据个数
        pageSize: 3,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
     //复杂的写法 
    //  this.searchParams.category1Id=this.$route.query.category1Id;
    //  this.searchParams.category2Id=this.$route.query.category2Id;
    //  this.searchParams.category3Id=this.$route.query.category3Id;
    //  this.searchParams.categoryName=this.$route.query.categoryName;
    //  this.searchParams.keyword=this.$route.params.keyword;

    //object.assign:ES6新增的合并对象
    Object.assign(this.searchParams,this.$route.params,this.$route.query)
  },
  mounted() {

    // this.$store.dispatch('getSearchList',{})
    //在发请求之前带给服务器的参数【searchParams参数发生变化有数值带给服务器】
    this.getData();
  },
  computed: {
  //   ...mapState({
  //     goodList:state=>state.search.searchList.goodList
  //   })
  //太麻烦了换成getter
    //mapGetters里面的写法传递的是数组，因为getters计算是没有划分模块的
    ...mapGetters(["goodsList"]),
    isOne(){
     return this.searchParams.order.indexOf('1')!=-1
    },
    isTwo(){
      return this.searchParams.order.indexOf('2')!=-1
    },
    isAcs(){
      return this.searchParams.order.indexOf('asc')!=-1
    },
    isDecs(){
      return this.searchParams.order.indexOf('desc')!=-1
    },
    //获取search模块展示的产品一共多少数据
    ...mapState({
      total:state=>state.search.searchList.total
    })
  },
  methods: {
    //向服务器发送请求search模块数据（根据参数不同返回不同的数组进行展示）
    getData() {
      this.$store.dispatch("getSearchList",this.searchParams);
    },
    //删除分类的名字的面包屑
    removeCategoryName(){
      //把带给服务器的参数置空了，还需要向服务器发请求
      //如果属性值为空还是会把相应的字段带给服务器，如果改为undefined不会带给服务器，性能好
      this.searchParams.categoryName=undefined;
       //每一次请求应该把一二三级分类的id置空，去接受下一次的id 
        this.searchParams.category1Id=undefined;
        this.searchParams.category2Id=undefined;
        this.searchParams.category3Id=undefined;
        this.getData();
      //地址栏也需要修改,进行路由跳转
      if(this.$route.params){
        this.$router.push({name:"search",params:this.$route.params})
      }
      

    },
    //删除关键字的面包屑
    removeKeyword(){
      //给服务器带的参数的searchPrams的keyword置空
      this.searchParams.keyword=undefined;
      //再次发请求
      this.getData();
      //通知兄弟header组件清除搜索框的关键字
      this.$bus.$emit("clear");
      //地址栏也需要修改,进行路由跳转
      if(this.$route.query){
        this.$router.push({name:"search",query:this.$route.query})
      }
    },
    //自定义事件回调（点击品牌面包屑）
    trademarkInfo(trademark){
      //整理品牌字段的参数 “ID：品牌名称”
      this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
      //再次发请求获取search模块数据列表进行展示
      this.getData();
    },
    //删除品牌面包屑
    removeTradeMark(){
      //将品牌信息置空
      this.searchParams.trademark=undefined;
      //再次发送请求
      this.getData();
    },
    //自定义事件回调（点击平台售卖属性）
    attrInfo(attr,attrValue){
         //["属性ID：属性值：属性名"]
         //参数格式整理好
         let props=`${attr.attrId}:${attrValue}:${attr.attrName}`
         //数组去重
         if(this.searchParams.props.indexOf(props)==-1){
             this.searchParams.props.push(props)
         }
         //再次发送请求
         this.getData();
    },
    //删除售卖属性
    removeAttrValue(index){
      //整理参数
       this.searchParams.props.splice(index,1);
       //再次发送请求
       this.getData();
    },
    changeOrder(flag){
       //flag：是一个标记，代表用户点击的是综合还是价格,用户电机的时候传进的
       //用户起始Order(1:desc)
       let originOrder=this.searchParams.order;
       //用户起始的是1还是2
       let originFlag=this.searchParams.order.split(":")[0];
       //用户起始的是降序还是升序
       let originSort=this.searchParams.order.split(":")[1];
       //准备一个新的属性值
       let newOrder='';
       //确定点击的一定是综合（1）
       if(flag==originFlag){
          newOrder=`${originFlag}:${originSort=="desc"?"asc":"desc"}`;
       }else{
         newOrder=`${flag}:${"desc"}`;
       }
       //将新的order赋予searchParams
       this.searchParams.order=newOrder;
       //再次发请求
       this.getData();
       
    },
    //自定义事件获取当前第几页
    getPageNo(pageNo){
       //整理带给服务器的参数
       this.searchParams.pageNo=pageNo;
       //再次发送请求
       this.getData();
    }

  },
  //数据监听：监听数组实例身上的属性值变化
  watch:{
    //监听路由信息是否发生变化，如果发生变化再次发送请求
    $route(newValue,oldValue){
         //再次发请求之前整理带给服务器的参数
         Object.assign(this.searchParams,this.$route.params,this.$route.query)
        //再次发送ajax请求
        this.getData();
        //每一次请求完毕应该把一二三级分类的id置空，去接受下一次的id 
        this.searchParams.category1Id=undefined;
         this.searchParams.category2Id=undefined;
          this.searchParams.category3Id=undefined;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
