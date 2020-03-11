import {getSetting,chooseAddress,openSetting,showMode,showToast} from "../../utils/asyncWX"
// pages/cart/cart.js
Page({
  data: {
    address:[],
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    let cart = wx.getStorageSync("cart")||[];
    const address = wx.getStorageSync("address");
    cart = cart.filter(v=>v.checked)

    let totalPrice = 0;
    let totalNum = 0;
      if(cart.length != 0){
        cart.forEach(v => {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num;
        });
      }
    this.setData({
      address,
      cart,
      totalPrice,
      totalNum,
    })  
  },


})