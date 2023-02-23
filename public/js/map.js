const trElements = [...document.querySelectorAll(".restroom")]
const restroomsIDs = trElements.map(element => element.getAttribute("data-id"))
const originCoords = JSON.parse(localStorage.getItem('location'))
const icons = {
  destination: '/images/marker2.png',
  location: '/images/location.png',
}

let myMap

const restroomCoordsPromises = restroomsIDs.map(restroom =>
  axios.get(`/api/restrooms/${restroom}`)
)


Promise.all(restroomCoordsPromises)
  .then((data) => {
    data.forEach(({ data }) => {
      const { name } = data
      const { coordinates } = data.location
      setMarkers({ name, coordinates })
    })
    return data
  })
  .then(data => getRouteDetails(data))
  .catch(err => console.error(err))


function initMap() {
  myMap = new google.maps.Map(
    document.querySelector('#map'),
    {
      zoom: 15,
      center: originCoords,
      styles: mapStyles.retro
    }
  )
}




function infoMarker(info) {

  const [lng, lat] = info.coordinates

  const infoWindow = new google.maps.InfoWindow({
    maxWidth: 350,
    pixelOffset: new google.maps.Size(0, -70)
  });
  return function (e) {
    const content = '<div>' +
      '<b>Restroom: ' + info.name + '</b>' +
      '</div>';
    infoWindow.setContent(content);
    infoWindow.open(myMap);
    infoWindow.setPosition(new google.maps.LatLng(lat, lng));
  }
};




function setMarkers(markerInfo) {
  const [lng, lat] = markerInfo.coordinates
  const infoWindow = infoMarker(markerInfo)
  const marker = new google.maps.Marker({
    map: myMap,
    position: { lng, lat },
    title: markerInfo.name,
    icon: icons.destination
  })
  google.maps.event.addListener(marker, 'click', infoWindow);

}


function getRouteDetails(destination) {
  if (destination.length === 1) {
    const [firstRestroom] = destination
    const [lng, lat] = firstRestroom.data.location.coordinates
    const routeDetails = {
      origin: originCoords,
      destination: { lng, lat },
      travelMode: 'WALKING',

    }
    const service = new google.maps.DirectionsService()
    service.route(
      routeDetails,
      routeResult => {
        renderRoute(routeResult)
      }
    )
  }
}


function renderRoute(routeDetails) {
  const renderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
  new google.maps.Marker({ icon: icons.location, map: myMap, position: originCoords })
  renderer.setDirections(routeDetails)
  renderer.setMap(myMap)

}