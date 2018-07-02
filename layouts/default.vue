<template>
  <q-layout view="lHh Lpr lFf" bg-negative>
    <q-layout-header>
      <q-toolbar
        color="negative"
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
        link
        inset-delimiter
      >
        <q-list-header>
          MENU
        </q-list-header>
        <hr>
         <q-item to="/menu">
          <q-item-side icon="home" />
          <q-item-main label="Inicio" sublabel="Página inicial" />
        </q-item>
        <q-item to="/profile">
          <q-item-side icon="account_circle" />
          <q-item-main label="Perfil" sublabel="Meus dados" />
        </q-item>
        <q-item to="/">
          <q-item-side icon="arrow_back_ios"/>
          <q-item-main label="Sair" sublabel="Sair" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer>
      <q-tabs color="negative">
        <q-route-tab
        icon="account_circle"
        to="/profile"
         exact
        slot="title"/>
      <q-route-tab
        icon="not_listed_location"
        to="/local"
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
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
