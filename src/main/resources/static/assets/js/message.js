const URL =
    "https://g809461e5a992bc-pudgjcmoed3aisa4.adb.sa-vinhedo-1.oraclecloudapps.com/ords/admin/";
const serviceMessage = new ServiceMessage();
let action = "create";

(async function () {
    try{
        const data = await serviceMessage.getall(URL);
        const tbody = document.querySelector("tbody");
        data.forEach((element) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <th scope="row">${element.id}</th>
            <td>${element.messagetext}</td>
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

async function deleteMessage(id) {
    try {
        const response = await serviceMessage.delete(URL, id);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function setFormMessage(id) {
    try {
        const messageData = await serviceMessage.getbyid(URL, id);
        const idMessage = document.getElementById("id");
        idMessage.disabled = true;
        const message = document.getElementById("messagetext");
        idMessage.value = messageData[0].id;
        message.value = messageData[0].messagetext;
        action = "update";
    } catch (error) {
        console.log(error);
    }
}

async function sendFormMessage() {
    try {
        const idMessage = document.getElementById("id");
        const message = document.getElementById("messagetext");
        const messageData = {
            id: idMessage.value,
            messagetext: message.value,
        };
        if (action == "create") {
            const response = await serviceMessage.create(URL, messageData);
        } else {
            const response = await serviceMessage.update(URL, messageData);
        }
        location.reload();
    } catch (error) {
        console.log(error);
    }
}