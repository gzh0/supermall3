import axios from "axios";

//第四种  与main第三种一样
export function request(config) {
    //1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
    })
  
    //2.axios的拦截器
    //2.1请求拦截的作用
    //2.1.1比如config中的一些信息不符合服务器的要求
    //2.1.2比如每次发送网络请求时 都希望在界面中显示一个请求的图标
    //2.1.3比如在某些网络请求（比如登陆（token）），必须携带一些特殊的信息
    instance.interceptors.request.use(config =>{
      //发送成功执行下面的代码
      //注意把config返回出去 不然在当前的代码里面main.js里面拿不到网络请求
      return config
    }, err =>{
      //发生失败执行下面的代码
      console.log(err);
    })

    //2.2响应拦截
    instance.interceptors.response.use(res =>{
      //服务器已经响应了  这里返回的是结果
      //记住也要把请求到的东西返回出去 这里我们只要数据中的data
      return res.data
    },err =>{
      console.log(err);
    })
  
    //3.发送真正的网络请求
    return instance(config)
}
