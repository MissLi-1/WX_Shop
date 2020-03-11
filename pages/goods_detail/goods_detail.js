import {request} from "../../request/index"
Page({

  data: {
    goodObj:{}
  },

  //当前商品信息
  GoodInfo:{},


  onLoad: function (options) {
    let goods_id= options.goods_id;
    this.getGoodsDetail(goods_id);
  },


  //发送请求
  async getGoodsDetail(goods_id){
    const goodObj = await request({url:"goods/detail",data:{goods_id}});
    this.GoodInfo = goodObj;
    this.setData({
      goodObj:{
        goods_name:goodObj.goods_name,
        goods_price:goodObj.goods_price,
        pics:goodObj.pics,
        goods_introduce:goodObj.goods_introduce.replace(/\.webp/g,'.jpg')
      } 
    })
  },


  // 点击轮播图放大预览
  handlePrevewImage(e){
    let {index} = e.currentTarget.dataset;
    const urls = this.GoodInfo.pics.map(v=>v.pics_mid);
    wx.previewImage({
      current: urls[index],
      urls: urls,
    });
      
  },


  // 加入购物车
  handleCartAdd(){
    // 获取缓存中购物车数组
    let cart = wx.getStorageSync("cart")||[];
    // 返回符合条件的数组元素位置    购物车数组里面所有商品的ID和当前商品ID比较，相同则说明存在，没有相同的则就是还没有添加过
    let index = cart.findIndex(v=>v.goods_id==this.GoodInfo.goods_id);

    if(index == -1){
      //购物车里面不存在当前商品
      this.GoodInfo.num = 1;
      this.GoodInfo.checked = true;
      cart.push(this.GoodInfo);
    }else{
      //已存在当前商品
      cart[index].num++;
    }
    //将购物车数据添加回缓存区
    wx.setStorageSync("cart", cart);
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        duration: 1500,
        mask: true,
      });
      
        
    
  }


})