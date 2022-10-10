const URL = "http://localhost:8080/api/";
const service = new Service();
let action = "create";

(async function () {

    try {
        const clients = await service.getall(`${URL}Client/all`);
        const selectClient = document.getElementById("client");

        const audiences = await service.getall(`${URL}Audience/all`);
        const selectAudience = document.getElementById("audien");

        clients.forEach(client => {
            const option = document.createElement("option");
            option.value = client.idClient;
            option.innerHTML = client.name;
            selectClient.appendChild(option);
        });

        audiences.forEach(audience => {
            const option = document.createElement("option");
            option.value = audience.id;
            option.innerHTML = audience.name;
            selectAudience.appendChild(option);
        });

        const data = await service.getall(`${URL}Reservation/all`);
        const tbody = document.querySelector("tbody");
        data.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${element.audience.name}</td>
        <td>${element.client.name}</td>
        <td>${element.startDate}</td>
        <td>${element.devolutionDate}</td>
        <td>${element.status}</td>
        <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setFormMessage(${element.id})" >
        Edit
        </button></td>
        <td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="deleteMessage(${element.id})">
        Delete
        </button></td>
        `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
})();

async function sendFormReservation() {
    try {
        const startDate = document.getElementById("startDate").value;
        const devolutionDate = document.getElementById("devolutionDate").value;
        const client = document.getElementById("client").value;
        const audience = document.getElementById("audien").value;

        const Reservation = {
            startDate: startDate,
            devolutionDate: devolutionDate,
            client: { idClient: client },
            audience: { id: audience }
        }

        if (action === "create") {
            await service.create(`${URL}Reservation/save`, Reservation);
        }
        if (action === "update") {
            await service.update(`${URL}Reservation/save`, Reservation);
        }
        location.reload();
    } catch (error) {
        console.log(error);
    }
}