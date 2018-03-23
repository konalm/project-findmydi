import store from '../store'

export default function(coverages) {
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
};
