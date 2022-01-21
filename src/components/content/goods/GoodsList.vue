<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goodsItem="item" />
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'

  export default {
    components: { GoodsListItem },
    name:"GoodsList",
    props: {
      goods: {
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /* 设置包裹 */
    flex-wrap: wrap;
    /* 设置均等分 */
    justify-content: space-around;

    padding: 2px;
  }
</style>