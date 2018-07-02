<template>
   <div class="center">
   <form v-on:submit.prevent="submit()">
        <div>
            <q-input
              type="text"
              color="blue"
              size="xl"
              v-model="form.email"
              @blur="$v.form.email.$touch"
              :error="$v.form.email.$error"
              :before="[{icon: 'mail', handler () {}}]"/>
            <q-input
              type="password"
              color="blue"
              size="xl"
              v-model="form.password"
              @blur="$v.form.password.$touch"
              :error="$v.form.password.$error"
              :before="[{icon: 'fas fa-key', handler () {}}]"/>
            <q-btn
                class="q-mr-sm q-mt-sm"
                flit
                color="negative"
                @click="submit">Entrar
            </q-btn>
            <q-btn
                class="q-mt-sm"
                flit
                color="primary"
                to="/cadastro">Cadastre-se
            </q-btn>
        </div>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: '',
        lembrar: ''
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    submit: function () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.$q.localStorage.set('login', this.form)
        // axios.post(`http://localhost:56795/api/Autenticacao`, this.form)
        //   .then(response => {
        //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken
        //   })
        this.$router.push('/menu')
      }
    }
  },
  created: function () {
    let value = this.$q.localStorage.get.item('login')
    this.form.email = value.email
    this.form.password = value.password
  }
}
</script>

<style>
</style>
