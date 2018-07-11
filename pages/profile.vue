<template>
  <q-page padding>
    <q-search
      v-model="search"
      :debounce="600"
      icon="fas fa-location-arrow"
      float-label="Qual o seu Cpf?"
      clearable
      align="right"
      :after="[
      {
        icon: 'getPessoa',
        error: true,
        handler () {
        }
      }
      ]"
    />
    <q-btn
    color="primary"
    class="q-mt-sm fit"
    @click="getPessoa">Pesquisar
  </q-btn>
  <q-list highlight>
  <q-list-header>Pessoas</q-list-header>
  <q-item >
  </q-item>
  </q-list>

  <pre>{{cliente}}</pre>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SearchPerfil',
  data () {
    return {
      search: '',
      cliente: ''
    }
  },
  methods: {
    getPessoa: function () {
      axios.get(`http://localhost:62748/api/cliente/${this.search}`)
        .then(response => {
          this.cliente = response.data
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
