/* 
-db.collection('countries').get() - Get all docs frm the 'countries' coll
-When 'db.collection('countries').get()' is executed it returns the 'snapshot' of data in the db
-'snapshot' is the representation of diff kinds of data inside the collection
-snapshot.docs; // will return all documents in the coll
*/

const nationList = document.querySelector("#nation-list");
// Create Function/element and render nation
function renderNation(doc) {
    let li = document.createElement("li");
    let name = document.createElement("span");

    let city = document.createElement("span");
    let cases = document.createElement("span");
    let deaths = document.createElement("span");
    li.setAttribute("data-id", doc.id);
    name.textContent = doc.data().name;
    city.textContent = "Cities Affected: " + doc.data().city[0];
    cases.textContent = "Cases: " + doc.data().cases;
    deaths.textContent = "Deaths: " + doc.data().deaths;
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cases);
    li.appendChild(deaths);
    nationList.appendChild(li);
}

db.collection("countries")
    .get()
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data()); //will return each data in the docs
            renderNation(doc);
        });
    });