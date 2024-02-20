//create the earthquake visualization 
//create the map object 
var myMap = L.map("map", {
    center: [37.7128, -95.60],
    zoom: 5
  });

//add a title layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//
//Obtain GeoJSON data from USGS website selecting all earthquakes within the last 7 days 
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"; 

//Add earthquake data retrieved and add onto the map 
// Getting our GeoJSON data

//creating a feature for earthquake for magnitude by size
function chooseSize(mag) {  
    if (mag > 1.0) return mag;
    else if (mag > 2.0) return (mag * 2);
    else if (mag > 3.0) return (mag * 3);
    else return (mag * 4);
  }

//creating a feature for earthquake for depth by color
function chooseColor(magType) { //could not find depth as a feature within the dataset so opting to display magtype instead 
    if (magType == "ml") return "yellow";
    else if (magType == "mb") return "red";
    else if (magType == "md") return "orange";
    else return "black";
  };

//adding features to map with functions 
d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      style: function(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            color: "black",
            radius: chooseSize(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
      }
    }).addTo(myMap);
  });