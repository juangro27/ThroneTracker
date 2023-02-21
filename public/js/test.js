const trElements = [...document.querySelectorAll(".restroom")]
const restroomsIDs = trElements.map(element => element.getAttribute("data-id"))
console.log(restroomsIDs)
