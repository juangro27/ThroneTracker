const trElements = [...document.querySelectorAll(".restroomID")]
const restroomsIDs = trElements.map(element => element.getAttribute("data-id"))
console.log(restroomsIDs)
