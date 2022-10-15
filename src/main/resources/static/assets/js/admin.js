const btn = document.getElementById("btn");
const URL = "http://localhost:8080/api/";
const service = new Service();
let action = "create";
let idAdmin = 0;


(async function () {
    try {
        const data = await service.getall(`${URL}Admin/all`);
        const tbody = document.querySelector("tbody");
        data.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${element.name}</td>
            <td>${element.email}</td>
            <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setFormAdmin(${element.id})" >
            Edit
            </button></td>
            <td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="deleteAdmin(${element.id})">
            Delete
            </button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
})();

async function sendFormAdmin() {
    try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const admin = {
            name: name,
            email: email,
            password: password
        };
        await service.create(`${URL}Admin/save`, admin);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function deleteAdmin(id) {
    try {
        await service.delete(`${URL}Admin/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function setFormAdmin(id) {
    try {
        const admin = await service.getbyId(`${URL}Admin/`, id);
        document.getElementById("name").value = admin.name;
        document.getElementById("email").style.display = "none";
        document.getElementById("labelEmail").style.display = "none";
        document.getElementById("password").value = admin.password;
        action = "update";
        idAdmin = id;
    } catch (error) {
        console.log(error);
    }
}

async function updateAdmin(id) {
    try {
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;

        const admin = {
            id: id,
            name: name,
            password: password
        };
        await service.update(`${URL}Admin/update`, admin);
        location.reload();
    }catch (error) {
            console.log(error);
        }
    }


btn.addEventListener("click", function () {
        if (action === "create") {
            sendFormAdmin();
        }
        if (action === "update") {
            updateAdmin(idAdmin);
        }
    });