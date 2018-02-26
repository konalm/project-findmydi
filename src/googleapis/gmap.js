import store from '../store'

export default function(coverages, callback) {
  var geocoder = new google.maps.Geocoder();
  var map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 10});
  map.setCenter(new google.maps.LatLng(coverages[0].latitude, coverages[0].longitude));
    
  /**
   * loop through each coverage >> add marker and radius circle
   */
  coverages.forEach(function (coverage) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(Number(coverage.latitude), Number(coverage.longitude)),
      anchorPoint: new google.maps.Point(0, -29),
      draggable: false
    });

    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,

      center: {
        lat: Number(coverage.latitude), 
        lng: Number(coverage.longitude)
      },

      radius: Number(coverage.range) * 1609.34
    });

    marker.setMap(map);
  });

  
//   google.maps.event.addListener(marker, 'dragend', function (evt) {
//       let latlng = {lat: evt.latLng.lat(), lng: evt.latLng.lng()};

//       let addrComponents = {
//           street_number: 'short_name',
//           route: 'long_name',
//           establishment: 'long_name',
//           locality: 'long_name',
//           administrative_area_level_1: 'short_name',
//           country: 'short_name',
//           postal_code: 'short_name'
//       };

//       let result = {
//           address: {},
//           latitude: 0,
//           longitude: 0
//       };

//       geocoder.geocode({'location': latlng}, function(results, status) {
//           if (status === google.maps.GeocoderStatus.OK) {
//               if (results[0]) {

//                   var i; var type = null;
//                   for (i = 0; i < results[0].address_components.length; i++) {
//                       type = results[0].address_components[i].types[0];
//                       if (addrComponents[type]) {
//                           result.address[type] = results[0].address_components[i][addrComponents[type]];
//                       }
//                   }
//                   result.latitude = latlng.lat;
//                   result.longitude = latlng.lng;
//                   if(typeof callback == "function"){
//                       callback(result);
//                   }

//               } else {
//                   window.alert('No results found');
//               }
//           } else {
//               window.alert('Geocoder failed due to: ' + status);
//           }
//       });
//   });
};
