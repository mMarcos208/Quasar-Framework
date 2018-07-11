<template>
   <q-page padding class="backgroundPage">
     <div>
         <gmap-map
            :center="center"
            :zoom="15"
            style="width:100%;  height: 400px; margin-top: 30px;">
            <gmap-marker
               :key="index"
               v-for="(m, index) in markers"
               :position="m.position"
               @click="center=m.position"
               ></gmap-marker>
         </gmap-map>
      <q-list highlight size="sm" class="q-ma-md borderRadius" v-if="this.detalhesLojas > 0" v-for="(item,indice) in this.detalhesLojas" :key="indice">
        <q-list-header>{{item.name}}</q-list-header>
          <q-item>
            <q-item-side>
                {{ indice + 1}}
            </q-item-side>
          <q-item-main v-bind:label="item.address" />
            <q-item-side>
                <b>Distância: {{ item.distance }}</b>
            </q-item-side>
          </q-item>
       </q-list>
      </div>
   </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Localizacao',
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
      }]
    }
  },
  mounted () {
    this.geolocate()
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
          var distance = parseFloat(markerNodes[0].distance)
          var latlng = new window.google.maps.LatLng(
            parseFloat(markerNodes[0].lat),
            parseFloat(markerNodes[0].lng))

          this.createOption(name, distance, 0)
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
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }
      this.markers.length = 0

      var option = document.createElement('option')
      option.value = 'none'
      option.innerHTML = 'See all results:'
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
    createOption: function (name, distance, num) {
      var option = document.createElement('option')
      option.value = num
      option.innerHTML = name
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(this.center)
        this.buscarLojas(this.center)
      })
    }
  }
}
</script>

<style>
.backgroundPage {
  background-color: #fff;
}
.borderRadius {
  border-radius: 30px;
}
</style>
