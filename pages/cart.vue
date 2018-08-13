<template>
  <q-page padding>
    <div v-if="this.cartItens.length > 0">
      <div  v-for='(item) in this.cartItens' :key='item.id'>
      <div class="row q-mt-sm">
        <div class="col-4">
          <img v-bind:src="item.url">
        </div>
        <div class="col-7 q-ml-sm">
          <span class=".q-headline">{{item.title}}</span>
          <br>
          <q-btn size="sm" color="negative" @click="removeItem(item.id)">
            <q-icon name="fas fa-trash" />
          </q-btn>
        </div>
      </div>
     </div>
    <q-btn
      class="fit"
      color="primary"
      to="creditCart">
      Finalizar
    </q-btn>
    </div>
    <div v-else>
      <div class="row justify-center q-mt-xl">
        <span class="q-headline">Seu carrinho está vazio.</span>
      </div>
      <div class="row justify-center q-mt-xl">
        <span class="q-display-4"><q-icon name="fas fa-cart-plus" color="negative"/></span>
        <q-btn class="fit q-ma-xl" color="primary" to="/ofertas">Continuar comprando</q-btn>
      </div>
     </div>
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
  beforeMount () {
    this.cartItens = this.$q.localStorage.get.item('cart')
  },
  methods: {
    removeItem: function (item) {
      var index = -1
      this.cartItens.forEach(function (entry) {
        if (entry.id === item) {
          index++
        }
      })
      if (index > -1) {
        this.cartItens.splice(index, 1)
      }
      this.setLocalStorage('cartItensLength', 'cart', this.cartItens)
    },
    setLocalStorage: function (emit, key, array) {
      this.$emit(emit, { total: array.length })
      this.$q.localStorage.set(key, array)
    }
  }
}
</script>

<style>
</style>
