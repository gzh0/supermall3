<template>
  <div>
    <div class="wrapper">
      <ul class="conent">
        <li>列表展示1</li>
        <li>列表展示2</li>
        <li>列表展示3</li>
        <li>列表展示4</li>
        <li>列表展示5</li>
        <li>列表展示6</li>
        <li>列表展示7</li>
        <li>列表展示8</li>
        <li>列表展示9</li>
        <li>列表展示10</li>
        <li>列表展示11</li>
        <li>列表展示12</li>
        <li>列表展示13</li>
        <li>列表展示14</li>
        <li>列表展示15</li>
        <li>列表展示16</li>
        <li>列表展示17</li>
        <li>列表展示18</li>
        <li>列表展示19</li>
        <li>列表展示20</li>
        <li>列表展示21</li>
        <li>列表展示22</li>
        <li>列表展示23</li>
        <li>列表展示24</li>
        <li>列表展示25</li>
        <li>列表展示26</li>
        <li>列表展示27</li>
        <li>列表展示28</li>
        <li>列表展示29</li>
        <li>列表展示30</li>
        <li>列表展示31</li>
        <li>列表展示32</li>
        <li>列表展示33</li>
        <li>列表展示34</li>
        <li>列表展示35</li>
        <li>列表展示36</li>
        <li>列表展示37</li>
        <li>列表展示38</li>
        <li>列表展示39</li>
        <li>列表展示40</li>
        <li>列表展示41</li>
        <li>列表展示42</li>
        <li>列表展示43</li>
        <li>列表展示44</li>
        <li>列表展示45</li>
        <li>列表展示46</li>
        <li>列表展示47</li>
        <li>列表展示48</li>
        <li>列表展示49</li>
        <li>列表展示50</li>
        <li>列表展示51</li>
        <li>列表展示52</li>
        <li>列表展示53</li>
        <li>列表展示54</li>
        <li>列表展示55</li>
        <li>列表展示56</li>
        <li>列表展示57</li>
        <li>列表展示58</li>
        <li>列表展示59</li>
        <li>列表展示60</li>
        <li>列表展示61</li>
        <li>列表展示62</li>
        <li>列表展示63</li>
        <li>列表展示64</li>
        <li>列表展示65</li>
        <li>列表展示66</li>
        <li>列表展示67</li>
        <li>列表展示68</li>
        <li>列表展示69</li>
        <li>列表展示70</li>
        <li>列表展示71</li>
        <li>列表展示72</li>
        <li>列表展示73</li>
        <li>列表展示74</li>
        <li>列表展示75</li>
        <li>列表展示76</li>
        <li>列表展示77</li>
        <li>列表展示78</li>
        <li>列表展示79</li>
        <li>列表展示80</li>
        <li>列表展示81</li>
        <li>列表展示82</li>
        <li>列表展示83</li>
        <li>列表展示84</li>
        <li>列表展示85</li>
        <li>列表展示86</li>
        <li>列表展示87</li>
        <li>列表展示88</li>
        <li>列表展示89</li>
        <li>列表展示90</li>
        <li>列表展示91</li>
        <li>列表展示92</li>
        <li>列表展示93</li>
        <li>列表展示94</li>
        <li>列表展示95</li>
        <li>列表展示96</li>
        <li>列表展示97</li>
        <li>列表展示98</li>
        <li>列表展示99</li>
        <li>列表展示100</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    mounted () {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        //默认情况下Bscroll是不可以实时的监听滚动位置
        //probe 侦测
        //0,1都是不侦测实时的位置
        //2：在手指滚动的过程中侦测  手指离开后的惯性滚动过程中不侦测
        //3：只要是滚动 都侦测
        probeType:3,
        pullUpLoad:true
      })

      this.scroll.on('scroll',(position) =>{
        console.log(position);
      })

      this.scroll.on('pullingUp',() =>{
        console.log('上拉加载更多');
      })
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: skyblue;
    overflow: hidden;
  }
</style>