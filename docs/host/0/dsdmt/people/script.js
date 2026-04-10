const select = document.getElementById("personSelect");
const cardContainer = document.getElementById("cardContainer");

let leute = {};


fetch("../src/db/people.json")
.then(res => res.json())
.then(data => {
    leute = data;

    for(let id in leute){
        let option = document.createElement("option");
        option.value = id;
        option.textContent = leute[id].name;
        select.appendChild(option);
    }

    showPerson(Object.keys(leute)[0]);
});


function showPerson(id){
    let person = leute[id];

    cardContainer.innerHTML = `
        <div class="card">
            <img class="mainimg" src="${person.img}">
            <h2>${person.name}</h2>

            ${person.dsc ? `<p>${person.dsc}</p>` : ""}

            <div class="socials">
                ${
                    person.socials.map(s => `
                        <div class="social">
                            <img src="${s.img}" 
                                 onerror="this.replaceWith(document.createTextNode('${s.social}'))">

                            <a href="${s.link}" target="_blank">
                                ${s.name}
                            </a>
                        </div>
                    `).join("")
                }
            </div>
        </div>
    `;
}


select.addEventListener("change", () => {
    showPerson(select.value);
});
