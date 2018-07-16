<template>
  <div>
     <gmap-map v-if='mostraMapa'
            :center='center'
            :zoom='15'
            map-type-id='terrain'
            style='width:100%;  height: 300px; margin-top: 10px;'
            :options='{styles: styles}'>
            <gmap-marker
               :key='index'
               v-for='(m, index) in markers'
               :position='m.position'
               @click='center=m.position'
               ></gmap-marker>
         </gmap-map>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MeuMapa',
  props: ['mostraMapa'],
  data () {
    return {
      search: '',
      standard: 1,
      map: '',
      markers: [],
      infoWindow: '',
      center: { lat: -19.9191248, lng: -43.9386291 },
      places: [],
      currentPlace: null,
      detalhesLojas: [{
        name: '',
        address: ''
      }],
      styles: [
        {
          'featureType': 'administrative',
          'elementType': 'geometry',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'transit',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        }
      ]
    }
  },
  methods: {
    buscarLojas: function (center) {
      this.clearLocations()

      axios.get(`http://localhost:62748/api/local/${center.lat}/${center.lng}`)
        .then(resposta => {
          this.detalhesLojas = resposta.data
          var markerNodes = resposta.data
          var bounds = new window.google.maps.LatLngBounds()
          var name = markerNodes[0].name
          var address = markerNodes[0].address
          var latlng = new window.google.maps.LatLng(
            parseFloat(markerNodes[0].lat),
            parseFloat(markerNodes[0].lng))

          this.createMarker(latlng, name, address)
          bounds.extend(latlng)
          this.map.fitBounds(bounds)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    clearLocations: function () {
      this.infoWindow = new window.google.maps.InfoWindow()
      this.infoWindow.close()
    },
    createMarker: function (latlng, name, address) {
      var html = `<b>${name}</b><br/>${address}`
      var marker = new window.google.maps.Marker({
        map: this.map,
        position: latlng
      })
      window.google.maps.event.addListener(marker, 'click', function () {
        this.infoWindow.setContent(html)
        this.infoWindow.open(this.map, marker)
      })
      this.markers.push(marker)
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.buscarLojas(this.center)
      })
    }
  }
}
</script>

<style>
</style>
