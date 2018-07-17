<template>
  <q-page padding>
    <q-infinite-scroll :handler="loadMore">
    <div class="row">
      <div v-for='(item,indice) in this.produtos' :key='indice'>
        <q-card inline class="q-ma-sm col-6">
          <q-card-media>
            <img v-bind:src="item.url">
          </q-card-media>
          <q-card-actions align="around">
            <q-btn flat round color="faded" icon="fas fa-shopping-cart" @click="cart(item.id)"/>
            <q-btn flat round v-bind:color="favoriteColor" icon="favorite" @click="favorite(item.id)" />
            <q-btn flat round color="primary" icon="share" to="whatsapp://send?text=Hello%20World!" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  <div class="row justify-center" style="margin-bottom: 50px;">
    <q-spinner-dots slot="message" color="red" :size="40" />
  </div>
</q-infinite-scroll>
<q-btn
  v-back-to-top
  round
  color="primary"
  class="fixed-bottom-right"
  style="margin: 0 15px 50px 0"
><q-icon name="keyboard_arrow_up" />
</q-btn>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageOfertas',
  data () {
    return {
      search: '',
      produtos: [],
      stars: 1,
      favoriteColor: '',
      cartItens: [],
      favoriteItens: []
    }
  },
  methods: {
    loadMore: function (index, done) {
      setTimeout(() => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
          .then(response => {
            let indiceInital = (index * 10) - 10
            let indiceFinal = index * 10
            this.produtos = this.produtos.concat(response.data.slice(indiceInital, indiceFinal))
            done()
          })
      }, 2500)
    },
    share: function () {

    },
    favorite: function (Id) {
      this.favoriteItens.push(Id)
      this.$emit('favoriteItensLength', { total: this.favoriteItens.length })
      this.$q.localStorage.set('favorite', this.favoriteItens)
      this.favoriteColor = this.favoriteColor === 'red' ? '' : 'red'
    },
    cart: function (Id) {
      console.log(`Adicionando ID:${Id} em carrinho`)
      this.cartItens.push(Id)
      this.$emit('cartItensLength', { total: this.cartItens.length })
      this.$q.localStorage.set('cart', this.cartItens)
    }
  }
}
</script>

<style>
</style>
