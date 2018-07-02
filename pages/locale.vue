<template>
  <q-page padding>
    <!-- content -->
    <q-search
      Placeholder="Procurar por uma loja especifica"
      icon="place"
      color="red"
      v-model="search"
      stack-label="Pesquisar lojas próximas" />

     <q-card inline class="bigger q-ma-sm">
      <q-card-media>
        <img src="~assets/loja-caete.jpg">
      </q-card-media>
      <q-card-title class="relative-position">
        <q-btn fab color="primary" icon="place" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" />

        <div class="ellipsis">Loja Unidade Caetés</div>
        <q-rating slot="subtitle" v-model="stars" :max="5" />
        <div slot="right" class="row items-center">
          <q-icon name="place" /> 250 ft
        </div>
      </q-card-title>
      <q-card-main>
        <p>Endereço</p>
        <p class="text-faded">Rua dos Caetés, 499 - Centro, Belo Horizonte - MG, 30120-080</p>
        <q-btn flat color="primary">Ir até a loja</q-btn><br/>
      </q-card-main>
      <q-card-separator />
      <q-card-actions>
      <q-tree
        :nodes="simple"
        node-key="label"
      />
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script>
export default {
  name: 'Localizacao',
  data () {
    return {
      search: '',
      stars: 3,
      simple: [{
        label: '',
        icon: 'event',
        children: [
          {
            label: 'Segunda 08:00 - 20:30'
          },
          {
            label: 'Terça 08:00 - 20:30'
          }]
      }]
    }
  }
}
</script>

<style>
</style>
