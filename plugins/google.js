import * as VueGoogleMaps from 'vue2-google-maps'

export default ({ Vue }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCNoEI-XAWRchTzQcedMslY8vOAmfOCCIU',
      libraries: 'places'
    }
  })
}
