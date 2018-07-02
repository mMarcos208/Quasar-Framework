<template>
  <div class="q-ma-md q-mt-xl">
    <q-btn
      v-go-back="'/'"
      flat
      color="red">
      <q-icon
        v-go-back=" '/'"
        name="arrow_back_ios"
        /> Voltar
    </q-btn>

    <q-input
      v-model="pessoa.cpf"
      float-label="Cpf"
      @blur="$v.pessoa.cpf.$touch"
      @keyup.enter="submit" :error="$v.pessoa.cpf.$error"
      :before="[{icon: 'credit_card', handler () {}}]" />

    <q-input
      v-model="pessoa.nome"
      float-label="Nome Completo"
      @blur="$v.pessoa.nome.$touch"
      @keyup.enter="submit" :error="$v.pessoa.nome.$error"
      :before="[{icon: 'person_pin', handler () {}}]" />

    <q-input
      v-model="pessoa.email"
      float-label="E-mail"
      @blur="$v.pessoa.email.$touch"
      @keyup.enter="submit" :error="$v.pessoa.email.$error"
      :before="[{icon: 'mail', handler () {}}]"/>

    <q-input
      type="password"
      v-model="pessoa.senha"
      float-label="Senha"
      :after="[{icon: 'done', condition: pessoa.senha.length >= 5, handler () {}}]"
      :before="[{icon: 'fas fa-key', handler () {}}]"/>

    <q-input
      v-model="pessoa.confirmSenha"
      type="password"
      float-label="Confirme Senha"
      :after="[{icon: 'done', condition: pessoa.confirmSenha.length >= 5, handler () {}}]"
      :before="[{icon: 'fas fa-key', handler () {}}]"
      @blur="$v.pessoa.confirmSenha.$touch"
      :error="$v.pessoa.confirmSenha.$error"
      />

  <q-field icon="place" class="q-mt-sm">
    <q-input
      type="number"
      v-model="pessoa.endereco.cep"
      float-label="Cep"
      @blur="buscarCep"/>

    <q-input
      v-model="pessoa.endereco.logradouro"
      float-label="Rua"/>

    <q-input
      v-model="pessoa.endereco.cidade"
      float-label="Cidade"/>

    <q-input
      v-model="pessoa.endereco.estado_info.nome"
      float-label="Estado"/>
  </q-field>

  <q-btn
    color="negative"
    @click="submit"
    class="q-mt-sm float-right">Salvar
  </q-btn>
</div>

</template>
<script>
import axios from 'axios'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'CreateCadastro',
  data () {
    return {
      pessoa: {
        nome: '',
        cpf: '',
        email: '',
        senha: '',
        confirmSenha: '',
        endereco: {
          cep: '',
          logradouro: '',
          cidade: '',
          estado_info: {
            nome: ''
          }
        }
      }
    }
  },
  validations: {
    pessoa: {
      email: { required, email },
      nome: { required },
      cpf: { required },
      senha: { required, minLength: minLength(6) },
      confirmSenha: { sameAsPassword: sameAs('senha') }
    }
  },
  methods: {
    buscarCep: function () {
      axios.get(`https://api.postmon.com.br/v1/cep/${this.pessoa.endereco.cep}`)
        .then(response => {
          this.pessoa.endereco = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submit: function () {
      this.$v.pessoa.$touch()
      if (this.$v.pessoa.$error) {
        this.$q.notify({
          message: 'Por favor, preencha corretamente os campos!',
          icon: 'fas fa-exclamation-triangle',
          position: 'top'
        })
      } else {
        // axios.post('', this.pessoa)
        // .then(response => {
        //   this.pessoa.endereco = response.data
        // })
        // .catch(function (error) {
        //   console.log(error)
        // })
        this.$router.push('/')
      }
    }
  }
}
</script>
<style>
</style>
