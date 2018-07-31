<template>
  <q-page padding>
    <q-infinite-scroll :handler="loadMore">
      <div class="row">
        <div v-for='(item,indice) in produtos' :key='indice' class="col-6">
          <q-card inline class="q-ma-sm bordaRedonda">
            <q-card-media>
              <img v-bind:src="item.url">
            </q-card-media>
            <q-card-actions align="around">
              <q-btn flat round icon="fas fa-shopping-cart" @click="cart($event,item)"/>
              <q-btn flat round icon="favorite" @click="favorite($event,item)"/>
              <q-btn flat round icon="share" to="whatsapp://send?text=Hello%20World!" />
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
      produtos: [],
      cartItens: [],
      favoriteItens: []
    }
  },
  created () {
    this.favoriteItens = this.$q.localStorage.get.item('favorite') === null ? [] : this.$q.localStorage.get.item('favorite')
    this.cartItens = this.$q.localStorage.get.item('cart') === null ? [] : this.$q.localStorage.get.item('cart')
  },
  methods: {
    loadMore: function (index, done) {
      setTimeout(() => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
          .then(response => {
            let indiceInital = (index * 6) - 6
            let indiceFinal = index * 6
            this.produtos = this.produtos.concat(response.data.slice(indiceInital, indiceFinal))
            done()
          })
      }, 1500)
    },
    share: function () {

    },
    favorite: function (event, item) {
      this.setColor(event)
      if (!this.filter(this.favoriteItens, item)) {
        this.favoriteItens.push(item)
      } else {
        this.removeItem(this.favoriteItens, item)
      }
      this.setLocalStorage('favoriteItensLength', 'favorite', this.favoriteItens)
    },
    cart: function (event, item) {
      this.setColor(event)
      if (!this.filter(this.cartItens, item)) {
        this.cartItens.push(item)
      } else {
        this.removeItem(this.cartItens, item)
      }
      this.setLocalStorage('cartItensLength', 'cart', this.cartItens)
    },
    filter: function (array, item) {
      let unique = false
      array.forEach(function (entry) {
        if (entry.id === item.id) {
          unique = true
        }
      })
      return unique
    },
    removeItem: function (array, item) {
      var index = -1
      array.forEach(function (entry) {
        if (entry.id === item.id) {
          index++
        }
      })
      if (index > -1) {
        array.splice(index, 1)
      }
    },
    setColor: function (element) {
      element.target.className.indexOf('text-red') === -1 ? element.target.classList.add('text-red') : element.target.classList.remove('text-red')
    },
    setLocalStorage: function (emit, key, array) {
      this.$emit(emit, { total: array.length })
      this.$q.localStorage.set(key, array)
    }
  }
}
</script>

<style>
.bordaRedonda {
  border-radius: 15px;
}
</style>
