<template>
  <q-page padding>
    <!-- content -->
    <div id="map_canvas"></div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  mounted () {
    var div = document.getElementById('map_canvas')

    window.plugin.google.maps.Map.getMap(div)
 
  }
}
</script>

<style>
</style>
