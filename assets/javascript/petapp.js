function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.7749,
            lng: -122.4194
        },
        zoom: 14
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
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

    var features = [{
        position: new google.maps.LatLng(37.7749, -122.4194),
        type: 'store'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4294),
        type: 'store'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4094),
        type: 'store'
    }, {
        position: new google.maps.LatLng(37.7649, -122.4194),
        type: 'hospital'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4157),
        type: 'hospital'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4194),
        type: 'hospital'
    }, {
        position: new google.maps.LatLng(37.7849, -122.4194),
        type: 'vet'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4194),
        type: 'vet'
    }, {
        position: new google.maps.LatLng(37.7749, -122.4250),
        type: 'grooming'
    }];

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

    });
    // This creates the legend

    var legend = document.getElementById("legend");
    for (var key in icons) {
        var type = icons[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        legend.appendChild(div);
    }

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);


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


  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    parking: {
      name: 'Parking',
      icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
      name: 'Library',
      icon: iconBase + 'library_maps.png'
    },
    info: {
      name: 'Info',
      icon: iconBase + 'info-i_maps.png'
    }
  };

  // Store pins you want to display as object with a position and type - where type is the object name of the icon

  var features = [{
      position: new google.maps.LatLng(37.7749, -122.4194),
      type: 'info'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4294),
      type: 'info'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4094),
      type: 'info'
  }, {
      position: new google.maps.LatLng(37.7649, -122.4194),
      type: 'parking'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4157),
      type: 'parking'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4194),
      type: 'parking'
  }, {
      position: new google.maps.LatLng(37.7849, -122.4194),
      type: 'library'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4194),
      type: 'library'
  }, {
      position: new google.maps.LatLng(37.7749, -122.4250),
      type: 'library'
  }];

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

  });
  // This creates the legend

  var legend = document.getElementById("legend");
  for (var key in icons) {
    var type = icons[key];
    var name = type.name;
    var icon = type.icon;
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

}


// THE CODE BELOW IS COMMENTED OUT BECAUSE IT MAKES THE CODE ABOVE MOT WORK
// ALSO PLEASE REMEMBER THE GOOGLE MAPS CODE HAS TO BE OUTSIDE OF THE DOCUMENT.READY OR ELSE IT DOESNT WORK

$(document).ready(function() {
    var config = {
    apiKey: "AIzaSyCQ__vhHShTpCE-GENvH5K9jv8bX4iUdXg",
    authDomain: "marksinsaneasylum.firebaseapp.com",
    databaseURL: "https://marksinsaneasylum.firebaseio.com",
    projectId: "marksinsaneasylum",
    storageBucket: "marksinsaneasylum.appspot.com",
    messagingSenderId: "587854779697"
  }
    firebase.initializeApp(config);
    // setting variables
    var database = firebase.database();

  // this retrieves business data
  function getBizData() {
    var search = $("#selection-input").val();
    var location = $("#pac-input").val();
    var distance = $("#distance-input").val();
    var queryURL = "http://api.sandbox.yellowapi.com/FindBusiness/?"
      + "what=" + search
      + "&where=" + location
      + "&dist=" + distance
      + "&fmt=JSON&pgLen=5&UID=127.0.0.1"
      + "&apikey=8v2eyjyx79f4m3zcctsyqmxd";

    $.ajax({
      type: "GET",
      url: queryURL,
    }).done(function(response) {
      var dataSize = response.listings.length
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
        var result = $("<p>")
          .html(name + "<br>" + "Address: " + address + "<br>" + "Phone: " + phone + "<br>" + "Website: " + resultUrl)
          .appendTo($("#displayAPI"));
      }
    });

  };

  var animal = ['pug', 'cat', 'bunny', 'hamster', 'bird', 'turtle', 'dog'];
  function shuffleAnimal(animal) {
    var j = animal.length - 1;
    var k = Math.floor(Math.random() * (j + 1));
    return animal[k];
  }

  function getGiphy() {
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
  }

  $('#submit-Info').on('click', function(event) {
    event.preventDefault();

    var inputSelection = $('#selection-input').val();
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
      console.log(result.petfinder.pets.pet[0].media.photos.photo[3]);
      var pet = result.petfinder.pets.pet;
      // console.log(pet.length);
      for (var i = 0; pet.length; i++) {
        var adoptable = $(<'img'>);
      }
    });
  }

});
