<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl1"
                    class=“tab-control”
                    v-show="isTabFixed" />
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" 
                    @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件时不能直接监听点击的 需要加上修饰符 .native -->
    <!-- 修饰 .native 什么时候使用     在我们需要监听一个组件的原生事件时  必须给对应的事件加上.native修饰符 才能进行监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue';
  import RecommendView from './childComps/RecommendView.vue';
  import FeatureView from './childComps/FeatureView.vue';

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from '../../components/content/tabControl/TabControl.vue';
  import GoodsList from '../../components/content/goods/GoodsList.vue';
  import Scroll from '../../components/common/scroll/Scroll.vue';
  import BackTop from '../../components/content/backTop/BackTop.vue';


  import { getHomeMultidata, getHomeGoods } from "network/home";
  import { debounce } from "common/utils";


  export default {
    components: { 
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    name: "Home",
    data () {
      return {
        banners: [],
        recommends:[],
        goods: {
          'pop': {page:0 ,list: []},
          'new': {page:0 ,list: []},
          'sell': {page:0 ,list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated () {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated () {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created () {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted () {
      const refresh = debounce(this.$refs.scroll.refresh,200)
      //1.监听item中图片加载完成
      this.$bus.$on('itemImageLoad',() =>{
        refresh()
      })

      //2.获取tabControl的offsetTop

    },
    methods: {
      /* *
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
          default:
            break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = - (position.y) > 1000

        //2.决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = -(position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        //1.offsetTop:当前对象到其上级层顶部的距离.
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      /**
       * 网络请求相关的方法
       */ 
      getHomeMultidata() {
        getHomeMultidata().then(res =>{
          this.banners = res.data.banner.list,
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1;

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /* 第一种方法不需要padding属性  第二种方法需要 */
    padding-top: 44px; 
    /**
     *vh：1vh等于视口高度的1%。
     视口单位中的“视口”，桌面端指的是浏览器的可视区域；移动端指的就是Viewport中的Layout Viewport, “视区”所指为浏览器内部的可视区域大小，即window.innerWidth/window.innerHeight大小，不包含任务栏标题栏以及底部工具栏的浏览器区域大小。。
     */
    height: 100vh;
    /* 第二种方法 */
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时 为了让导航不跟随一起滚动才使用一下样式 */
    /* 因为使用了better-scroll滚动 而不是原生的滚动 所以下面的样式已经没有作用了 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /* .tab-control {
     
     // position: sticky; 当浏览器没有达到你自己设置的值时 他的属性是sticky  当他达到你设置的值时 他的属性是flex
    
    position: sticky;
    top: 44px;
    z-index: 9;
  } */


  /* 第一种方法 */
  /* .content {
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px;
  } */


  /* 第二种方法 */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
