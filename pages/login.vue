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
        <fb-signin-button
          :params="fbSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          Entrar com facebook
        </fb-signin-button>
          <q-btn
              class="fit"
              size="lg"
              color="primary"
              to="/cadastro">Cadastre-se
          </q-btn>
      </div>
    </form>
    <div class="row justify-center q-mt-md">
    <span color="red">Entrar como visitante</span>
    </div>
  </div>
</template>

<script>
//  import axios from 'axios'
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
  beforeMount () {
    window.fbAsyncInit = (function () {
      window.FB.init({
        appId: '1854483668193025',
        xfbml: true,
        version: 'v3.0'
      })
      window.FB.AppEvents.logPageView()
    })(function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    window.FB.getLoginStatus((response) => {
      this.statusChangeCallback(response)
    })
  },
  methods: {
    submit: function () {
      this.$q.localStorage.set('login', this.form)
      // axios.get(`http://http://192.168.1.45:51046/api/values/`)
      //   .then(response => {
      //     console.log(response)
      //     //  axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken
      //   })
      this.$router.push('/menu')
    },
    statusChangeCallback: function (response) {
      console.log(response)
      if (response.status === 'connected') {
        this.testAPI()
      } else {
        // document.getElementById('status').innerHTML = 'Por favor, faça o login para acesso exclusivo as promoções!'
      }
    },
    checkLoginState: function () {
      window.FB.getLoginStatus(function (response) {
        this.statusChangeCallback(response)
      })
    },
    testeAPi: function () {
      console.log('Welcome!  Fetching your information.... ')
      window.FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name)
        document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!'
      })
    },
    onSignInSuccess (response) {
      window.FB.api('/me', dude => {
        console.log(`Good to see you, ${dude.name}.`)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  },
  created: function () {
    let value = this.$q.localStorage.get.item('cpf')
    this.form.cpf = value !== null ? value.cpf : ''
  }
}
</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>
