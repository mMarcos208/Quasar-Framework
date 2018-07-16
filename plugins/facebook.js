import FBSignInButton from 'vue-facebook-signin-button'

export default ({ Vue }) => {
  Vue.use(FBSignInButton, {
    load: {
      appId: '1854483668193025'
    }
  })
}
