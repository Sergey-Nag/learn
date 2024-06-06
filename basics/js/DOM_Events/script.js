console.log(document.getElementById('elem'))

document.addEventListener('DOMContentLoaded', load)
// elem.addEventListener('click', {
//     handleEvent(event) {
//       alert(event.type + " на " + event.currentTarget);
//     }
//   });
function load() {
    console.log(this)
}