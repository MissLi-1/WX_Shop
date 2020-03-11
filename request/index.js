let ajaxTimes = 0;

export const request = (params)=>{
    ajaxTimes++;
    //显示加载中效果
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
      
    // resolve作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
    // reject作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 
    return new Promise((resolve,reject)=>{
       const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1/";
        wx.request({
            //解构出参数
            ...params,
            url : baseURL + params.url,
            success:(result)=>{
                //成功后将结果给resolve
                resolve(result.data.message);
                
            },
            fail:(error)=>{
                //失败后将错误给reject
                reject(error)
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes == 0){
                    //关闭加载中图标
                    wx.hideLoading();
                }  
            }
        });
          
    })
}