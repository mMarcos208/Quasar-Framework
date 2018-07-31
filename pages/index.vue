<template>
  <q-page padding>
  <div>
       <q-carousel
      color='white'
      arrows
      quick-nav
      height='200px'
    >
      <q-carousel-slide img-src='statics/telaInicio.png' />
      <q-carousel-slide img-src='statics/loja-caete.jpg' />
    </q-carousel>
  </div>
  <div class=' q-mt-md'>
    <div class='row justify-center'>
      <q-icon name='place'
        style='font-size: 35px' color='red'/>
    </div>
    <div class='row justify-center'>
      <span>
      Você está a {{this.km}} m desta loja
      </span>
    </div>
    <div class='row justify-center text-weight-bold'>
      <span style='size: 50px;'>{{this.indentificacao}}</span>
    </div>
    <div class='row q-mt-md justify-center'>
     <q-btn
      color='negative'
      size='lg'
      @click='minimizedModal=true'>
      Trocar Loja
     </q-btn>
    </div>
    <q-modal v-model='minimizedModal' :content-css="{padding: '50px'}" position="top">
      <div class='q-display-1'>Trocar Loja</div>
      <p>Escolha outra loja!</p>
      <q-btn color='red' v-close-overlay label='Fechar' />
    </q-modal>
    <div class='row justify-center q-mt-md'>
      {{ this.logradouro }}
    </div>
    <div class='row justify-center'>
      {{ this.bairro }}
    </div>
    <div class='row justify-center text-weight-bold q-mt-md'>
      {{ this.telefone }}
    </div>
  </div>
  <div class='fundoCinza q-mt-sm'>
    <div class='row text-center'>
      <div class='col-3 q-mt-lg'>
        <q-btn
          round
          icon='fab fa-internet-explorer'
          size='lg'
          @click='redirectSite'
          />
      </div>
      <div class='col-3 q-mt-lg'>
        <q-btn
          round
          icon='fab fa-facebook'
          size='lg'
          @click='redirectFacebook'/>
      </div>
      <div class='col-3 q-mt-lg'>
        <q-btn
          round
          icon='fab fa-instagram'
          size='lg'
          @click='redirectInstagram'/>
      </div>
      <div class='col-3 q-mt-lg'>
        <q-btn
          round
          icon='fab fa-twitter'
          size='lg'
          @click='redirectTwitter'/>
      </div>
    </div>
  </div>
  </q-page>
</template>
<style>
.borda {
  border-radius: 70px;
}
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      km: '14,6',
      logradouro: 'Rua dos Caetés, 499',
      bairro: 'Centro - BELO HORIZONTE',
      telefone: '(31) 3514-0871',
      indentificacao: '50 - Caetés',
      minimizedModal: false,
      position: 'top'
    }
  },
  methods: {
    redirectSite: function () {
      window.location.href = 'http://www.lojasrede.com.br'
    },
    redirectFacebook: function () {
      window.location.href = 'https://www.facebook.com/lojasrede/'
    },
    redirectInstagram: function () {
      window.location.href = 'https://www.instagram.com/lojasrede/?hl=pt-br'
    },
    redirectTwitter: function () {
      window.location.href = 'https://twitter.com/lojasrede'
    }
  }
}
</script>
