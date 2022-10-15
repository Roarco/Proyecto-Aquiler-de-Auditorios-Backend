const URL = "http://localhost:8080/api/";
const service = new Service();
let action = "create";

(async function () {
    try {
        const data = await service.getall(`${URL}Category/all`);
        const tbody = document.querySelector("tbody");
        data.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${element.name}</td>
        <td>${element.description}</td>
        <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setForm(${element.id})" >
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

async function sendFormCategory() {
    try {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    const data = {
        name: name,
        description: description,
    }

    if (action === "create") {
        await service.create(`${URL}Category/save`, data);
    }
    if (action === "update") {
        await service.update(`${URL}Category/update`, data);
    }
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