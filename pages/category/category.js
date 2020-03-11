// pages/category/category.js
import {request} from "../../request/index" 
Page({

  data: {
    //左侧的菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
    //被点击的左侧的菜单
    currentIndex:0

  },

  Cates:[],

  onLoad: function (options) {
    //获取本地储存中的数据
    const CateCache = wx.getStorageSync("cateCache");
    if(!CateCache){

      this.getCates();

    }else{

      if(Date.now()-CateCache.time > 1000 * 60 * 5){

        this.getCates();

      }else{
        this.Cates = CateCache.data;
        this.viewHandle();        
      }
    }

  },


  //获取分类数据  async同步
  async getCates(){
    this.Cates = await request({"url":"categories"});
    
      //将数据缓存起来
    wx.setStorageSync("cateCache", {time:Date.now(),data:this.Cates});
    this.viewHandle();     
  },

  //渲染页面
  viewHandle(){
          // 构造左侧的菜单数据
      //找出每个对象的name封装成数组
      let leftMenuList = this.Cates.map(v=>v.cat_name);

      //构造右边的商品
      let rightContent = this.Cates[0].children;

      this.setData({
        //es6中特性：leftMenuList = leftMenuList
        leftMenuList,
        rightContent
      })

  },



  // 左侧菜单的点击事件
  handleItemTap(e){
    let currentIndex = e.currentTarget.dataset.index;

    //构造点击时的商品
    let rightContent = this.Cates[currentIndex].children;

    this.setData({
      rightContent,
      currentIndex
    })
  }






})