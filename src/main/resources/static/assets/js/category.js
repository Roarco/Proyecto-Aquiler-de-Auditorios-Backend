const btn = document.getElementById("btn");
const URL = "http://localhost:8080/api/";
const service = new Service();
let action = "create";
let idCategory = 0;

(async function () {
    try {
        const data = await service.getall(`${URL}Category/all`);
        const tbody = document.querySelector("tbody");
        data.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${element.name}</td>
        <td>${element.description}</td>
        <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setFormCategory(${element.id})" >
        Edit
        </button></td>
        <td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="deleteCategory(${element.id})">
        Delete
        </button></td>
        `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
}());

async function saveFormCategory() {
    try {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    const data = {
        name: name,
        description: description,
    }
    await service.create(`${URL}Category/save`, data);
    location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function deleteCategory(id) {
    try {
        await service.delete(`${URL}Category/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function setFormCategory(id) {
    try {
        const category = await service.getbyId(`${URL}Category/`, id);
        document.getElementById("name").value = category.name;
        document.getElementById("description").value = category.description;
        action = "update";
        idCategory = category.id;
    }catch (error) {
        console.log(error);
    }
}

async function updateCategory(id) {
    try {
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;

        const data = {
            id: id,
            name: name,
            description: description,
        }

        await service.update(`${URL}Category/update`, data);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}


btn.addEventListener("click", function () {
    if (action === "create") {
        saveFormCategory();
    }
    if (action === "update") {
        updateCategory(idCategory);
    }
});