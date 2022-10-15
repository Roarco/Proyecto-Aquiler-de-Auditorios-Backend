const btn = document.getElementById("btn");
const URL = "http://localhost:8080/api/";
//const URL = "http://193.123.118.88/api/";
const service = new Service();
let action = "create";
let idScore = 0;

(async function () {
    try {
        const reservations = await service.getall(`${URL}Reservation/all`);
        const selectReservation = document.getElementById("reservation");

        reservations.forEach(reservation => {
            const option = document.createElement("option");
            option.value = reservation.idReservation;
            option.innerHTML = reservation.startDate;
            selectReservation.appendChild(option);
        });

        const data = await service.getall(`${URL}Score/all`);
        const tbody = document.querySelector("tbody");
        data.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${element.reservation.audience.name}</td>
        <td>${element.score}</td>
        <td>${element.message}</td>
        <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setFormScore(${element.id})" >
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

async function sendFormScore() {
    try {
        const score = document.getElementById("score").value;
        const message = document.getElementById("message").value;
        const reservation = document.getElementById("reservation").value;

        const Score = {
            score: score,
            message: message,
            reservation: {
                idReservation: reservation
            }
        };
        await service.create(`${URL}Score/save`, Score);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function deleteMessage(id) {
    try {
        await service.delete(`${URL}Score/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function setFormScore(id) {
    try {
        const score = await service.getbyId(`${URL}Score/`, id);
        document.getElementById("score").value = score.score;
        document.getElementById("message").value = score.message;
        document.getElementById("reservation").style.display = "none";
        document.getElementById("labelReservation").style.display = "none";
        action = "update";
        idScore = id;
    } catch (error) {
        console.log(error);
    }
}

async function updateScore(id) {
    try {
        const score = document.getElementById("score").value;
        const message = document.getElementById("message").value;

        const Score = {
            id: id,
            score: score,
            message: message
        };
        await service.update(`${URL}Score/update`, Score);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}


btn.addEventListener("click", function () {
    if (action === "create") {
        sendFormScore();
    } else {
        updateScore(idScore);
    }
}
);