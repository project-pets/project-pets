var current_lat;
var current_lng;
var locations_lat = [];
var locations_lng = [];

var map;
var markers = [];
var type_selected;
var marker;
var legend;
var legend_created = false;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 57.598493,
            lng: -101.825397,
        },
        zoom: 6
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    var options = {
    types: ['(cities)'],
     componentRestrictions: {country: "canada"}
 };

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(14); // Why 14? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');

            current_lat = marker.position.lat();
            current_lng = marker.position.lng();

        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
    });


    var icons = {
        grooming: {
            name: 'Grooming',
            icon: 'assets/images/g.png'
        },
        vet: {
            name: 'Vet',
            icon: 'assets/images/v.png'
        },
        store: {
            name: 'Pet Store',
            icon: 'assets/images/s.png'
        },
        hospital: {
            name: 'Pet Hospital',
            icon: 'assets/images/h.png'
        }
    };

    // Store pins you want to display as object with a position and type - where type is the object name of the icon

    features = [];

    // for each of the objects in the features list create a marker with the objects position and icon

    features.forEach(function(feature) {
        var newmarker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map

        });

        newmarker.addListener('click', function() {
            console.log("clicked a markr");
            $("#icon-info").text("Info of this marker");
            $("#icon-info").css("font-size", "20px");
        });
        markers.push(newmarker);
    });

if (legend_created === false) {

legend = document.getElementById("legend");
    for (var key in icons) {
        var type = icons[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        legend.appendChild(div);
    }

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

    legend_created = true;

    }

}

// THE CODE BELOW IS COMMENTED OUT BECAUSE IT MAKES THE CODE ABOVE MOT WORK
// ALSO PLEASE REMEMBER THE GOOGLE MAPS CODE HAS TO BE OUTSIDE OF THE DOCUMENT.READY OR ELSE IT DOESNT WORK

$(document).ready(function() {

  function redoMap () {

   map.setCenter({

  lat: current_lat,
  lng: current_lng

  })

   map.setZoom(13);

   var card = document.getElementById('pac-card');
   var input = document.getElementById('pac-input');
   var types = document.getElementById('type-selector');
   var strictBounds = document.getElementById('strict-bounds-selector');

   map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

   var autocomplete = new google.maps.places.Autocomplete(input);


// Bind the map's bounds (viewport) property to the autocomplete object,
 // so that the autocomplete requests use the current map bounds for the
 // bounds option in the request

autocomplete.bindTo('bounds', map);


var infowindow = new google.maps.InfoWindow();
var infowindowContent = document.getElementById('infowindow-content');
infowindow.setContent(infowindowContent);
var marker = new google.maps.Marker({
map: map,
anchorPoint: new google.maps.Point(0, -29)
});


autocomplete.addListener('place_changed', function() {
 infowindow.close();
 marker.setVisible(false);
         var place = autocomplete.getPlace();
       if (!place.geometry) {
             // User entered the name of a Place that was not suggested and
             // pressed the Enter key, or the Place Details request failed.
             window.alert("No details available for input: '" + place.name + "'");
             return;
         }

         // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
         } else {
             map.setCenter(place.geometry.location);
             map.setZoom(14); // Why 14? Because it looks good.
         }
         marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
             address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                 (place.address_components[1] && place.address_components[1].short_name || ''),
                 (place.address_components[2] && place.address_components[2].short_name || '')
             ].join(' ');
         }

         infowindowContent.children['place-icon'].src = place.icon;
         infowindowContent.children['place-name'].textContent = place.name;
         infowindowContent.children['place-address'].textContent = address;
         infowindow.open(map, marker);
     });

     var icons = {
         pet_grooming: {
             name: 'Grooming',
             icon: 'assets/images/g.png'
         },
         veterinarian: {
             name: 'Vet',
             icon: 'assets/images/v.png'
         },
         pet_store: {
             name: 'Pet Store',
             icon: 'assets/images/s.png'
         },
         pet_hospital: {
             name: 'Pet Hospital',
             icon: 'assets/images/h.png'
         }
     };

     var features = [{
        position: new google.maps.LatLng(locations_lat[0], locations_lng[0]),
        type: type_selected
        },{
        position: new google.maps.LatLng(locations_lat[1], locations_lng[1]),
        type: type_selected
        }, {
        position: new google.maps.LatLng(locations_lat[2], locations_lng[2]),
        type: type_selected
        },{
        position: new google.maps.LatLng(locations_lat[3], locations_lng[3]),
        type: type_selected
        },{
        position: new google.maps.LatLng(locations_lat[4], locations_lng[4]),
        type: type_selected
        }];

        features.forEach(function(feature) {
        var newmarker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map

        });

        newmarker.addListener('click', function() {
            // console.log("clicked a markr");
            var bizName = $('#busName');
            // console.log(bizName);
            var bizAddress = $('#busAddress');
            var bizPhone = $('#busPhone');
            var bizWebsite = $('#busWebsite');
            var bizNameDisplay = bizName[0].innerHTML;
            var bizAddressDisplay = bizAddress[0].innerHTML;
            var bizPhoneDisplay = bizPhone[0].innerHTML;
            var bizWebsiteDisplay = bizWebsite[0].innerHTML;
            console.log(bizWebsite);
            $("#icon-info").text(bizNameDisplay);
            $("#icon-info").append("<br>" + "Address: " + bizAddressDisplay);
            $("#icon-info").append("<br>" + "Phone: " + bizPhoneDisplay);
            // $("#icon-info").append("<br>" + "Website " + bizWebsiteDisplay);
            $("#icon-info").css("font-size", "15px");
        });

        markers.push(newmarker);

    });
 };
// end of redo map


  var config = {
    apiKey: "AIzaSyBDtNjucWDga7GKDVepB2m7n_JxXP31ASo",
    authDomain: "hacker-tails.firebaseapp.com",
    databaseURL: "https://hacker-tails.firebaseio.com",
    projectId: "hacker-tails",
    storageBucket: "hacker-tails.appspot.com",
    messagingSenderId: "519408053795"
  };
    firebase.initializeApp(config);
    // setting variables
    var database = firebase.database();

  // this retrieves business data
  function getBizData() {
    $("#displayAPI").empty();

    var search = $("#selection-input").val();
    var location = $("#pac-input").val();
    var distance = $("#distance-input").val();
    var yellow = "http://api.sandbox.yellowapi.com/FindBusiness/?"
      + "what=" + encodeURIComponent(search)
      + "&where=" + encodeURIComponent(location)
      + "&dist=" + distance
      + "&fmt=JSON&pgLen=5&UID=127.0.0.1"
      + "&apikey=8v2eyjyx79f4m3zcctsyqmxd";

    requestCrossDomain(yellow, displayData);
  };

  // This section is exclusively for the YQL proxy to run our http api calls over https (to make Github Pages happy).
  function requestCrossDomain( yellow, callback ) {

    // If no url was passed, exit.
    if (!yellow) {
        alert('No site was passed.');
        return false;
    };

    // Take the provided url, and add it to a YQL query. Make sure you encode it!
    var yql = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from json where url="' + yellow + '"') + '&format=json&';

    // Request that YSQL string, and run a callback function.
    // Pass a defined function to prevent cache-busting.
    $.getJSON(yql, cbFunc);

    function cbFunc(data) {
      // If we have something to work with...
        if (data.query) {
          // If the user passed a callback, and it
          // is a function, call it, and send through the data var.
          if (typeof callback === 'function') {
              console.log("madeIt");
              callback(data.query.results.json);
          }
        }
        // Else, Maybe we requested a site that doesn't exist, and nothing returned.
        else throw new Error('Nothing returned from getJSON.');
      };
  };

  function displayData(response) {

    // console.log("setVisible");
    marker.setVisible(false);

    locations_lat = [];
    locations_lng = [];
     for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

    var dataSize = response.listings.length
    // console.log(dataSize );
    for (var i = 0; i < 5; i++) {
      getGiphy();
      var name = response.listings[i].name;
      var address = response.listings[i].address.street
        + response.listings[i].address.city
        + response.listings[i].address.pcode
        + response.listings[i].address.prov;
      var resultUrl = response.listings[i].merchantUrl;
      var phone = response.listings[i].phone.dispNum;
      var geoCode = response.listings[i].geoCode.latitude
        + response.listings[i].geoCode.longitude;

      var geoCode_lat = response.listings[i].geoCode.latitude
      var geoCode_lng = response.listings[i].geoCode.longitude;
          locations_lat.push(geoCode_lat);
          locations_lng.push(geoCode_lng);
      var result = $("<p>")
        .html("<u id='busName'>" + name + "</u>" + "<br>" + "<strong>" + "Address: " + "</strong>" + "<u id='busAddress'>" + address + "</u>" + "<br>" + "<strong>" + "Phone: " + "</strong>" + "<u id='busPhone'>" + phone + "</u>" + "<br>" + "<strong>" + "<a href=" + "<u id='busWebsite'" + resultUrl +"</u>" + ">" + "Website" + "</a>")
        .appendTo($("#displayAPI"));
      };
      redoMap();
  };

  var animal = ['pug', 'cat', 'bunny', 'hamster', 'bird', 'turtle', 'dog', 'horse'];
  function shuffleAnimal(animal) {
    var j = animal.length - 1;
    var k = Math.floor(Math.random() * (j + 1));
    return animal[k];
  }

  function getGiphy() {
    $("#displayGif").empty();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + shuffleAnimal(animal) + "&limit=100&api_key=dc6zaTOxFJmzC";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
      $('#displayGifs').prepend(JSON.stringify(response));
      var selectionDiv = $('<div id="selectionData">');
      var i = Math.floor(Math.random() * 100);
      var gif = response.data[i].images.fixed_height.url;
      var displayGiffy = $('<img>')
          .attr('src', gif)
          .addClass('gifImage');
      selectionDiv.append(displayGiffy);
      $('#displayGif').prepend(selectionDiv);
    })
  }

  function alertModal(input) {
    $('[data-modal-option]').hide();
    $('.modal-' + input).show();

    $('#myModal').show();

    $('#myModal .close').on('click', function() {
      $('#myModal').hide();
    })
  };

  $('#submit-Info').on('click', function(event) {
    event.preventDefault();

    var inputSelection = $('#selection-input').val();
    type_selected = $('#selection-input').val().replace(" ", "_");
    var inputAddress = $('#pac-input').val();
    var inputAnimal = $('#animal-select').val();
    if (!inputSelection || !inputAddress || !inputAnimal) {
      alertModal('all-inputs');
      return false;
    };

    var inputDistance = $('#distance-input').val();
    var numberRegex = /^\d+$/;
    if (!numberRegex.test(inputDistance)) {
      alertModal('number-inputs');
      return false;
    }
    getBizData();
    adoptPet();
    // clears form fields after hitting submit, selection is reset to 'void' status
    $('#selection-input').val('');
    $('#pac-input').val('');
    $('#distance-input').val('');
    $('#animal-select').val('');
  });

  function adoptPet() {
    var animal = $('#animal-select').val();
    $.getJSON('http://api.petfinder.com/pet.find?format=json&animal='+animal+'&location=94112&key=1606f36e9c6ff9a9664c529cba6adff6&callback=?', function(result) {
      // console.log(result.petfinder.pets.pet[0].media.photos.photo[3]);
      var pet = result.petfinder.pets.pet;
      for (var i = 0; i < pet.length; i++) {
        // $('#pet-view').prepend(JSON.stringify(result));
        // console.log(pet[0]);
        var petDiv = document.createElement('div');
        petDiv.id = "carousel-image";
        // petDiv.className += "item";
        petDiv.className = "item item" + i;
        var adoptable = pet[i].media.photos.photo[3];
        var petImg =  $('<img>')
        .attr('src', adoptable.$t)
        .addClass('img-carousel')
        .addClass('center-block');
        $(petDiv).append(petImg);
        $('.carousel-inner').append(petDiv);
      }
    });
  }

});
