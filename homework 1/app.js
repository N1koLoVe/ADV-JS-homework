console.log("Works");

const API_URL = "https://swapi.dev/api/planets/?page=1";
const API_URL2 = "https://swapi.dev/api/planets/?page=2";

const btn = document.querySelector(".show-btn");

function firstTable() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => renderPlanets(mainEl, data));
}

function secondTable() {
  fetch(API_URL2)
    .then((res) => res.json())
    .then((data) => renderPlanets(mainEl, data));
}

const mainEl = document.querySelector("main");

const renderPlanets = (mainEl, planetData) => {
  let tableContnt = ``;
  const newBtn = document.createElement("button");
  mainEl.innerHTML = "";
  mainEl.innerHTML = `
  <table border="1" class="table">
        <tr>
        <th>Planet Names</th>
        <th>Population</th>
        <th>Climate</th>
        <th>Gravity</th>
        </tr>
      </table>`;

  for (let planet of planetData.results) {
    tableContnt += `
    <tr>
    <td>${planet.name}</td>
    <td>${planet.population}</td>
    <td>${planet.climate}</td>
    <td>${planet.gravity}</td>
    </tr>`;
  }
  document.querySelector(".table").innerHTML += tableContnt;
  mainEl.appendChild(newBtn);
  mainEl.appendChild(btn);
  newBtn.innerHTML = "Next";
  btn.innerHTML = "Previous";
  newBtn.addEventListener("click", secondTable);
};

btn.addEventListener("click", firstTable);
