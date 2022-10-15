const URL = "http://localhost:8080/api/";
const service = new Service();
let action = "create";

(async function () {
    try {
        //cargamos las categorias en el select
        const categories = await service.getall(`${URL}Category/all`);
        const select = document.getElementById("category");

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.innerHTML = category.name;
            select.appendChild(option);
        });


        const data = await service.getall(`${URL}Audience/all`);
        const tbody = document.querySelector("tbody");
        data.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${element.name}</td>
        <td>${element.owner}</td>
        <td>${element.capacity}</td>
        <td>${element.description}</td>
        <td>${element.category.name}</td>
        <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setFormAudience(${element.id})" >
        Edit
        </button></td>
        <td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="deleteAudience(${element.id})">
        Delete
        </button></td>
        `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
})();

async function deleteAudience(id) {
    try {
        await service.delete(`${URL}Audience/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

//creamos una funcion para setear los datos del formulario
/* async function setFormAudience(id) {
    try {
        const audience = await serviceAudience.getbyid(URL, id);
        const idAudience = document.getElementById("id");
        idAudience.disabled = true;
        const owner = document.getElementById("owner");
        const capacity = document.getElementById("capacity");
        const category_id = document.getElementById("category_id");
        const name = document.getElementById("name");
        idAudience.value = audience[0].id;
        owner.value = audience[0].owner;
        capacity.value = audience[0].capacity;
        category_id.value = audience[0].category_id;
        name.value = audience[0].name;

        action = "update";
    } catch (error) {
        console.log(error);
    }
} */

//creamos una funcion para enviar los datos del formulario
async function sendFormAudience() {
    try {
        const name = document.getElementById("name").value;
        const owner = document.getElementById("owner").value;
        const capacity = document.getElementById("capacity").value;
        const categoryId = document.getElementById("category").value;
        const description = document.getElementById("description").value;

        const audience = {
            name: name,
            owner: owner,
            capacity: capacity,
            category: {
                id: categoryId
            },
            description: description
        };

        if (action === "create") {
            await service.create(`${URL}Audience/save`, audience);
        }
        if (action === "update") {
            await service.update(`${URL}Audience/update`, audience);
        }

        location.reload();
    } catch (error) {
        console.log(error);
    }
}

