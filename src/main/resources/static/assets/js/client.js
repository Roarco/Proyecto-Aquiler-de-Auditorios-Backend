const URL = "http://localhost:8080/api/";
const service = new Service();
let action = "create";

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
            <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setFormClient(${element.id})" >
            Edit
            </button></td>
            <td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="deleteClient(${element.id})">
            Delete
            </button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
})();

/* async function deleteClient(id) {
    try {
        const response = await service.delete(URL, id);
        location.reload();
    } catch (error) {
        console.log(error);
    }
} */

/* async function setFormClient(id) {
    try {
        const client = await service.getbyid(URL, id);
        const idClient = document.getElementById("id");
        idClient.disabled = true;
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const age = document.getElementById("age");
        idClient.value = client[0].id;
        name.value = client[0].name;
        email.value = client[0].email;
        age.value = client[0].age;
        action = "update";
    } catch (error) {
        console.log(error);
    }
} */

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
        if (action == "create") {
            await service.create(`${URL}Client/save`, client);
        } else {
            await service.update(`${URL}Client/update`, client);
        }
        location.reload();
    } catch (error) {
        console.log(error);
    }
}