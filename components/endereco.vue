<template>
  <q-card class="q-mt-md">
      <q-card-title>
        Endereço
      </q-card-title>
      <q-card-main>
         <q-input
          type="text"
          v-model="cep"
          float-label="Cep"
          @blur="buscarCep"/>

        <q-input
          float-label="Rua"/>

        <q-input
          float-label="Estado"/>

        <q-input
          float-label="Cidade"/>

        <q-input
          float-label="Bairro"/>
      </q-card-main>
    </q-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EnderecoLocale',
  methods: {
    buscarCep: function () {
      axios.get(`http://viacep.com.br/ws/${this.cep}/json/`)
        .then(response => {
          this.$emit('endereco', response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
