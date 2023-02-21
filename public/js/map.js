const centerCoords = { lat: 40.392521370648154, lng: - 3.6989879718518366 }
const trElements = [...document.querySelectorAll(".restroom")]
const restroomsIDs = trElements.map(element => element.getAttribute("data-id"))
let myMap
const restroomCoordsPromises = restroomsIDs.map(restroom =>
  axios
    .get(`/api/restroom/${restroom}`)
)

Promise.all(restroomCoordsPromises)
  .then(restroom => {
    restroom.forEach(restroom => {
      const [lng, lat] = restroom.location.coordinates
      setMarkers(lng, lat)
    })
  })
  .catch(err => console.error(err))

function initMap() {

  myMap = new google.maps.Map(
    document.querySelector('#map'),
    {
      zoom: 15,
      center: centerCoords,
    }
  )
}


function setMarkers(lng, lat) {

  place.forEach(elm => {

    new google.maps.Marker({
      map: myMap,
      position: { lng, lat },
      title: elm.name
    })
  })
}