var WeatherIcon = React.createClass({
    render: function() {
	var image;
	if (this.props.ready) {
	    image = <img src={this.props.image_url + this.props.icon + ".png"} />;
        } else {
	    image = <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        };
	return (
          <p>{image}</p>
	);
    }
});

var Location = React.createClass({
    render: function() {
	var location = this.props.ready ?
	     this.props.city + ", "  + this.props.country :
	     "";
	return (
          <h2>{location}</h2>
	);
    }
});

var Weather = React.createClass({
    kelvinToFahrenheit: function(f) {
	var num = f * (9.0/5.0)-459.67;
	return num.toFixed(2);
    },
    kelvinToCelsius: function(k) {
	var num = k-273.15;
	return num.toFixed(2);
    },
    render: function() {
	if (this.props.ready) {
	  var temp = (this.props.units === "F") ? 
		this.kelvinToFahrenheit(this.props.temperature) : 
		this.kelvinToCelsius(this.props.temperature);
	  var message = this.props.weather + ", "  + temp + "º " + this.props.units; 
	} else {
	  var message = "Getting Location...                  ";
        }
	return (
          <p>{message} </p>
	);
    }
});


var ConvertButton = React.createClass({
    onClick: function() {
	this.props.on_click();
    },
    render: function() {
	return (
	      <button 
	        className="btn btn-primary"
	        onClick={this.onClick}
		>
		Convert to { this.props.current_units === "F" ? 
			     "Celsius" :
			     "Fahrenheit" }
	      </button>
	);
    }
});

var WeatherWidget = React.createClass({
    getInitialState: function() {
	return({
	  city: "",
	  country: "",
	  temperature: "",
	  units: "F",
	  icon: "",
	  weather: "",
	  ready: false
	});
    },
    loadDataFromServer: function(url) {
      $.ajax({
	url: url,
	  dataType: "json",
	  cache: false,
	  success: function(data) {
	    this.setState({
              city: data["name"],
	      country: data["sys"]["country"],
	      temperature: data["main"]["temp"],
	      icon: data["weather"][0]["icon"],
	      weather: data["weather"][0]["main"],
	      ready: true
	    });
	  }.bind(this),
	  error: function(xhr, status, err) {
	    console.log(err.toString());
	  }.bind(this)
      });
    },
    componentWillMount: function() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
    	  var lat = position.coords.latitude;
	  var lon = position.coords.longitude;
	  var url = this.props.api_url + "?lat="+ lat + "&lon=" + lon +"&APPID="  + this.props.api_key;
	  this.loadDataFromServer(url);
	}.bind(this));
      } else {
	console.log("Geolocation not available");
      }
    },
    handleUnitChange: function() {
	this.state.units === "F" ?
	    this.setState({ units: "C" }) :
	    this.setState({ units: "F" });
    },
    render: function() {
	return (
	  <div class="widget">
	    <div className="col-md-4 col-md-offset-4 text-center">
	      <Location 
		country={this.state.country} 
		city={this.state.city} 
		ready={this.state.ready}
	      />
	      <Weather 
		temperature={this.state.temperature} 
		units={this.state.units} 
		weather={this.state.weather} 
		ready={this.state.ready}
	      />
	      <WeatherIcon 
		image_url={this.props.image_url} 
		icon={this.state.icon} 
		ready={this.state.ready}
	      />
	      <ConvertButton 
		current_units={this.state.units} 
		on_click={this.handleUnitChange}
		ready={this.state.ready}
	       />
	    </div>
	  </div>
	);
    }
    

});


ReactDOM.render(
  <WeatherWidget 
    api_url="http://api.openweathermap.org/data/2.5/weather"
    api_key="0a750722b1a62da8c5effe08c765e2cd"
    image_url="http://openweathermap.org/img/w/"
  />,
  document.getElementById('react-container')
);
