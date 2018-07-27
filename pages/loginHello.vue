<template>
<div>
     <q-btn
        icon-right="fab fa-facebook"
        class="fit"
        size="md"
        color="primary"
        @click="login">
        Entrar com Facebook
      </q-btn>
</div>
</template>

<script>
export default {
  // name: 'PageName',
  methods: {
    login: function () {
      window.facebookConnectPlugin.login(['public_profile'], this.fbLoginSuccess,
        function loginError (error) {
          console.error(error)
        })
    },
    fbLoginSuccess: function (userData) {
      console.log('UserInfo:', userData)
    }
  }
}
</script>

<style>
</style>
