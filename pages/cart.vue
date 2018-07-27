<template>
  <q-page padding>
     <div  v-for='(item,indice) in this.cartItens' :key='indice'>
      <div class="row q-mt-sm">
        <div class="col-4">
          <img v-bind:src="item.url">
        </div>
        <div class="col-7 q-ml-sm">
          <span class=".q-headline">{{item.title}}</span>
        </div>
      </div>
    </div>
    <q-btn
      class="fit"
      color="primary">
      Finalizar
    </q-btn>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      cartItens: []
    }
  },
  created () {
    this.cartItens = this.$q.localStorage.get.item('cart')
  }
}
</script>

<style>
</style>
