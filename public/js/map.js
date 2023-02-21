const trElements = [...document.querySelectorAll(".restroom")]
const restroomsIDs = trElements.map(element => element.getAttribute("data-id"))

const centerCoords = JSON.parse(localStorage.getItem('location'))

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

function setMarkers(markerInfo) {

  const [lng, lat] = markerInfo.coordinates
  new google.maps.Marker({
    map: myMap,
    position: { lng, lat },
    title: markerInfo.name
  })
}