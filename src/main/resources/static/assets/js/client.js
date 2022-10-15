const btn = document.getElementById("btn");
const URL = "http://localhost:8080/api/";
const service = new Service();
let action = "create";
let idClient = 0;

(async function () {
    try {
        const data = await service.getall(`${URL}Client/all`);
        const tbody = document.querySelector("tbody");
        data.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td>${element.age}</td>
            <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setFormClient(${element.idClient})" >
            Edit
            </button></td>
            <td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="deleteClient(${element.idClient})">
            Delete
            </button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
})();

async function deleteClient(id) {
    try {
        await service.delete(`${URL}Client/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function setFormClient(id) {
    try {
        const client = await service.getbyId(`${URL}Client/`, id);
        document.getElementById("name").value = client.name;
        document.getElementById("email").style.display = "none";
        document.getElementById("labelEmail").style.display = "none";
        document.getElementById("password").value = client.password;
        document.getElementById("age").value = client.age;
        action = "update";
        idClient = id;
    } catch (error) {
        console.log(error);
    }
}

async function sendFormClient() {
    try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const age = document.getElementById("age").value;
        const client = {
            name: name,
            email: email,
            password: password,
            age: parseInt(age),
        };
        await service.create(`${URL}Client/save`, client);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function updateClient(id) {
    try {
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const password = document.getElementById("password").value;

        const client = {
            idClient: id,
            name: name,
            age: parseInt(age),
            password: password,
        };
        await service.update(`${URL}Client/update`, client);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

btn.addEventListener("click", function () {
    if (action === "create") {
        sendFormClient();
    }
    if (action === "update") {
        updateClient(idClient);
    }
});