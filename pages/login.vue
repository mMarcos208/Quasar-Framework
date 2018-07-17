<template>
  <div class="q-pa-md fundoCinza">
    <div class="row q-mt-xl text-weight-bold justify-center">
      <span style="font-size:25px;">Acesse agora o Clube</span>
    </div>
    <div class="row text-weight-bold justify-center">
      <span style="font-size:25px;"> Lojas REDE!</span>
    </div>
    <form v-on:submit.prevent="submit()">
      <div class="row q-mt-xl">
        <div class="col-12">
         <q-input
            v-model="form.cpf"
            type="number"
            float-label="Cpf"/>
        </div>
      </div>
      <div class="row q-mt-xl">
        <p>Informe seu CPF para entrar em uma conta ou criar uma nova. Seus dados são apenas para identificação.</p>
      </div>
      <div class="row q-mt-md">
          <q-btn
              class="fit"
              size="lg"
              color="negative"
              @click="submit">Entrar
          </q-btn>
      </div>
      <div class="row q-mt-md">
       <q-btn
              icon-right="fab fa-facebook-square"
              class="fit"
              size="lg"
              color="primary">
        <fb-signin-button
          :params="fbSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
          @click="clickLogin">
          Entrar com Facebook
        </fb-signin-button>
      </q-btn>
      </div>
    </form>
    <div class="row justify-center q-mt-md">
      <q-btn label="Entrar como Visitante"
        to="/menu"
        size="xs"
        color="dark" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      },
      form: {
        cpf: ''
      }
    }
  },
  created: function () {
    let ref = this
    let value = this.$q.localStorage.get.item('cpf')
    this.form.cpf = value !== null ? value.cpf : ''
    window.fbAsyncInit = (function () {
      window.FB.init({
        appId: '1854483668193025',
        xfbml: true,
        version: 'v2.7'
      })

      window.FB.getLoginStatus(function (response) {
        ref.statusChangeCallback(response)
      })
    })(function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },
  methods: {
    submit: function () {
      this.$q.localStorage.set('cpf', this.form)
      // axios.get(`http://http://192.168.1.45:51046/api/values/`)
      //   .then(response => {
      //     console.log(response)
      //     //  axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken
      //   })
      this.login()
    },
    statusChangeCallback: function (response) {
      if (response.status === 'connected') {
        window.FB.api('/me', (response) => {
          // this.login()
          // console.log('Successful login for: ' + response.name)
        })
      }
    },
    checkLoginState: function () {
      window.FB.getLoginStatus(function (response) {
        this.statusChangeCallback(response)
      })
    },
    onSignInSuccess (response) {
      window.FB.api('/me', dude => {
        this.login() // console.log(`Good to see you, ${dude.name}.`)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    login () {
      this.$router.push('/menu')
    },
    clickLogin: function () {
      window.FB.login(function (response) {
      }, {scope: 'public_profile,email'})
    }
  }
}
</script>

<style>
</style>
