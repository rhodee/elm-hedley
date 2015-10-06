"use strict";function selectMarker(e,a){e.on("click",function(e){elmApp.ports.selectEvent.send(a)})}function addMap(){var e=L.map("map").setView([50,50],3);return L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ",{maxZoom:10,id:"mapbox.streets"}).addTo(e),e}var elmApp=Elm.fullscreen(Elm.Main,{selectEvent:null});elmApp.ports.selectEvent.send(null);var mapEl=void 0,markersEl={},defaultIcon=L.icon({iconRetinaUrl:"default@2x.6d6bb654.png",iconSize:[35,46]}),selectedIcon=L.icon({iconRetinaUrl:"selected@2x.c4402371.png",iconSize:[35,46]});elmApp.ports.mapManager.subscribe(function(e){setTimeout(function(){if(!e.leaflet.showMap&&mapEl)return mapEl.remove(),mapEl=void 0,void(markersEl={});mapEl=mapEl||addMap();var a=e.events;e.leaflet.markers.forEach(function(l){var r=l.id;markersEl[r]?markersEl[r].setLatLng([l.lat,l.lng]):(markersEl[r]=L.marker([l.lat,l.lng]).addTo(mapEl),selectMarker(markersEl[r],r)),markersEl[r].setIcon(e.leaflet.selectedMarker&&e.leaflet.selectedMarker===r?selectedIcon:defaultIcon);var t=a.indexOf(r);a.splice(t,1)}),a.forEach(function(e){markersEl[e]&&(mapEl.removeLayer(markersEl[e]),markersEl[e]=void 0)})},50)});