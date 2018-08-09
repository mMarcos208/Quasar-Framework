<template>
  <q-page padding>
     <div id='map_canvas'>
      <button id='button'>Click me!</button>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  created () {
    var div = document.getElementById('map_canvas')

    // Create a Google Maps native view under the map_canvas div.
    var map = window.plugin.google.maps.Map.getMap(div)

    // If you click the button, do something...
    var button = document.getElementById('button')
    button.addEventListener('click', function () {
      map.animateCamera({
        target: {lat: 37.422359, lng: -122.084344},
        zoom: 17,
        tilt: 60,
        bearing: 140,
        duration: 5000
      })
      var marker = map.addMarker({
        position: {lat: 37.422359, lng: -122.084344},
        title: 'Welecome to \n' +
                'Cordova GoogleMaps plugin for iOS and Android',
        snippet: 'This plugin is awesome!',
        animation: window.plugin.google.maps.Animation.BOUNCE
      })
      marker.showInfoWindow()
    })
  }
}
</script>

<style>
</style>
