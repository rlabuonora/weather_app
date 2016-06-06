
if ("geolocation" in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  });
} else {
  /* geolocation IS NOT available */
  console.log("Geolocation not available");
}

var api_key = "0a750722b1a62da8c5effe08c765e2cd";
var lat = -34.8;
var lon = -56.15;
var api_url = "http://api.openweathermap.org/data/2.5/weather";
var url = api_url + "?lat="+ lat + "&lon=" + lon +"&APPID="  + api_key;

$.ajax({
  url: url,
  dataType: "json",
  cache: false,
  success: function(data) {
    console.log("Success! " + url);
    console.log(data);
  }.bind(this),
  error: function(xhr, status, err) {
    console.log(err.toString());
  }.bind(this)
});

var weather = data["weather"][0]["main"];
var icon = data["weather"][0]["icon"];
var temp = data["main"]["temp"];
var city = data["name"];
var data["sys"]["country"]
