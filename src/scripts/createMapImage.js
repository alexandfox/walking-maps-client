var paths = "&path=color:0xff0000ff|weight:5";
var geocoder = new window.google.maps.Geocoder();
var imageURL = "https://maps.googleapis.com/maps/api/staticmap?size=800x700&key=AIzaSyBAFajUxQ7Ltv5t9nfiaYTXvhnWbTV80bk&markers=color:red";

// gets an array of places as a prop
// returns a URL to static image

function createMapImage(places) {
  getPlaceIDs(places).then((placeIDs) => {
    console.log(placeIDs)
    updateURL(placeIDs).then(urls => {
      imageURL += paths;
      console.log("imageURL: ", imageURL)
      return imageURL
    })
  })
}

function getPlaceIDs(places) {
  var placeIDs = [];

  return new Promise((res, rej) => {
    places.forEach((place, index, array) => {
      var placeId = place.place_id
      placeIDs.push(placeId)
      if (index == array.length - 1) res(placeIDs)
    })
  })
}

function updateURL(placeIDs) {
  return new Promise((resolve, reject) => {
    function recurs(index) {
      geocodePlaceID(geocoder, placeIDs[index]).then(res => {
        console.log("turn number", index)
        index++;
        if (index < placeIDs.length) recurs(index);
        else {console.log("yay"); return resolve()}
      })
    }
    recurs(0)
  })
}

function geocodePlaceID(geocoder, placeID) {
  return new Promise((resolve, reject) => {
    geocoder.geocode({ 'placeId': placeID }, function (results, status) {
      if (status === 'OK') {
        var lat = results[0].geometry.location.lat()
        var lng = results[0].geometry.location.lng()
        var latlng = `|${lat}, ${lng}`
        imageURL += latlng
        paths += latlng
        resolve();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })
  })
}

export default createMapImage