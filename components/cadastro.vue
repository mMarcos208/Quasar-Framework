<template>
  <div class="q-ma-xl">
      <q-icon
        v-go-back=" '/'"
        name="fas fa-arrow-left"
        />
  <form>
  <q-card class="q-mt-md">
      <q-card-title>
        Dados Pessoais
      </q-card-title>
      <q-card-main>
        <q-input
          v-model="cliente.cpf"
          float-label="Cpf"
          @blur="$v.cliente.cpf.$touch"
          @keyup.enter="submit" :error="$v.cliente.cpf.$error"
          :before="[{icon: 'credit_card', handler () {}}]" />

        <q-input
          v-model="cliente.nomeCompleto"
          float-label="Nome Completo"
          @blur="$v.cliente.nomeCompleto.$touch"
          @keyup.enter="submit" :error="$v.cliente.nomeCompleto.$error"
          :before="[{icon: 'person_pin', handler () {}}]" />

        <q-input
          v-model="cliente.email"
          float-label="E-mail"
          @blur="$v.cliente.email.$touch"
          @keyup.enter="submit" :error="$v.cliente.email.$error"
          :before="[{icon: 'mail', handler () {}}]"/>
      </q-card-main>
  </q-card>
    <q-card class="q-mt-md">
      <q-card-title>
        Endereço
      </q-card-title>
      <q-card-main>
         <q-input
          type="text"
          v-model="cliente.cep"
          float-label="Cep"
          @blur="buscarCep"/>

        <q-input
          v-model="cliente.logradouro"
          float-label="Rua"/>

        <q-input
          v-model="cliente.uf"
          float-label="Estado"/>

        <q-input
          v-model="cliente.localidade"
          float-label="Cidade"/>

        <q-input
          v-model="cliente.bairro"
          float-label="Bairro"/>
      </q-card-main>
    </q-card>
  <q-btn
    color="primary"
    class="q-mt-sm fit"
    @click="submit">Salvar
  </q-btn>
 </form>
</div>

</template>
<script>
import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'CreateCadastro',
  data () {
    return {
      cliente: {
        nomeCompleto: '',
        cpf: '',
        email: '',
        cep: '',
        logradouro: '',
        localidade: '',
        bairro: '',
        uf: ''
      }
    }
  },
  validations: {
    cliente: {
      email: { required, email },
      nomeCompleto: { required },
      cpf: { required }
    }
  },
  methods: {
    buscarCep: function () {
      axios.get(`http://viacep.com.br/ws/${this.cliente.cep}/json/`)
        .then(response => {
          this.cliente = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submit: function () {
      this.$v.cliente.$touch()
      if (this.$v.cliente.$error) {
        this.$q.notify({
          message: 'Por favor, preencha corretamente os campos!',
          icon: 'fas fa-exclamation-triangle',
          position: 'top'
        })
      } else {
        axios.post('http://localhost:62748/api/cliente', this.cliente)
          .then(response => {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        //  this.$router.push('/')
      }
    }
  }
}
</script>
<style>
</style>
