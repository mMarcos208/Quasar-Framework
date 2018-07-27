<template padding>
  <div class="q-pa-md fundoCinza">
    <div class="row q-mt-xl text-weight-bold justify-center">
      <span style="font-size:25px;">Acesse agora o Clube</span>
    </div>
    <div class="row text-weight-bold justify-center">
      <span style="font-size:25px;"> XXXXX!</span>
    </div>
    <form v-on:submit.prevent="submit()">
      <div class="row q-mt-xl">
        <div class="col-12">
         <q-input
            v-model="form.cpf"
            type="number"
            float-label="Cpf"
            :after="[
            {
              icon: 'send',
              handler () {
                submit()
              }
            }
          ]"/>
        </div>
      </div>
      <div class="row q-mt-xl">
        <p>Informe seu CPF para entrar em uma conta ou criar uma nova. Seus dados são apenas para identificação.</p>
      </div>
      <div class="row q-mt-md">
        <q-btn
            icon-right="fab fa-facebook-square"
            class="fit"
            size="md"
            color="primary">
          <fb-signin-button
            :params="fbSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            Entrar com Facebook
          </fb-signin-button>
        </q-btn>
      </div>
      <!-- <div>
        <q-btn
        @click="login">
        FAcebook do Cordova
        </q-btn>
      </div> -->
      <div class="row q-mt-md">
        <q-btn
        icon-right="fab fa-google"
        class="fit"
        size="md"
        color="red">
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccessG"
        @error="onSignInErrorG">
        Entrar com Google
      </g-signin-button>
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
        scope: 'email,public_profile',
        return_scopes: true
      },
      googleSignInParams: {
        client_id: '282929403016-obgrh4eonpt6oa5isg721cvjd8iu1n7f.apps.googleusercontent.com'
      },
      form: {
        cpf: ''
      }
    }
  },
  beforeMount () {
    let value = this.$q.localStorage.get.item('cpf')
    this.form.cpf = value !== null ? value.cpf : ''
  },
  methods: {
    submit: function () {
      this.$q.localStorage.set('cpf', this.form)
      // axios.get(`http://http://192.168.1.45:51046/api/values/`)
      //   .then(response => {
      //     console.log(response)
      //     //  axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken
      //   })
      //  this.login()
      this.$router.push('/menu')
    },
    onSignInSuccess (response) {
      window.FB.api('/me', dude => {
        console.log(dude)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    onSignInSuccessG (googleUser) {
      const profile = googleUser.getBasicProfile()
      console.log(profile)
    },
    onSignInErrorG (error) {
      console.log('OH NOES', error)
    },
    login () {
      alert('Entrou no login!')
      window.FB.login(function (response) {
        console(response)
      }, {scope: 'public_profile,email'})
      //  this.$router.push('/menu')
      //  window.facebookConnectPlugin.login(['email, public_profile'], this.onSignInSuccess, this.onSignInError)
    }
  }
}
</script>

<style>
</style>
