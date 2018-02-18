import store from '../store'

export default function(lat, lng, callback) {
  var geocoder = new google.maps.Geocoder(),
    marker = new google.maps.Marker({
    position: new google.maps.LatLng(store.getters.googleapisLocation.lat,  store.getters.googleapisLocation.long),
    anchorPoint: new google.maps.Point(0, -29),
    draggable: true }),
    map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 10});

  var cityCircle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,

    center: {
        lat: store.getters.googleapisLocation.lat , 
        lng: store.getters.googleapisLocation.long
    },

    radius: store.getters.googleapisRadius
  });
  
  console.log('START MAP');

  map.setCenter(marker.position);
  marker.setMap(map);

  google.maps.event.addListener(marker, 'dragend', function (evt) {
      let latlng = {lat: evt.latLng.lat(), lng: evt.latLng.lng()};

      let addrComponents = {
          street_number: 'short_name',
          route: 'long_name',
          establishment: 'long_name',
          locality: 'long_name',
          administrative_area_level_1: 'short_name',
          country: 'short_name',
          postal_code: 'short_name'
      };

      let result = {
          address: {},
          latitude: 0,
          longitude: 0
      };

      geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
              if (results[0]) {

                  var i; var type = null;
                  for (i = 0; i < results[0].address_components.length; i++) {
                      type = results[0].address_components[i].types[0];
                      if (addrComponents[type]) {
                          result.address[type] = results[0].address_components[i][addrComponents[type]];
                      }
                  }
                  result.latitude = latlng.lat;
                  result.longitude = latlng.lng;
                  if(typeof callback == "function"){
                      callback(result);
                  }

              } else {
                  window.alert('No results found');
              }
          } else {
              window.alert('Geocoder failed due to: ' + status);
          }
      });
  });
};
