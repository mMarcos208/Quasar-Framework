<template>
  <div>
     <gmap-map v-if='mostraMapa'
            :center='center'
            :zoom='20'
            style='width:100%;  height: 300px;'
            ref="map"
            :options='{disableDefaultUI: true, zoomControl: true}'>
            <gmap-marker
               :position='marker.position'
               @click='center=marker.position'
               ></gmap-marker>
         </gmap-map>
      <div class="row">
        <div class="col-10">
        </div>
        <div class="col-2 pull-right">
          <q-btn
            round
            icon='directions'
            size='lg'
            @click='calculateAndDisplayRoute'/>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MeuMapa',
  props: ['mostraMapa'],
  data () {
    return {
      map: '',
      marker: '',
      center: { lat: -19.9191248, lng: -43.9386291 },
      directionsDisplay: '',
      directionsService: ''

    }
  },
  mounted () {
    this.$nextTick(this.geolocate)
  },
  methods: {
    createMarker: function (latlng) {
      this.marker = new window.google.maps.Marker({
        setMap: this.$refs.map.$mapObject,
        position: latlng,
        animation: window.google.maps.Animation.DROP
      })
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationError, {maximumAge: 3000, timeout: 3000, enableHighAccuracy: true})
    },
    geolocationSuccess: function (position) {
      var latlng = new window.google.maps.LatLng(
        parseFloat(position.coords.latitude),
        parseFloat(position.coords.longitude))
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.marker = ''
      this.createMarker(latlng)
      this.addYourLocationButton()
    },
    geolocationSuccessButton: function (position) {
      var latlng = new window.google.maps.LatLng(
        parseFloat(position.coords.latitude),
        parseFloat(position.coords.longitude))
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.createMarker(latlng)
    },
    geolocationError: function () {
      alert('Error: Localização não disponível, verifique seu GPS!')
      var latlng = new window.google.maps.LatLng(
        parseFloat(this.center.lat),
        parseFloat(this.center.lng))
      this.createMarker(latlng)
    },
    addYourLocationButton: function () {
      var controlDiv = document.createElement('div')

      var firstChild = document.createElement('button')
      firstChild.style.backgroundColor = '#fff'
      firstChild.style.border = 'none'
      firstChild.style.outline = 'none'
      firstChild.style.width = '28px'
      firstChild.style.height = '28px'
      firstChild.style.borderRadius = '2px'
      firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)'
      firstChild.style.cursor = 'pointer'
      firstChild.style.marginRight = '10px'
      firstChild.style.padding = '0px'
      firstChild.title = 'Your Location'
      controlDiv.appendChild(firstChild)

      var secondChild = document.createElement('div')
      secondChild.style.margin = '5px'
      secondChild.style.width = '18px'
      secondChild.style.height = '18px'
      secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)'
      secondChild.style.backgroundSize = '180px 18px'
      secondChild.style.backgroundPosition = '0px 0px'
      secondChild.style.backgroundRepeat = 'no-repeat'
      secondChild.id = 'you_location_img'
      firstChild.appendChild(secondChild)

      window.google.maps.event.addListener(this.$refs.map.$mapObject, 'center_changed', function () {
        secondChild.style['background-position'] = '0 0'
      })
      var ref = this
      firstChild.addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(ref.geolocationSuccessButton, ref.geolocationError, {maximumAge: 3000, timeout: 2000, enableHighAccuracy: true})
        if (ref.directionsDisplay !== '') {
          ref.directionsDisplay.setMap(null)
        }
      })

      controlDiv.index = 1
      this.$refs.map.$mapObject.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv)
    },
    calculateAndDisplayRoute: function () {
      this.directionsService = new window.google.maps.DirectionsService()
      this.directionsDisplay = new window.google.maps.DirectionsRenderer({
        map: this.$refs.map.$mapObject
      })
      var display = this.directionsDisplay
      var selectedMode = 'WALKING'
      var origem = this.center
      this.directionsService.route({
        origin: {lat: origem.lat, lng: origem.lng},
        destination: {lat: -19.9167915, lng: -43.9387866},
        travelMode: window.google.maps.TravelMode[selectedMode]
      }, function (response, status) {
        if (status === 'OK') {
          display.setDirections(response)
        } else {
          alert('Falha, tente novamente mais tarde!')
        }
      })
    }

  }
}
</script>
<style>
</style>
