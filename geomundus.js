
/*getting checked radio box*/
prgAll = document.getElementById("radio1");
ongAll = document.getElementById("radio5");
prgAll.checked = true;
ongAll.checked = true;

/*close about page*/
$(document).ready(function(){
  $("#about-linked").on('click', function() {
    var display =  $("#about").css("display");
        if(display="none")
        {
            $("#about").attr("style", "display:block");
        }
  });

  $("#about-close").on('click', function() {
            $("#about").attr("style", "display:none");
  });

  $("#about-map-button").on('click', function() {
            $("#about").attr("style", "display:none");
  });

  $("#banner").show();
   /*splash page fade in/out*/

  $.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (
      ($(window).height() - $(this).outerHeight()) / 2) +
      $(window).scrollTop()) + "px"
    );
    this.css("left", Math.max(0, (
      ($(window).width() - $(this).outerWidth()) / 2) +
      $(window).scrollLeft()) + "px"
    );
    return this;

  }
  setTimeout(function(){
    $("#banner").fadeOut();
  }, 1500);

  setTimeout(function(){
    $("#ema_title").fadeIn();
  }, 1500);
});

// creating animateMarker function 
var framesPerSecond = 15;
var initialOpacity = 0.5
var opacity = initialOpacity;
var initialRadius = 3;
var radius = initialRadius;
var maxRadius = 18;

function animateMarker() {

  setTimeout(function(){
      requestAnimationFrame(animateMarker);

      radius += (maxRadius - radius) / framesPerSecond;
      opacity -= ( .9 / framesPerSecond );

      if (opacity <= 0) {
          radius = initialRadius;
          opacity = initialOpacity;
      }
        map.setPaintProperty('point_animation', 'circle-radius', radius);
        map.setPaintProperty('point_animation', 'circle-opacity', opacity);

  }, 1000 / framesPerSecond);

}

// functions for styles
function deprecated(str) {
      if (str === 1 ) {
        return ""
      } else {
          return "Discontinued";
      }
    }

function hideNulls(str) {
  if (str === "null" || str === "") {
      return ""
  } else {
      return str;
  }
}

function colored(str){
  if (str === "NEW"){

    return "#FFFF00";

    } else {
    return "#fa8072";
  }
}

//function to sort approved years and student's intakes
function selYear(code,selCol){
  let list = [];
  let uniqueArray;
  for (year of json.features){
    if (year.properties.code===code){
      let val = (year.properties[selCol]===null) ? "Not yet" : year.properties[selCol];
      list.push("&nbsp;"+val)
    }
  }
  uniqueArray = list.filter(function(item, pos) {
      return list.indexOf(item) == pos;
  });
  return uniqueArray.sort(function(a, b){return a-b});
}

//string function
function normalize(string) {
    return string.trim().toLowerCase();
}

/*Because features come from tiled vector data, feature geometries may be split
or duplicated across tile boundaries and, as a result, features may appear
multiple times in query results.*/
function getUniqueFeatures(array, comparatorProperty) {
    var existingFeatureKeys = {};
    var uniqueFeatures = array.filter(function(el) {
        if (existingFeatureKeys[el.properties[comparatorProperty]]) {
            return false;
        } else {
            existingFeatureKeys[el.properties[comparatorProperty]] = true;
            return true;
        }
    });
    return uniqueFeatures;
}
//adding map
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvbXVuZHVzIiwiYSI6ImNqM3BoMDVlYjAwam8zMnBmNm1ndWs3bnYifQ.McVUJig2reapiExh7EPOpw';
var map = new mapboxgl.Map({
    container: 'map',
    style:'mapbox://styles/geomundus/cj4b2b6pk43hm2rmpu7q9kil3',
    // style:'mapbox://styles/geomundus/cj3w5i7500prz2sodhhtd2z1p',
    center: [15.2551, 50.5260],
    zoom: 3.0,
    maxZoom: 9,
    minZoom: 1,
});

function addDataLayer(){
  var zoomThreshold = 4;
  map.addSource("states", {
      "type": "geojson",
      "data": 'https://geomundus.github.io/countryNEW.geojson'
  });

  map.addLayer({
      "id": "state-fills",
      "type": "fill",
      "source": "states",
      "layout": {
        "visibility": "visible",
      },
      "paint": {
          "fill-color": "#627BC1",
          "fill-opacity": 0.0
      }
  });

  map.addLayer({
      "id": "state-border-hover",
      "type": "line",
      "source": "states",
      "layout": {},
      "paint": {
          "line-color": "#627BC1",
          "line-opacity": 0.5,
          "line-width": 3
      }
  });

  map.addSource('uni', {
      "type": 'geojson',
      "data": 'https://geomundus.github.io/bycourses.geojson'
  });

  map.addLayer({
    "id": "uni",
    "type": "symbol",
    "source": "uni",
    "layout":{
      "visibility": "visible",
      "icon-image": "marker-15_blackwhite",
      "icon-offset": [0, -7.5],
      "icon-allow-overlap": true,
      "icon-size": 0.8
    },
    "filter": ["all",["==","ongoing2015_2017",1],["==", "cat", "EMJMD"]]
  });

  map.addLayer({
    "id": "uni_select",
    "type": "symbol",
    "source": "uni",
    "layout":{
      "visibility": "none",
      "icon-image": "marker_red",
      "icon-offset": [0, -7.5],
      "icon-allow-overlap": true
    }
  });

  map.addLayer({
    "id": "point_animation",
    "type": "circle",
    "source": "uni",
    "layout":{
      "visibility": "none"
    },
    "paint": {
        "circle-radius": initialRadius,
        "circle-radius-transition": {duration: 0},
        "circle-opacity-transition": {duration: 0},
        "circle-color": "#283048"
    }
  });

  map.addLayer({
    "id": "uni_icon",
    "type": "symbol",
    "source": "uni",
    "layout":{
      "visibility": "none",
      "icon-image": "marker_red",
      "icon-offset": [0, -7.5],
      "icon-allow-overlap": true,
      "icon-size": 1.4,
      "text-size": 15,
      // "text-font": "Open Sans Semibold",
      // "text-jusify": "left",
      "text-anchor": "bottom",
      // "text-transform": none,
      "text-offset": [0,-2],//horisontal,vertical
      // "text-color": "rgba(255, 255, 0, 1)"
      // "text-opacity": .9,
      // "text-halo-blur": 10
      "text-allow-overlap": true// disable labeling out layers
    },
    "paint":{
      "text-color": "red",
      "text-halo-color": "white",
      "text-halo-width": 1
    }
  });

}


map.on('style.load', function (e) {
   addDataLayer();
});

/*loading program geojson*/
var json = (function () {
   var json = null;
   $.ajax({
       'async': false,
       'global': false,
       'url': "https://geomundus.github.io/bycourses.geojson",
       'dataType': "json",
       'success': function (data) {
           json = data;
       }
   });
        return json;
})();

/*getting acronym and title only from program geojson*/
var acro_title = json.features.reduce(function(acro_title,item){
  acro_title[item.properties.code]=item.properties.title;
  return acro_title;
},{});


/* cnt function: provide city, categories, ongoing status and unique selection year to get sum 
we loop though each option provided in array and follow if statements */
function countProgramsPerCity(city, cat, ongoing){
    let cnt = 0;
    let program_list=[];
    for (i of cat){
      for (j of ongoing){
        json.features.forEach(function(feature){
          let prop = feature.properties;
          let ong = (prop.ongoing2015_2017===null) ? 0 : 1;
        if ((prop.cat=== i && prop.city===city) && j===ong){
          if (program_list.indexOf(prop.code)===-1){
              program_list.push(prop.code);
              cnt+=1;
        }
      }
    });
    }
  }
  return cnt;
}

 /*Create a popup, but don't add it to the map yet.*/
var popup = new mapboxgl.Popup({
    offset: [0, -10],
    closeButton: false,
    closeOnClick: true,
    anchor: 'top-left'
});
var filterEl = document.getElementById('feature-filter');
var listingEl = document.getElementById('feature-listing');


function renderListings(features) {
/*Clear any existing listings*/
    listingEl.innerHTML = '';
    var city = document.getElementById('city');
    var program = document.getElementById('program');
    
    if (features.length && program.className === 'mode-selected' ) {
        features.forEach(function(feature) {
            var prop = feature.properties;
            var xmin = prop.xmin-1;
            var ymin = prop.ymin-1;
            var xmax = prop.xmax+1;
            var ymax = prop.ymax+1;
            var role = prop.role
            var item = document.createElement('a');
            var status = prop.status.trim()
            var ongoing = prop.ongoing2015_2017;
     
/*Content of the listing*/

            item.target = '_blank';
            item.innerHTML = '<div style ="display:inline;">   ' + prop.code + ' </div>' 
            + "  " + '<div style ="display:inline; margin-left: 5px; opacity: 0.6; color:' +  colored(status) + ';"><i>' + hideNulls(status) + '</i></div>' 
            + '<div style ="display:inline; margin-left: 5px; opacity: 0.6; color: #ff6666"><i>' + deprecated(ongoing) + '</i></div>';

/*Program mode - on click zoom to extent with fitBounds*/
            item.addEventListener('click', function(){
/*close title for better visibility*/
              $("#ema_title").hide();
/*Zoom to extent*/
              map.fitBounds([[xmin,ymin], [xmax, ymax]]);              
              var codeFilter =  prop.code
/*filter uni_select red markers by program acronym*/
              map.setFilter("uni_icon", ["==", "code", codeFilter]);
              map.setFilter("point_animation", ["==", "code", codeFilter]);
              map.setLayoutProperty('point_animation', 'visibility', 'visible');
/*make uni_select visible and adding label*/
              map.setLayoutProperty('uni_icon', 'visibility', 'visible');
              map.setLayoutProperty('uni_icon','text-field',"{role}");
/*hide uni layer*/
              map.setLayoutProperty('uni', 'visibility', 'none');
/*fill title block with program acronym*/
              interest = document.getElementById("interest");
              document.getElementById("myspan").textContent= prop.code;
              document.getElementById("program_title").style.display = "inline-block";

              $("#interest").fadeIn("slow");
              $("#interest").children().not('#interest-close').remove();
              $("#interest-close").appendTo("#interest");
              $('<div style ="font-size:25px;  margin-left:10px; margin-right: 10px; margin-top: 25px">' + prop.title + '</div>' +
              '<div style ="font-size:20px; margin-left:10px; margin-top: 25px;"><a href="' + prop.website  + '" target="_blank">Program details</a>'+ '</div>'
              +'<table style ="font-size:20px; margin-left:10px; margin-top: 50px;"><tr><td>Program approved:&nbsp; </td><td>' + selYear(prop.code, "sel_year") + '</td></tr>'
              +'<tr><td>Student`s intake:&nbsp; </td><td>'+ selYear(prop.code, "year_of_i_intake") +'</td></tr></table></div>').appendTo("#interest");
            });

            item.addEventListener('mouseover', function() {
              var codeFilter =  prop.code
              map.setFilter("uni_select", ["==", "code", codeFilter]);
 /*make selected programs visible*/
              map.setLayoutProperty('uni_select', 'visibility', 'visible');
 /*Highlight corresponding features on the map*/
              setTimeout(function() {
                item.style.color = 'rgba(250, 250, 250, 0.8)';
                item.textContent = prop.title;
                item.style.fontWeight = 600;
                item.style.borderRadius = 5 + 'px';
              }, 10);

            });
          item.addEventListener('mouseout', function() {
              map.setLayoutProperty('uni_select', 'visibility', 'none');
              setTimeout(function() {
                item.innerHTML = '<div style ="display:inline;">' + prop.code + '</div>'+ 
                                '<div style ="display:inline; margin-left: 5px; opacity: 0.6; color:' +  colored(status) + ';"><i>' + hideNulls(status) + '</i></div>'+
                                '<div style ="display:inline; margin-left: 5px; opacity: 0.6; color:#ff6666"><i>' + deprecated(ongoing) + '</i></div>';
                item.style.fontWeight = 400;
                item.style.color = 'rgba(255, 255, 255, 0.9)';
                item.style.borderRadius = 0 + 'px';
              }, 50);
          });
          listingEl.appendChild(item);

      });
/*Show the filter input*/
    filterEl.parentNode.style.display = 'block';
    } else if (features.length && city.className === 'mode-selected' ) {
// we want to know wich options are selected in order to obtain count for programs per cities
        programChecked = $('input[name=program]:checked').val(); 
        statusChecked = $('input[name=status]:checked').val();
        programChecked = (programChecked==="All") ? ["EMJD","EMJMD"] : (programChecked==="EMJMD") ? ["EMJMD"] : ["EMJD"];
        statusChecked = (statusChecked === "All") ? [1,0] : (statusChecked === "1") ? [1] : [0];
//City mode - populating the list
        features.forEach(function(feature) {
            var prop = feature.properties;
            var lat = prop.lat;
            var lon =  prop.lon;
            var city =  prop.city;
            var cat =  prop.cat;
            var ongoing = prop.ongoing2015_2017;
            // console.log(city, cat, ongoing);
            var item = document.createElement('a');
            item.target = '_blank';
            item.innerHTML = '<div style ="display:inline;">' + city + '</div>' +
                              '<div style ="display:inline; margin-left: 5px; color: #5094e1;"><b>' + countProgramsPerCity(city, programChecked, statusChecked) + '</b></div>';

//City mode - with mouse over the listings of the city show with red marker point on the map
            item.addEventListener('mouseover', function(){
              map.setFilter("uni_select",["==","city",city]);
              map.setLayoutProperty("uni_select",'visibility','visible');
            });
/*City mode - on click zoom fly to city and show red marker*/
            item.addEventListener('click', function(){
              map.flyTo({
                center: [lon, lat],
                zoom: 7
              });
              map.setFilter("point_animation", ["==", "city", city]);
              map.setLayoutProperty('point_animation','visibility','visible');
              map.setFilter("uni_icon",["==","city",city]);
              map.setLayoutProperty("uni_icon",'visibility','visible');
              map.setLayoutProperty('uni_icon','text-field',"");

            });
/* City mode - adding city into listing that are in the map view */
            item.addEventListener('mouseout', function() {
            map.setLayoutProperty("uni_select", 'visibility', 'none');
});
            
/*City mode - populate listings after mouseover, click or mouseout were met*/
listingEl.appendChild(item);

}); 
        
/*Show the filter input*/
        filterEl.parentNode.style.display = 'block';

    } else {

        var empty = document.createElement('p');
        var bb = document.getElementById("program_title")
        var city = document.getElementById('city');
        var program = document.getElementById('program');
        var country = document.getElementById('country');
        if (city.className === 'mode-selected'){
          console.log('citymode')
        } else {

        document.getElementById('dropbtn').textContent = 'Degree'
        document.getElementById('ongoing').textContent = 'Status'
        }

        var variable1 = '<p><div>' + 'Drag map to populate list!' + '</div></p>';

        empty.innerHTML = variable1
        empty.style.color = "rgba(245, 245, 245, 0.9)";
        empty.style.textAlign = "center";
        empty.id="appended-p";
        empty.textAlign = "center";
        empty.style.fontSize = 125 + "%";
        listingEl.appendChild(empty);

/*Hide the filter input*/
        filterEl.parentNode.style.display = 'none';

  }
}


// /*Start marker  animation.*/
animateMarker();

/*Create hover effect with countries*/
map.on('load', function () {
  map.on("mousemove", function(e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
      if (features.length) {
          map.setFilter("state-border-hover", ["==", "admin", features[0].properties.admin]);
      } else {
          map.setFilter("state-border-hover", ["==", "admin", ""]);
      }
  });

/*Reset the state-fills-hover layer's filter when the mouse leaves the map*/
  map.on("mouseout", function() {
      map.setFilter("state-border-hover", ["==", "admin", ""]);
  });

/*Zoom to country extent*/
  map.on("click", function(e) {
       var features = map.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
       if (features[0]){
          var xmin = features[0].properties.xmin;
          var ymin = features[0].properties.ymin;
          var xmax = features[0].properties.xmax;
          var ymax = features[0].properties.ymax;
          map.fitBounds([[ xmin, ymin], [xmax, ymax]]);
     }
  });

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
program.className = 'mode-selected';
var city = document.getElementById('city');
city.className = 'mode';

function switchLayer(layer) {
    var layerId = layer.target.id;
    var color_layer = document.getElementById('changeLayer');
    var color_menu = document.getElementById('menu');
    var program = document.getElementById('program');
  if (layerId === "dark"){
/*file path*/
    map.setStyle('mapbox://styles/geomundus/cj4k9343e2zk92rmi9cq8kzoh');
    color_layer.style.backgroundColor = `rgba(240, 240, 240, 1)`;
    color_menu.style.backgroundColor = `rgba(240, 240, 240, .7)`;
    color_menu.style.color = 'black';
/*getting checked radio box*/
    prgAll.checked = true;
    ongAll.checked = true;
  } else if (layerId === "bright"){
    color_layer.style.backgroundColor = `rgba(24, 24, 24, 0.0)`;
    color_menu.style.backgroundColor = 'rgba(24, 24, 24, 0.9)';
    color_menu.style.color = '#ccc';
/*file path*/
    map.setStyle('mapbox://styles/geomundus/cj4b2b6pk43hm2rmpu7q9kil3');  
/*getting checked radio box*/
    prgAll.checked = true;
    ongAll.checked = true;
  } else {
    console.log(inputs);
    }
  }


for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

//function that fultfills feature listing
var delayMillis = 100;
function populateListing(column, delayMillis){
  setTimeout(function() {
      var features = map.queryRenderedFeatures({layers:['uni','uni_icon']});
      if (features) {
          var uniqueFeatures = getUniqueFeatures(features, column);
    /*rearranges features in Alphabetical order*/
          function compare(a,b) {
            if (a.properties[column] < b.properties[column])
              return -1;
            if (a.properties[column] > b.properties[column])
              return 1;
            return 0;
          }
          sorted = uniqueFeatures.sort(compare);
    /*Populate features for the listing overlay.*/
          renderListings(sorted);
          programs = sorted
        }
  }, delayMillis);
}

var newFilter;
var statusFilter;
var programFilter;
var statusChecked;
var programChecked;
var ff = document.getElementById('feature-filter');

$('#program, #city, #radio1, #radio2, #radio3, #radio4, #radio5, #radio6, #interest-close').click(function(){
  programChecked = $('input[name=program]:checked').val(); 
  statusChecked = $('input[name=status]:checked').val();

/* the problem we have is with status values - int is not accepted by filter
 that's why we add extra if statement to make appropiate status filter*/

  statusFilter = (statusChecked==="1") ? ["==", 'ongoing2015_2017', 1] : (statusChecked==="0") ? ["!=", 'ongoing2015_2017', 1] : [];
  programFilter = ["==", 'cat', programChecked];

// in this step we want to arrange final filter output having status and program button considered
  
  if (programChecked=== 'All' && statusChecked !== 'All'){
     newFilter = statusFilter;
  }else if (statusChecked==='All' && programChecked !=='All'){
     newFilter = programFilter;
  }else if (programChecked=== 'All' && statusChecked==='All'){
     newFilter = ["!=", 'cat', "select_all"];
  }else{
     newFilter = ["all",programFilter,statusFilter];
  }
  map.setFilter('uni', newFilter);
  map.setLayoutProperty('uni', 'visibility', 'visible');
  map.setLayoutProperty('uni_select', 'visibility', 'none');
  map.setLayoutProperty('uni_icon', 'visibility', 'none');
  map.setLayoutProperty('point_animation', 'visibility', 'none');

});
$('#city').click(function(){
  $("#program").attr('class','mode');
  $("#city").attr('class','mode-selected');
  ff.placeholder = '🔍 Filter results by city name';
  populateListing("city",100);
});
$('#program').click(function(){
  $("#program").attr('class', 'mode-selected');
  $("#city").attr('class','mode');
  ff.placeholder = '🔍 Filter results by program or abbreviation name';
  populateListing("code",100);
});

// on click zoom all extent
document.getElementById('zoom-all').addEventListener('click', function () {
  map.flyTo({
      center:[0, 40],
      zoom: 1.5
    });
});

/*closes left panel*/

$('#interest-close').on('click', function () {
  listingEl.innerHTML = '';
/*show ema title*/
  $("#ema_title").show();
  var ff = document.getElementById('feature-filter');
  map.setLayoutProperty('uni', 'visibility', 'visible');
  map.setLayoutProperty('uni_select', 'visibility', 'none');
  map.setLayoutProperty('uni_icon', 'visibility', 'none');
  map.setLayoutProperty('point_animation', 'visibility', 'none');

  map.flyTo({
    center:[15.2551, 50.5260],
    zoom: 3
  });

  $("#interest").fadeOut("slow");
  $("#program_title").fadeOut("slow")

});

map.on('moveend', function() {
// depending on active status or program button we are filtering accrodingly
     if ($('#program').hasClass('mode-selected')){
        populateListing('code',100);
      } else {
        populateListing('city',100);
      }
 });

filterEl.addEventListener('keyup', function(e) {
     var value = normalize(e.target.value);
/*Filter visible features that don't match the input value.*/
     var filtered = programs.filter(function(feature) {
         var name = normalize(feature.properties.title);
         var code = normalize(feature.properties.code);
         var city = normalize(feature.properties.city);
         return name.indexOf(value) > -1 || code.indexOf(value) > -1 || city.indexOf(value) > -1;
     });

/*Populate the sidebar with filtered results*/
     renderListings(filtered);

/*Set the filter to populate features into the layer.*/
     map.setFilter('uni', ['in', 'code'].concat(filtered.map(function(feature) {
         return feature.properties.code;
     })))
});

/*Call this function on initialization
passing an empty array to render an empty state*/
 renderListings([]);

  map.on('mousemove', function(e) {
      var program = document.getElementById('program');
      var country = document.getElementById('country');
      var city = document.getElementById('city');

  if (program.className === "mode-selected"){
      var features = map.queryRenderedFeatures(e.point, {
          layers: ['uni_icon', 'uni']
      });
     var visibility = map.getLayoutProperty('uni', 'visibility');
/*Change the cursor style as a UI indicator.*/
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';

      if (!features.length) {
          popup.remove();
          return;
      }
      var feature = features[0];
      
/*Populate the popup and set its coordinates
based on the feature found.*/

      if (visibility === "none"){
        popup.setLngLat(feature.geometry.coordinates)
            .setHTML('<div><b>' + feature.properties.title + '</div></b><div><i>' + feature.properties.uni
            +  '</div></b><div>' + feature.properties.city + ', ' + feature.properties.country + '</div><div><a href="' + feature.properties.website + '" target="_blank">website</a></div>')
            .addTo(map);

          } else {
          popup.setLngLat(feature.geometry.coordinates)
              .setHTML('<div><b>' + feature.properties.city  + ', ' + feature.properties.country + '</b></div>')
              .addTo(map);
        }

  } else if (city.className === "mode-selected") {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['uni_icon', 'uni']
    });
/*Change the cursor style as a UI indicator.*/
    map.getCanvas().style.cursor = features.length ? 'pointer' : '';

    if (!features.length) {
        popup.remove();
        return;
    }

    var feature = features[0];

    let html="";
    let status;
    let discontinued;
    html += "<div><strong>";
    html += feature.properties.city;
    html += "</strong></div>";
    let title;
    let listDublicates = [];
    for (feature of features){
        let prop = feature.properties;
// added if statement to avoid program duplicates        
        if (listDublicates.indexOf(prop.code)===-1){ 
        listDublicates.push(prop.code);
        title = acro_title[prop.code];
        status = (prop.status==="NEW") ? "NEW" : " ";
        discontinued = (prop.ongoing2015_2017===1) ? " " : "Discontinued";
        html += "<div class='link'><a href='" + prop.website + "'style='color: rgb(0,255,0)'; target='_blank';><span id = 'crs'>"+ title +"</span>"+
        "<span id ='acr'>" + prop.code + "</span></a>" + 
        '<div style ="display:inline; margin-left: 5px; opacity: 0.9; color: RoyalBlue;"><i><span id ="stat">' + status + '</span></i></div>' + 
        '<div style ="display:inline; margin-left: 5px; opacity: 0.6; color:LightCoral;"><i><span id ="ong">' + discontinued + '</span></i></div></div>';
    }
  }         
/*Populate the popup and set its coordinates based on the feature found.*/
    popup.setLngLat(feature.geometry.coordinates)
          .setHTML(html)
          .addTo(map);
    } else {
      console.log("error bei city or program selection");
      }
  });
});

map.addControl(new mapboxgl.NavigationControl());
