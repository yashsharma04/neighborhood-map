	      $('.ui.search.dropdown').dropdown();  

      function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 8,
          mapTypeId: 'roadmap'
        });

        $('#reset').click(function()
        	{
        		map.setZoom(8);
        	});
        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);



        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        // marking places everytime 
        geocoder = new google.maps.Geocoder();
			// var address = document.getElementById('address').value;

			function toggleBounce() 
			{
			  // alert('hello');
			  if (marker.getAnimation() !== null) 
			  {
			    marker.setAnimation(null);
			  }
			  else 
			  {
			    marker.setAnimation(google.maps.Animation.BOUNCE);
			  }
			}
			var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
		 	var address = 'atlanta';
		    geocoder.geocode( { 'address': address}, function(results, status) {
		      if (status == 'OK') {
		        map.setCenter(results[0].geometry.location);
		        marker = new google.maps.Marker({
		            map: map,
		            draggable :true ,
		            animation: google.maps.Animation.DROP,
		            position: results[0].geometry.location
		        });

		        marker.addListener('mouseover', toggleBounce);
				marker.addListener('click', function() {
		          infowindow.open(map, marker);
		        });

		      } else {
		        alert('Geocode was not successful for the following reason: ' + status);
		      }
		    });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }
     function change()
	      {
	        var e = document.getElementById("addr");
	      	var strUser = e.options[e.selectedIndex].text;

	        if (strUser=='Search'){
	             //do nothing 
	        }     
	        else{
	            // alert(strUser);
	            document.getElementById('pac-input').value = strUser;
	            // $('#pac-input').trigger("keypress", [13]); 
	            // alert('hello');
	            var e = jQuery.Event("keypress", { keyCode: 13 }); // you can specify your desired key code 
     			$('#pac-input').trigger(e);

	        }  
	      }
 