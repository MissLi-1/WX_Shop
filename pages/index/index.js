//0、引入 用来发送请求的方法
import { request } from "../../request/index.js";

Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    catesList:[],
    //楼层数组
    floorList:[]
  },
  //页面开始加载就触发
  onLoad: function(options) {
    //调用轮播图数据
    this.getSwiperList();
    //调用导航数据
    this.getCateList();
    //调用楼层数据
    this.getFloorList();
  },

  //获取轮播图数据
  getSwiperList(){
    request({url: 'home/swiperdata'})
    .then(result=>{
      this.setData({
        swiperList:result
      })
    })
  },

  //获取导航数据
  getCateList(){
    request({url: 'home/catitems'})
    .then(result=>{
      this.setData({
        catesList:result
      })
    })
  },
  
  //获取楼层数据
  getFloorList(){
    request({url: 'home/floordata'})
    .then(result=>{
      this.setData({
        floorList:result
      })
    })
  }










});
  