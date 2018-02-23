import gmap from './gmap';
import address from './address';

var location = {

  init: function() {
      console.log('INIT')
      console.log(latitude, longitude)
    const latitude = 52.4892259301627;
    const longitude = -1.93615833563884;

    gmap(
        latitude,
        longitude,
        function(result) {

            let latitudeInput = document.getElementById('latitude');
            let longitudeInput = document.getElementById('longitude');

            console.log('RESULT',result);

            if (result.address) {
                address(result.address);
            }

            latitudeInput.value = result.latitude;
            longitudeInput.value = result.longitude;
        }
    );
  }

};

export default location;
