var WeatherWidget = React.createClass({
    render: function() {
	return (
	  <div class="widget">
            <h1>Weather Widget</h1>
	    <div className="col-xs-4 col-xs-offset-4 text-center">
	      <p><h2>Montevideo, UY</h2></p>
	      <p>Clouds, 292.353º F</p>
	      <p><img src="http://openweathermap.org/img/w/10d.png" class="" alt="" /></p>
	      <button className="btn btn-primary">Convert to Celsius</button>
 	    </div>
          </div>
	);
    }
    

});


ReactDOM.render(
  <WeatherWidget 
    api_url="http://api.openweathermap.org/data/2.5/weather"
    api_key="0a750722b1a62da8c5effe08c765e2cd"
    img_url="http://openweathermap.org/img/w/"
  />,
  document.getElementById('react-container')
);
