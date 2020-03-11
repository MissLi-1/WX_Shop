import {getSetting,chooseAddress,openSetting,showMode,showToast} from "../../utils/asyncWX"
// pages/cart/cart.js
Page({
  data: {
    address:[],
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const cart = wx.getStorageSync("cart")||[];
    const address = wx.getStorageSync("address");
    this.countMoney(cart);
    this.setData({
      address,
    })  
  },
  // 处理收货地址
  async handleChooseAddress(){

    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if(scopeAddress == false){
        await openSetting();
      }
      const address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);      
    }
  },
  // 计算总价格，总数量，是否全选
  countMoney(cart){
    // let cart = this.data.cart;
    let totalPrice = 0;
    let totalNum = 0;
      let allChecked = false ;
      if(cart.length != 0){
        allChecked = true;
        cart.forEach(v => {
          if(v.checked){
            totalPrice += v.num * v.goods_price;
            totalNum += v.num;
          }else{
            allChecked = false;
          }
        });
      }
  
      this.setData({
        cart,
        totalPrice,
        totalNum,
        allChecked
      })
      wx.setStorageSync("cart", cart);
  },
  // 单个选中、取消
  handleItemChange(e){
    const {index} = e.currentTarget.dataset;
    let cart = this.data.cart;
    cart[index].checked = !cart[index].checked;
    this.countMoney(cart);
  },
  // 商品反选
  checkAll(){
    // console.log(e);
    let cart = this.data.cart;
    let allChecked = this.data.allChecked;
   
    allChecked = !allChecked;
    cart.forEach(v=>v.checked=allChecked);

    this.countMoney(cart)
  },
  // 减少商品
  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>id === v.goods_id);
   
    let num = cart[index].num;

    switch (operation) {
      case -1:
        if(num >1){
          num --;        
        }else{
          const content = "确认要删除吗？";
          const result = await showMode(content);
          if (result.confirm) {
            this.deleteGoods(id);
          }
        }
        break;
        
      default:
        num++;  
      break;
    }
    if(cart[index]){
      cart[index].num = num;
      cart[index].checked = true;
    }
    //重新计算总价、选择，和加入缓存    
    this.countMoney(cart);
  },

  // 删除商品
  deleteGoods(goods_id){
    console.log("执行删除工作" + goods_id);
    const cart = this.data.cart;
    let index = cart.findIndex(v=>v.goods_id == goods_id);
    console.log(index); 
    cart.splice(index,1);
    let index1 = cart.findIndex(v=>v.goods_id == goods_id);
    console.log(index1); 
    this.countMoney(cart);

    
  },

  // 点击结算
  async handlePay(){
    const {address,totalNum} = this.data;
    
    // 1.检查是否有收获地址
    if(!address.userName){
      const title = "您还没有选择收货地址呢~";
      await showToast(title);
      return;
    }
    
    //2.检查是否有订单
    if(totalNum<1){
      const title = "您还没有选购商品呢~";
      await showToast(title);
      return;
    }

    //3.结算
    wx.navigateTo({
      url: '/pages/pay/pay',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      





  }




})