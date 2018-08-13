<template>
  <q-page padding>
    <div v-if="favoriteItens">
      <div  v-for='(item,indice) in this.favoriteItens' :key='indice'>
        <div class="row q-mt-sm">
          <div class="col-4">
            <img v-bind:src="item.url">
          </div>
          <div class="col-7 q-ml-sm">
            <span class=".q-headline">{{item.title}}</span>
          </div>
        </div>
        <div class="row">
          <q-btn
            class="fit"
            color="primary">
          Finalizar
          </q-btn>
        </div>
      </div>
    </div>
      <div v-else>
      <div class="row justify-center q-mt-xl">
        <span class="q-headline">Sem favoritos!</span>
      </div>
      <div class="row justify-center q-mt-xl">
        <span class="q-display-4"><q-icon name="far fa-frown" color="green"/></span>
        <q-btn class="fit q-ma-xl" color="primary" to="/ofertas">Adicionar Favoritos</q-btn>
      </div>
     </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      favoriteItens: []
    }
  },
  created () {
    this.favoriteItens = this.$q.localStorage.get.item('favorite')
  }
}
</script>

<style>
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
