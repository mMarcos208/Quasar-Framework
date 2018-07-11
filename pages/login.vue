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
      form: {
        cpf: ''
      }
    }
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
    }
  },
  created: function () {
    let value = this.$q.localStorage.get.item('cpf')
    this.form.cpf = value !== null ? value.cpf : ''
  }
}
</script>

<style>
</style>
