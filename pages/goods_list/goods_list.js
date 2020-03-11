import {request} from "../../request/index"
// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:0,
      value:"综合",
      isActive:true
    },{
      id:1,
      value:"销量",
      isActive:false
    },{
      id:2,
      value:"价格",
      isActive:false
    }],

    //商品库
    goods_list:[],

  },

  //总页数
  totalPages:1,

  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodList();
  },


  //标题点击事件。从子组件传递过来
  handleTabsItemChange(e){
    console.log(e.detail.index);
    let {index} = e.detail;
    let {tabs} = this.data;
    //修改原数组
    tabs.forEach((v,i)=>i==index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  //获取商品列表
  async getGoodList(){
    const res = await request({"url":"goods/search",data:this.QueryParams});
    
    let total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);


    
    //存放到商品库
    this.setData({
      //  goods_list:res.goods,
       goods_list:[...this.data.goods_list,...res.goods],
    })
    wx.stopPullDownRefresh();
      
  },



  // 页面上划，滚动条触底事件
  onReachBottom(){
    if(this.QueryParams.pagenum >= this.totalPages){      
      // 提示框
      wx.showToast({
        title: '没有更多信息了',
      });

    }else{
      this.QueryParams.pagenum++;
      this.getGoodList();
    }
  },

  //监听页面下拉事件
  onPullDownRefresh(){
    this.QueryParams.pagenum = 1;
    this.setData({
      goods_list:[]
    })

    this.getGoodList();
  }




 
})