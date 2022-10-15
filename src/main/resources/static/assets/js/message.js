const URL = "http://localhost:8080/api/";
const service = new Service();
let action = "create";

(async function () {
    try{
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

        const data = await service.getall(`${URL}Message/all`);
        const tbody = document.querySelector("tbody");
        data.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${element.messageText}</td>
            <td>${element.client.name}</td>
            <td>${element.audience.name}</td>
            <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setFormMessage(${element.idMessage})" >
            Edit
            </button></td>
            <td> <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="deleteMessage(${element.idMessage})">
            Delete
            </button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
})();

async function deleteMessage(id) {
    try {
        await service.delete(`${URL}Message/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

/* async function setFormMessage(id) {
    try {
        const messageData = await service.getbyid(URL, id);
        const idMessage = document.getElementById("id");
        idMessage.disabled = true;
        const message = document.getElementById("messagetext");
        idMessage.value = messageData[0].id;
        message.value = messageData[0].messagetext;
        action = "update";
    } catch (error) {
        console.log(error);
    }
} */

async function sendFormMessage() {
    try {
        const message = document.getElementById("message").value;
        const clientData = document.getElementById("client").value;
        const audienceData = document.getElementById("audien").value;

        const messageData = {
            messageText: message,
            client: {
                idClient: parseInt(clientData)
            },
            audience: {
                id: parseInt(audienceData)
            }
        };
        if (action == "create") {
            await service.create(`${URL}Message/save`, messageData);
        } else {
            await service.update(`${URL}Message/update`, messageData);
        }
        location.reload();
    } catch (error) {
        console.log(error);
    }
}