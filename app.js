/* 
-db.collection('countries').get() - Get all docs frm the 'countries' coll
-When 'db.collection('countries').get()' is executed it returns the 'snapshot' of data in the db
-'snapshot' is the representation of diff kinds of data inside the collection
-snapshot.docs; // will return all documents in the coll
*/

const nationList = document.querySelector("#nation-list");
const form = document.querySelector("#add-covid-nations");
// Create Function/element and render nation
function renderNation(doc) {
    let li = document.createElement("li");
    let name = document.createElement("span");

    let city = document.createElement("span");
    let cases = document.createElement("span");
    let deaths = document.createElement("span");
    let cross = document.createElement("div");
    li.setAttribute("data-id", doc.id);
    name.textContent = doc.data().name;
    city.textContent = "Cities Affected: " + doc.data().city[0];
    cases.textContent = "Cases: " + doc.data().cases;
    deaths.textContent = "Deaths: " + doc.data().deaths;
    cross.textContent = "x";
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cases);
    li.appendChild(deaths);
    li.appendChild(cross);
    nationList.appendChild(li);
    // Deleting Data
    cross.addEventListener("click", e => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("countries")
            .doc(id)
            .delete();
    });
}

// Getting Data
db.collection("countries")
    .get()
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data()); //will return each data in the docs
            renderNation(doc);
        });
    });

// Post/Add/Saving Data to Db

form.addEventListener("submit", e => {
    e.preventDefault();
    db.collection("countries").add({
        name: form.name.value,
        city: form.city.value,
        cases: form.cases.value,
        deaths: form.death.value
    });
    form.name.value = "";
    form.city.value = "";
    form.cases.value = "";
    form.death.value = "";
});

// JAVASCRIPT ANIMATIONS
anime
    .timeline({
        loop: true
    })
    .add({
        targets: ".ml8 .circle-white",
        scale: [0, 3],
        opacity: [1, 0],
        easing: "easeInOutExpo",
        rotateZ: 360,
        duration: 1100
    })
    .add({
        targets: ".ml8 .circle-container",
        scale: [0, 1],
        duration: 1100,
        easing: "easeInOutExpo",
        offset: "-=1000"
    })
    .add({
        targets: ".ml8 .circle-dark",
        scale: [0, 1],
        duration: 1100,
        easing: "easeOutExpo",
        offset: "-=600"
    })
    .add({
        targets: ".ml8 .letters-left",
        scale: [0, 1],
        duration: 1200,
        offset: "-=550"
    })
    .add({
        targets: ".ml8 .bang",
        scale: [0, 1],
        rotateZ: [45, 15],
        duration: 1200,
        offset: "-=1000"
    })
    .add({
        targets: ".ml8",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1400
    });
anime({
    targets: ".ml8 .circle-dark-dashed",
    rotateZ: 360,
    duration: 8000,
    easing: "linear",
    loop: true
});