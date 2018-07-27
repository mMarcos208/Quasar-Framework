const vueFB = {}
vueFB.install = function install (Vue, options) {
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = '//connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
    console.log('setting fb sdk')
  }(document, 'script', 'facebook-jssdk'))

  window.fbAsyncInit = function onSDKInit () {
    window.FB.init(options)
    window.FB.AppEvents.logPageView()
    Vue.FB = window.FB
    window.dispatchEvent(new Event('fb-sdk-ready'))
  }
  Vue.FB = undefined
}
import FBSignInButton from 'vue-facebook-signin-button'

export default ({ Vue }) => {
  Vue.use(vueFB, {
    appId: '1854483668193025',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.0'
  })
  Vue.use(FBSignInButton)
}
