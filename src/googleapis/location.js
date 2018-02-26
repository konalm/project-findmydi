import gmap from './gmap';
import address from './address';

var location = {
  init: function(coverages) {
    const latitude = 52.4892259301627;
    const longitude = -1.93615833563884;

    gmap(
        coverages,
        function(result) {
            let latitudeInput = document.getElementById('latitude');
            let longitudeInput = document.getElementById('longitude');

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
