function initMap() {
    const input = document.getElementById("search")
    var autocomplete = new google.maps.places.Autocomplete(input)
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        console.log(place.geometry.location.lat())
        document.getElementById('location').value = place.formatted_address
        document.getElementById('lat').value = place.geometry.location.lat()
        document.getElementById('lng').value = place.geometry.location.lng()
        const searchLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }
        localStorage.clear()
        localStorage.setItem('location', JSON.stringify(searchLocation))
    })
}
