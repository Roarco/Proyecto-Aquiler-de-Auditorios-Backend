const URL =
    "https://g809461e5a992bc-pudgjcmoed3aisa4.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/";
const serviceClient = new ServiceClient();
let action = "create";

(async function () {
    try {
        const data = await serviceClient.getall(URL);
        const tbody = document.querySelector("tbody");
        data.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <th scope="row">${element.id}</th>
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

async function deleteClient(id) {
    try {
        const response = await serviceClient.delete(URL, id);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function setFormClient(id) {
    try {
        const client = await serviceClient.getbyid(URL, id);
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
}

async function sendFormClient() {
    try {
        const idClient = document.getElementById("id");
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const age = document.getElementById("age");
        const client = {
            id: parseInt(idClient.value),
            name: name.value,
            email: email.value,
            age: parseInt(age.value),
        };
        if (action == "create") {
            const response = await serviceClient.create(URL, client);
        } else {
            const response = await serviceClient.update(URL, client);
        }
        location.reload();
    } catch (error) {
        console.log(error);
    }
}