const baseurl = 'https://teamlight.chnja.cn'
// const baseurl = 'http://localhost:5000'

function request(method, url, data = {}, loading = true) {
  return new Promise(function(resolve, reject) {
    if (loading) {
      wx.showLoading({
        title: '加载中',
        mask: true,
      })
    }
    wx: wx.login({
      success: function(res) {
        data.code = res.code
        wx: wx.request({
          url: baseurl + url,
          data: data,
          method: method,
          success: function(res) {
            if (loading) {
              wx: wx.hideLoading()
            }
            console.log(res.data)
            if (res.data.code < 2000) {
              resolve(res.data)
            } else {
              wx: wx.showModal({
                title: '提示',
                content: '发生错误，错误代码：' + res.data.code,
                showCancel: false,
              })
              reject()
            }
          },
          fail: function(res) {
            // console.log(res)
            if (loading) {
              wx: wx.hideLoading()
            }
            wx: wx.showModal({
              title: '提示',
              content: '网络连接失败',
              showCancel: false,
            })
            reject()
          },
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  })
}


module.exports = {
  request: request,
}