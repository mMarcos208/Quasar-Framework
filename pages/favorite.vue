<template>
  <q-page padding>
    <div  v-for='(item,indice) in this.favoriteItens' :key='indice'>
      <div class="row q-mt-sm">
        <div class="col-4">
          <img v-bind:src="item.url">
        </div>
        <div class="col-7 q-ml-sm">
          <span class=".q-headline">{{item.title}}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <q-btn
        class="fit"
        color="primary">
      Finalizar
      </q-btn>
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
