<template>
  <div>
     <gmap-map v-if='mostraMapa'
            :center='center'
            :zoom='20'
            map-type-id='terrain'
            style='width:100%;  height: 500px;'
            ref="map"
            :options='{disableDefaultUI: true, zoomControl: true}'>
            <gmap-marker
               :position='marker.position'
               @click='center=marker.position'
               ></gmap-marker>
         </gmap-map>
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
      center: { lat: -19.9191248, lng: -43.9386291 }
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
      if (navigator.geolocation) {
        alert('Geolocation is supported!')
      } else {
        alert('Geolocation is not supported for this Browser/OS.')
      }
      navigator.geolocation.getCurrentPosition(position => {
        let latlng = new window.google.maps.LatLng(
          parseFloat(position.coords.latitude),
          parseFloat(position.coords.longitude))
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.createMarker(latlng)
        this.addYourLocationButton()
      })
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
        navigator.geolocation.getCurrentPosition(position => {
          let latlng = new window.google.maps.LatLng(
            parseFloat(position.coords.latitude),
            parseFloat(position.coords.longitude))
          ref.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          ref.createMarker(latlng)
        })
      })

      controlDiv.index = 1
      this.$refs.map.$mapObject.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv)
    }
  }
}
</script>

<style>
.buttonGeolocalization {
  background: #fff;
  border: none;
  outline: none;
  width: 28px;
  height: 28px;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  cursor: pointer;
  margin-right: 10px;
}
</style>
