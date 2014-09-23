var geocoder;
var map;

function initialize() {
    var myLatLng = new google.maps.LatLng(40.722943, -73.602585);
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        zoom: 14,
        center: myLatLng,
    };

    // Initialize the map object
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // var ECIlocal;

    // // Initialize the location and the size of the polygon by assign coordianations to its four angles
    // var triangleCoords = [
    //   new google.maps.LatLng(40.718, -73.616),
    //   new google.maps.LatLng(40.718, -73.595),
    //   new google.maps.LatLng(40.730, -73.595),
    //   new google.maps.LatLng(40.730, -73.616)
    //  ];

    //  // Set style of the Polygon
    //  ECIlocal = new google.maps.Polygon({
    //  	paths: triangleCoords,
    //  	strokeColor: '#FF0000',
    //  	strokeOpacity: 0.8,
    //  	strokeWeight: 2,
    //  	fillColor: '#FF0000',
    //  	fillOpacity: 0.2
    //  });

    // To add a polygon to map
    // ECIlocal.setMap(map);

    // To remove a polygon from map
    // ECIlocal.setMap(null);

    // setMarkers(map, locations);
}

// $(document).ready(function(){
//   $("#search-button").click(function(){
//     console.log(String($("#searchbox").val()));
//   });
// });

function codeAddress() {
    var address = document.getElementById('street').value + document.getElementById('city').value + document.getElementById('state').value + document.getElementById('country').value + document.getElementById('zipcode').value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("results:");
            console.log(results);
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            var myLatLng = new google.maps.LatLng(results[0].geometry.location);
            showWeather(results[0].geometry.location);

        } else {
            console.log("Error");
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function showWeather(myLatLng) {
    //The following lines are used to show the weather according to the LatLng.
    var apiKey = '66c2a10263565fb85e5abe15fba0b72e';
    // var url = 'https://api.forecast.io/forecast/';

    var latlng = String(myLatLng);
    // console.log(latlng);
    var res = latlng.split(", ");
    var lati = res[0];
    lati = lati.split("(");
    lati = lati[1];

    var longi = res[1];
    longi = longi.split(")");
    longi = longi[0];

    // var data;

    // $.getJSON(url + apiKey + "/" + lati + "," + longi + "?callback=?", function(data) {
    //   //console.log(data);
    //   $('#weather').html('The current temperature is: ' + data.currently.temperature + ' there');
    // });

    $.ajax({
        type: 'GET',
        tryCount: 0,
        retryLimit: 3,
        url: "http://api.forecast.io/forecast/" + apiKey + "/" + lati + "," + longi,
        async: true,
        dataType: 'jsonp',
        success: function(data) {
            console.log("Successfully get data!");
            showWeatherData(data);
        },
        error: function(e) {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                $.ajax(this);
                return;
            }
            console.log("Error!");
            return;
        }
    });
}

function showWeatherData(data) {
    var Timezone = data['timezone'];
    var currentTemperature = data['currently']['temperature'];
    var currentSummary = data['currently']['summary'];
    var currentIcon = data['currently']['icon'];

    $('#weather').html('The Timezone there is: ' + Timezone + '. ' + 'Current temperature there is: ' + currentTemperature + '. ' + 'Current weather summary there is: ' + currentSummary + '.\n' + 'Current weather icon there is: ' + currentIcon + '.\n');

    showWeatherIcon(currentIcon);

    showWeekWeatherForecast(data);

    showForecastList(data);
}

function showWeatherIcon(icon) {

    var skycons = new Skycons({
        "color": "gray"
    });

    if (icon === "partly-cloudy-day") {
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
    }
    if (icon === "clear-day") {
        skycons.add("icon1", Skycons.CLEAR_DAY);
    }
    if (icon === "clear-night") {
        skycons.add("icon1", Skycons.CLEAR_NIGHT);
    }
    if (icon === "partly-cloudy-night") {
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
    }
    if (icon === "cloudy") {
        skycons.add("icon1", Skycons.CLOUDY);
    }
    if (icon === "rain") {
        skycons.add("icon1", Skycons.RAIN);
    }
    if (icon === "sleet") {
        skycons.add("icon1", Skycons.SLEET);
    }
    if (icon === "snow") {
        skycons.add("icon1", Skycons.SNOW);
    }
    if (icon === "wind") {
        skycons.add("icon1", Skycons.WIND);
    }
    if (icon === "fog") {
        skycons.add("icon1", Skycons.FOG);
    }

    skycons.play();

    // skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
}

function showWeekWeatherForecast(data) {
    // console.log("Enter weather forecast function!");
    var summary = data['daily']['summary'];
    var icon = data['daily']['icon'];
    // console.log(summary);
    $('#week-weather-summary').html('Summary of next week is: ' + summary + '.');

    var skycons = new Skycons({
        "color": "gray"
    });

    if (icon === "partly-cloudy-day") {
        skycons.add("icon2", Skycons.PARTLY_CLOUDY_DAY);
    }
    if (icon === "clear-day") {
        skycons.add("icon2", Skycons.CLEAR_DAY);
    }
    if (icon === "clear-night") {
        skycons.add("icon2", Skycons.CLEAR_NIGHT);
    }
    if (icon === "partly-cloudy-night") {
        skycons.add("icon2", Skycons.PARTLY_CLOUDY_NIGHT);
    }
    if (icon === "cloudy") {
        skycons.add("icon2", Skycons.CLOUDY);
    }
    if (icon === "rain") {
        skycons.add("icon2", Skycons.RAIN);
    }
    if (icon === "sleet") {
        skycons.add("icon2", Skycons.SLEET);
    }
    if (icon === "snow") {
        skycons.add("icon2", Skycons.SNOW);
    }
    if (icon === "wind") {
        skycons.add("icon2", Skycons.WIND);
    }
    if (icon === "fog") {
        skycons.add("icon2", Skycons.FOG);
    }

    skycons.play();

}

function showForecastList(data) {
    // var nextWeek = data['daily']['data'];
    for (i = 1; i <= 7; i++) {
        var j = i - 1;

        var date = new Date(data['daily']['data'][j]['time'] * 1000);
        var num = date.getDay();
        showDay(num, i);

        var minTemp = data['daily']['data'][j]['temperatureMin'];
        var maxTemp = data['daily']['data'][j]['temperatureMax'];

        minTemp = parseInt(minTemp, 10);
        maxTemp = parseInt(maxTemp, 10);

        var icon = data['daily']['data'][j]['icon'];

        // console.log(icon);
        $('#temp' + i).html(minTemp + "°F/" + maxTemp + "°F");

        var skycons = new Skycons({
            "color": "gray"
        });
        x = i + 2;
        skycons.add("icon" + x, icon);
        if (icon === "partly-cloudy-day") {
            skycons.add("icon" + x, Skycons.PARTLY_CLOUDY_DAY);
        }
        if (icon === "clear-day") {
            skycons.add("icon" + x, Skycons.CLEAR_DAY);
        }
        if (icon === "clear-night") {
            skycons.add("icon" + x, Skycons.CLEAR_NIGHT);
        }
        if (icon === "partly-cloudy-night") {
            skycons.add("icon" + x, Skycons.PARTLY_CLOUDY_NIGHT);
        }
        if (icon === "cloudy") {
            skycons.add("icon" + x, Skycons.CLOUDY);
        }
        if (icon === "rain") {
            skycons.add("icon" + x, Skycons.RAIN);
        }
        if (icon === "sleet") {
            skycons.add("icon" + x, Skycons.SLEET);
        }
        if (icon === "snow") {
            skycons.add("icon" + x, Skycons.SNOW);
        }
        if (icon === "wind") {
            skycons.add("icon" + x, Skycons.WIND);
        }
        if (icon === "fog") {
            skycons.add("icon" + x, Skycons.FOG);
        }
        skycons.play();
    }

}

function showDay(num, i) {
    if (num == 1) {
        $('#day' + i).html("Monday");
    }
    if (num == 2) {
        $('#day' + i).html("Tuesday");
    }
    if (num == 3) {
        $('#day' + i).html("Wednesday");
    }
    if (num == 4) {
        $('#day' + i).html("Thursday");
    }
    if (num == 5) {
        $('#day' + i).html("Friday");
    }
    if (num == 6) {
        $('#day' + i).html("Saturday");
    }
    if (num == 0) {
        $('#day' + i).html("Sunday");
    }
}
/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */
// var locations = [
//   ['Frequency Electronics Inc', 40.722411, -73.604173,1],
//   ['Colonial Square', 40.720972, -73.600085,2],
//   ['University Field', 40.720638, -73.598101,3],
//   ['Edelman Business Systems', 40.723175, -73.610353,4],
//   ['Yusen Air & Sea Services USA Inc', 40.727102, -73.608239,5]
// ];

// function setMarkers(map, locations) {
//   for (var i = 0; i < locations.length; i++) {
//     var localArea = locations[i];
//     var myLatLng = new google.maps.LatLng(localArea[1], localArea[2]);
//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         draggable:true,
//     });
//     marker.setMap(map);
//   }

//   var myLatLng = new google.maps.LatLng(40.722943, -73.602585);
//   var image = {
//   	url: 'images/blue.png'
//   };
//   var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         icon: image,
//         draggable:true,
//     });

//   	// Add the marker to map
//     marker.setMap(map);

//     // Remove the marker from map
//     //marker.setMap(null);

// }

google.maps.event.addDomListener(window, 'load', initialize);