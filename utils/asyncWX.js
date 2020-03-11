export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success:(result)=>{
                resolve(result);
            },
            fail:(error)=>{
                reject(error);
            }
        });
    });
}



// 选择地址
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success:(result)=>{
                resolve(result);
            },
            fail:(error)=>{
                reject(error);
            }
        });
    });
}




// 打开设置
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success:(result)=>{
                resolve(result);
            },
            fail:(error)=>{
                reject(error);
            }
        });
    });
}


// 弹框：确认要删除
export const showMode=(content)=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error);
            },
        });
    })
}


// 提示框
export const showToast=(title)=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 1500,
            mask: true,
            success: (result) => {
                resolve(result);
            },
            fail: (error) => {
                reject(error);
            },
        });
    })
}