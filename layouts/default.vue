<template>
  <q-layout view="lHh Lpr lFf" bg-negative>
    <q-layout-header>
      <q-toolbar
        color="red"
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
        <img src="~assets/barcode-scan.svg" @click="startCodeBar">
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        highlight
        dense
      >
         <q-item to="/menu">
          <q-item-side icon="fas fa-home" color="primary"/>
          <q-item-main label="Inicio" sublabel="Página inicial" />
        </q-item>
        <q-item to="/profile">
          <q-item-side icon="fas fa-user-alt" color="primary"/>
          <q-item-main label="Perfil" sublabel="Meus dados" />
        </q-item>
        <q-item to="/ofertas">
          <q-item-side icon="fas fa-credit-card" color="primary"/>
          <q-item-main label="Ofertas" sublabel="Ofertas" />
        </q-item>
        <q-item to="/site">
          <q-item-side icon="fab fa-internet-explorer" color="primary"/>
          <q-item-main label="Site" sublabel="www.lojasrede.com.br" />
        </q-item>
        <q-item>
          <q-item-side icon="fas fa-arrow-left" color="primary"/>
          <q-item-main label="Sair" sublabel="Login" to="/"/>
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
  created () {
    this.totalFavoriteItens = this.$q.localStorage.get.item('favorite') === null ? '' : this.$q.localStorage.get.item('favorite').length
    this.totalCartItens = this.$q.localStorage.get.item('cart') === null ? '' : this.$q.localStorage.get.item('cart').length
  },
  methods: {
    openURL,
    setCartLength: function (value) {
      this.totalCartItens = value.total
    },
    setFavoriteLength: function (value) {
      this.totalFavoriteItens = value.total
    },
    startCodeBar: function () {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          alert('We got a barcode\n' +
                'Result: ' + result.text + '\n' +
                'Format: ' + result.format + '\n' +
                'Cancelled: ' + result.cancelled)
        },
        function (error) {
          alert('Scanning failed: ' + error)
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: false, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: false, // Android, save scan history (default false)
          prompt: 'Place a barcode inside the scan area', // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: 'EAN_13', // default: all but PDF_417 and RSS_EXPANDED
          orientation: 'landscape', // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        })
    }
  }
}
</script>

<style>
</style>
