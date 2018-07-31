<template>
    <create-cadastro :email="this.email" :nomeCompleto="this.nomeCompleto" :photo="this.photo" />
</template>
<script>
import CreateCadastro from '../components/cadastro'

export default {
  components: {
    CreateCadastro
  },
  data () {
    return {
      nomeCompleto: '',
      email: '',
      photo: ''
    }
  },
  created () {
    let user = this.$q.localStorage.get.item('dadosPessoais')
    this.nomeCompleto = user.displayName
    this.email = user.email
    this.photo = user.imageUrl
  }
}
</script>
<style>
</style>
