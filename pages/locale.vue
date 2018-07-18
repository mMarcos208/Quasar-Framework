<template>
   <q-page class='bg-white'>
     <div>
         <gmap-map
            :center='center'
            :zoom='15'
            map-type-id='terrain'
            style='width:100%;  height: 300px; margin-top: 10px;'
            :options='{disableDefaultUI: true}'>
            <gmap-marker
               :key='index'
               v-for='(m, index) in markers'
               :position='m.position'
               @click='center=m.position'
               ></gmap-marker>
         </gmap-map>
         <div>
            <div class="row justify-center">
              <q-icon name="place"
                style="font-size: 35px" color="red"/>
            </div>
            <div class="row justify-center">
              <span>
                Lojas mais próximas a você!
              </span>
            </div>
          </div>
      <q-list class="q-ma-sm borderRadius" v-for='(item,indice) in this.detalhesLojas' :key='indice'>
        <q-collapsible v-bind:label="item.name">
          <div class='row'>
            {{ item.address }}
          </div>
          <div class='row q-mt-sm'>
            Distância: <b>{{ item.distance }} km</b>
          </div>
        </q-collapsible>
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
  mounted () {
    this.geolocate()
  },
  methods: {
    buscarLojas: function (center) {
      this.clearLocations()

      axios.get(`http://localhost:60543/api/local/${center.lat}/${center.lng}`)
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
.borderRadius {
  border-radius: 10px;
}
#floating-panel {
  position: absolute;
  top: 10px;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: 'Roboto','sans-serif';
  line-height: 30px;
  padding-left: 10px;
}
</style>
