function toggleInputMode() {
  const unit = document.getElementById('unit').value;
  document.getElementById('ddInputs').style.display = unit === 'dd' ? 'block' : 'none';
  document.getElementById('dmsInputs').style.display = unit === 'dms' ? 'block' : 'none';
}

function dmsToDecimal(deg, min, sec) {
  return parseFloat(deg) + parseFloat(min) / 60 + parseFloat(sec) / 3600;
}

// Function to parse URL parameters
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const TW = Telegram.WebApp;
TW.ready();

TW.MainButton.text = 'Finish';
TW.MainButton.color = '#eb4034';
TW.MainButton.textColor = '#ffffff';

TW.MainButton.show().onClick(function () {
  const unit = document.getElementById('unit').value;
  let latitude, longitude;

  if (unit === 'dd') {
    latitude = parseFloat(document.getElementById('latitude').value);
    longitude = parseFloat(document.getElementById('longitude').value);
  } else {
    latitude = dmsToDecimal(
      document.getElementById('latDeg').value,
      document.getElementById('latMin').value,
      document.getElementById('latSec').value
    );
    longitude = dmsToDecimal(
      document.getElementById('longDeg').value,
      document.getElementById('longMin').value,
      document.getElementById('longSec').value
    );
  }

  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  const data = {
    latitude,
    longitude,
    date,
    time
  };

  const IMGid = getParameterByName('IMGid');
    if (IMGid) {
      data['IMGid'] = IMGid;
    }

  const jsonString = JSON.stringify(data);
  TW.sendData(jsonString);
  TW.close();
});

TW.expand();

