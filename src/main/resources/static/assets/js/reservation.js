const btn = document.getElementById("btn");
const URL = "http://localhost:8080/api/";
const service = new Service();
let action = "create";
let idReservation = 0;

(async function () {

    try {
        document.getElementById("intpStatus").style.display = "none";

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
        <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setReservation(${element.idReservation})" >
        Edit
        </button></td>
        <td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="deleteReservation(${element.idReservation})">
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
        await service.create(`${URL}Reservation/save`, Reservation);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function deleteReservation(id) {
    try {
        await service.delete(`${URL}Reservation/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function setReservation(id) {
    try {
        const reservation = await service.getbyId(`${URL}Reservation/`, id);
        document.getElementById("startDate").value = reservation.startDate.split("T")[0];
        document.getElementById("devolutionDate").value = reservation.devolutionDate.split("T")[0];
        document.getElementById("intpStatus").style.display = "block";
        document.getElementById("client").style.display = "none";
        document.getElementById("audien").style.display = "none";
        document.getElementById("labelClient").style.display = "none";
        document.getElementById("labelAudience").style.display = "none";
        action = "update";
        idReservation = id;
    }catch (error) {
        console.log(error);
    }
}

async function updateReservation(id) {
    try {
        const startDate = document.getElementById("startDate").value;
        const devolutionDate = document.getElementById("devolutionDate").value;
        const status = document.getElementById("status").value;

        const Reservation = {
            idReservation: id,
            startDate: startDate,
            devolutionDate: devolutionDate,
            status: status
        }
        await service.update(`${URL}Reservation/update`, Reservation);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

btn.addEventListener("click", function () {
    if (action === "create") {
        sendFormReservation();
    }
    if (action === "update") {
        updateReservation(idReservation);
    }
});