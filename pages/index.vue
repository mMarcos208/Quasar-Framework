<template>
  <q-page>
  <div>
       <q-carousel
      color="white"
      arrows
      quick-nav
      height="300px"
    >
      <q-carousel-slide img-src="statics/telaInicio.png" />
      <q-carousel-slide img-src="statics/loja-caete.jpg" />
    </q-carousel>
  </div>
  <div class=" q-mt-md">
    <div class="row justify-center">
      <q-icon name="place"
        style="font-size: 35px" color="red"/>
    </div>
    <div class="row justify-center">
      <span>
      Você está a {{this.km}} m desta loja
      </span>
    </div>
    <div class="row justify-center text-weight-bold">
      <span style="size: 50px;">{{this.indentificacao}}</span>
    </div>
    <div class="row q-mt-md justify-center">
     <q-btn
      color="negative"
      size="lg"
      @click="minimizedModal=true">
      Trocar Loja
     </q-btn>
    </div>
    <q-modal v-model="minimizedModal" minimized :content-css="{padding: '50px'}" ref="modalRef">
      <div class="q-display-1 q-mb-md">Trocar Loja</div>
      <p>Escolha outra loja!</p>
      <q-btn color="red" v-close-overlay label="Close" />
    </q-modal>
    <div class="row justify-center q-mt-md">
      {{ this.logradouro }}
    </div>
    <div class="row justify-center">
      {{ this.bairro }}
    </div>
    <div class="row justify-center text-weight-bold q-mt-md">
      {{ this.telefone }}
    </div>
  </div>
  <div class="fundoCinza q-mt-sm">
    <div class="row text-center">
      <div class="col-3 q-mt-lg">
        <q-btn
          round
          icon="fab fa-internet-explorer"
          size="lg"
          @click="$router.replace('/https://www.lojasrede.com.br')"
          />
      </div>
      <div class="col-3 q-mt-lg">
        <q-btn
          round
          icon="fab fa-facebook"
          size="lg"/>
      </div>
      <div class="col-3 q-mt-lg">
        <q-btn
          round
          icon="fab fa-instagram"
          size="lg"/>
      </div>
      <div class="col-3 q-mt-lg">
        <q-btn
          round
          icon="fab fa-twitter"
          size="lg"/>
      </div>
    </div>
  </div>
  </q-page>
</template>
<style>
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
  }
}
</script>
