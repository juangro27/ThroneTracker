const trElements = [...document.querySelectorAll(".restroom")]
const restroomsIDs = trElements.map(element => element.getAttribute("data-id"))
const originCoords = JSON.parse(localStorage.getItem('location'))
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
    }
  )
}
function setMarkers(markerInfo) {
  const [lng, lat] = markerInfo.coordinates
  new google.maps.Marker({
    map: myMap,
    position: { lng, lat },
    title: markerInfo.name
  })
}
function getRouteDetails(destination) {
  if (destination.length === 1) {
    const [firstRestroom] = destination
    const [lng, lat] = firstRestroom.data.location.coordinates
    const routeDetails = {
      origin: originCoords,
      destination: { lng, lat },
      travelMode: 'WALKING'
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
  const renderer = new google.maps.DirectionsRenderer()
  renderer.setDirections(routeDetails)
  renderer.setMap(myMap)
}