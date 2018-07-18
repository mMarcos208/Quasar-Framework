<template>
  <q-layout view="lHh Lpr lFf" bg-negative>
    <q-layout-header>
      <q-toolbar
        color="bg-white"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
              Clube Lojas REDE
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        highlight
      >
         <q-item to="/menu">
          <q-item-side icon="fas fa-home" />
          <q-item-main label="Inicio" sublabel="Página inicial" />
        </q-item>
        <q-item to="/profile">
          <q-item-side icon="fas fa-user-alt" />
          <q-item-main label="Perfil" sublabel="Meus dados" />
        </q-item>
        <q-item to="/ofertas">
          <q-item-side icon="fas fa-credit-card" />
          <q-item-main label="Ofertas" sublabel="Ofertas" />
        </q-item>
        <q-item to="/site">
          <q-item-side icon="fab fa-internet-explorer"/>
          <q-item-main label="Site" sublabel="www.lojasrede.com.br" />
        </q-item>
        <q-item to="/">
          <q-item-side icon="fas fa-arrow-left"/>
          <q-item-main label="Sair" sublabel="Login" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view @cartItensLength="setCartLength" @favoriteItensLength="setFavoriteLength"/>
    </q-page-container>
    <q-layout-footer>
      <q-tabs color="negative">
        <q-route-tab
        v-bind:count="totalCartItens"
        icon="fas fa-cart-plus"
        to="/cart"
        exact
        slot="title"/>
        <q-route-tab
        v-bind:count="totalFavoriteItens"
        icon="far fa-heart"
        to="/favorite"
        exact
        slot="title"/>
        <q-route-tab
        icon="account_circle"
        to="/profile"
        exact
        slot="title"/>
      <q-route-tab
        icon="not_listed_location"
        to="/gMaps"
         exact
        slot="title"/>
      </q-tabs>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      totalCartItens: null,
      totalFavoriteItens: null
    }
  },
  methods: {
    openURL,
    setCartLength: function (value) {
      console.log(value)
      this.totalCartItens = value.total
    },
    setFavoriteLength: function (value) {
      console.log(value)
      this.totalFavoriteItens = value.total
    }
  }
}
</script>

<style>
</style>
