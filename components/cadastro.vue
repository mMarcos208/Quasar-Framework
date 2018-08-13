<template>
<div>
  <div class="row cabecalho">
    <div class="q-mt-md q-ml-md">
      <q-icon
        v-go-back=" '/'"
        name="fas fa-arrow-left"
      />
    </div>
    <div class="q-mt-md q-ml-md">
      <span class="voltar">Tela Inicial</span>
    </div>
  </div>
  <form>
    <div class="row justify-center q-mt-sm" v-if="photo">
      <img :src="photo" class="borderRadius">
    </div>
    <div class="row justify-center q-mt-sm q-ma-md" v-else>
      <div class="col-12">
        <q-uploader :url="photo" auto-expand/>
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col-12">
        <q-input
          v-model="cliente.cpf"
          float-label="Cpf"
          @blur="$v.cliente.cpf.$touch"
          @keyup.enter="submit" :error="$v.cliente.cpf.$error"
          :before="[{icon: 'credit_card', handler () {}}]" />
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col-12">
        <q-input
          v-model="nomeCompleto"
          float-label="Nome Completo"
          @blur="$v.cliente.nomeCompleto.$touch"
          @keyup.enter="submit" :error="$v.cliente.nomeCompleto.$error"
          :before="[{icon: 'person_pin', handler () {}}]" />
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col-12">
        <q-input
          v-model="email"
          float-label="E-mail"
          @blur="$v.cliente.email.$touch"
          @keyup.enter="submit" :error="$v.cliente.email.$error"
          :before="[{icon: 'mail', handler () {}}]"/>
      </div>
    </div>
    <div class="row q-ma-md">
      <q-radio color="primary" v-model="cliente.option" val="M" label="Masculino" />
      <q-radio color="red" class="q-ml-xl" v-model="cliente.option" val="F" label="Feminino" />
    </div>
    <div class="row q-ma-md">
      <div class="col-5">
         <q-input
          type="text"
          v-model="cliente.cep"
          float-label="Cep"
          @blur="buscarCep"/>
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col-12">
        <q-input
          v-model="cliente.logradouro"
          float-label="Rua"/>
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col-12">
        <q-input
          v-model="cliente.uf"
          float-label="Estado"/>
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col-12">
        <q-input
          v-model="cliente.localidade"
          float-label="Cidade"/>
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col-12">
        <q-input
          v-model="cliente.bairro"
          float-label="Bairro"/>
      </div>
    </div>
  <div>
  <q-btn
    size="xl"
    color="primary"
    class="fit"
    @click="submit">Salvar
  </q-btn>
  </div>
 </form>
</div>
</template>
<script>
import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'CreateCadastro',
  props: ['email', 'nomeCompleto', 'photo'],
  data () {
    return {
      cliente: {
        cpf: '',
        cep: '',
        logradouro: '',
        localidade: '',
        bairro: '',
        uf: '',
        option: ''
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
.borderRadius {
  border-radius: 20px;
  max-width: 100px;
  max-height: 100px;
}
.cabecalho {
  height: 60px;
  background-color: red
}
.voltar {
  color: #fff;
  font-weight: bold
}
</style>
