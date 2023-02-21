const trElements = [...document.querySelectorAll("#restroomID")]
// const trElementsArray = Array.prototype.slice.call(trElements)
const restroomsIDs = trElements.map(element => element.getAttribute("reference"))
console.log(restroomsIDs)
