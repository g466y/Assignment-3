var map = L.map('map').setView([40.71,-73.93], 11);

// get CartoDB tiles 
var CartoDBTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
  attribution: 'Map Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors, Map Tiles &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

// add tiles to map
map.addLayer(CartoDBTiles);

//add geojson
//L.geoJson(bins).addTo(map);

//marker type? circlemarker to style points by data, changed color depending on another datapoint
//dot could change for borough and sitetype
var binsPointToLayer = function (feature, latlng){
	var binsMarker = L.circle(latlng, 100, {
		stroke: false,
		fillColor: '#2ca25f',
		fillOpacity: 1
	});
	
	return binsMarker;	
}

var binsClick = function (feature, layer) {
	layer.bindPopup("<strong>Borough: </strong>" + feature.properties.Borough);
}

var binsStyle = function (feature){
    var type = feature.properties.Site_type;

    console.log(feature.properties.Site_type)

    var fillColor = null;
    
    if(type === "Outdoor"){
        fillColor = "#a6611a";
    }
    if(type === "Greenthumb"){
        fillColor = "#dfc27d";
    }
    if(type === "Indoor"){
        fillColor = "#80cdc1";
    }
    if(type === "Subproperty"){
        fillColor = "#018571";
    }


    var style = {
        weight: 1,
        opacity: .1,
        color: 'white',
        fillOpacity: 0.75,
        fillColor: fillColor
    }

    return style;
}

var binsGeoJSON = L.geoJson(bins, {
    pointToLayer: binsPointToLayer,
    onEachFeature: binsClick,
    style: binsStyle
}).addTo(map);











