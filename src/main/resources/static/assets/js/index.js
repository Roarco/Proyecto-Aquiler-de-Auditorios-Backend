const btn = document.getElementById("btn");
const URL = "http://localhost:8080/api/";
//const URL = "http://193.123.118.88/api/";
const service = new Service();
let action = "create";
let idCategory = 0;
let idAudience = 0;
let idClient = 0;
let idAdmin = 0;



(async function () {
    try {
        //Category
        const categories = await service.getall(`${URL}Category/all`);
        const rowsCat = document.getElementById("cardsCategori");
        categories.forEach((element) => {
            const col = document.createElement("div");
            col.className = "col col-sm-12 col-md-6 col-lg-4 col-xl-3";
            col.innerHTML = `
            <div class="card mb-2" >
                <div class="card-body">
                    <h5 class="card-title"><strong>${element.name}</strong></h5>
                    <p class="card-text">${element.description}</p>
                    <button type="button" class="btn btn-primary mb-2" onclick="setFormCategory(${element.id})" >Edit</button>
                    <button type="button" class="btn btn-danger mb-2"  onclick="deleteCategory(${element.id})">Delete</button>
                </div>
            </div>
            `;
            rowsCat.appendChild(col);
        });

        //Audience
        const audiences = await service.getall(`${URL}Audience/all`);
        const selectCategory = document.getElementById("categoryAud");

        categories.forEach((element) => {
            const option = document.createElement("option");
            option.value = element.id;
            option.innerHTML = element.name;
            selectCategory.appendChild(option);
        }
        );

        const rowsAud = document.getElementById("cardsAudience");
        audiences.forEach((element) => {
            const col = document.createElement("div");
            col.className = "col col-sm-12 col-md-6 col-lg-4 col-xl-3";
            col.innerHTML = `
        <div class="card mb-2" >
            <img src="../../assets/images/stage-g69ad415f6_1920.webp" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title"><strong>${element.name}</strong></h5>
        <p class="card-text">${element.description}</p>
        </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Owner:</b> ${element.owner}</li>
                <li class="list-group-item"><b>Capacity:</b> ${element.capacity}</li>
                <li class="list-group-item"><b>Reservations:</b> ${element.reservations.length}</li>
                <li class="list-group-item"><b>Messages:</b> ${element.messages.length}</li>
            </ul>
        <div class="card-body">
            <button type="button" class="btn btn-primary mb-2" onclick="setFormAudience(${element.id})" >Edit</button>
            <button type="button" class="btn btn-danger mb-2" onclick="deleteAudience(${element.id})">Delete</button>
        </div>
        </div>
            `;
            rowsAud.appendChild(col);
        });

        //Client
        const clients = await service.getall(`${URL}Client/all`);
        const rowsCli = document.getElementById("cardsClient");
        clients.forEach((element) => {
            const col = document.createElement("div");
            col.className = "col col-sm-12 col-md-6 col-lg-4 col-xl-3 ";
            col.innerHTML = `
            <div class="card" >
            <div class="card-body">
                <h5 class="card-title"><strong>${element.name}</strong></h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Email:</b> ${element.email}</li>
                <li class="list-group-item"><b>Age:</b> ${element.age}</li>
                <li class="list-group-item"><b>Reservations:</b> ${element.reservations.length}</li>
                <li class="list-group-item"><b>Messages:</b> ${element.messages.length}</li>
            </ul>
            <div class="card-body">
                <button type="button" class="btn btn-primary mb-2" onclick="setFormClient(${element.idClient})" >Edit</button>
                <button type="button" class="btn btn-danger mb-2" onclick="deleteClient(${element.idClient})">Delete</button>
                <button type="button" class="btn btn-dark mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="messageClient(${element.idClient})">Message</button>
                <button type="button" class="btn btn-info mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="reservationClient(${element.idClient})">Reservation</button>
            </div>
            </div>
            `;
            rowsCli.appendChild(col);
        });

        //Admin
        const admins = await service.getall(`${URL}Admin/all`);
        const rowsAdm = document.getElementById("cardsAdmin");
        admins.forEach((element) => {
            const col = document.createElement("div");
            col.className = "col col-sm-12 col-md-6 col-lg-4 col-xl-3";
            col.innerHTML = `
            <div class="card mb-2" >
            <div class="card-body">
                <h5 class="card-title"><strong>${element.name}</strong></h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Email:</b> ${element.email}</li>
            </ul>
            <div class="card-body">
                <button type="button" class="btn btn-primary mb-2" onclick="setFormAdmin(${element.id})" >Edit</button>
                <button type="button" class="btn btn-danger mb-2" onclick="deleteAdmin(${element.id})">Delete</button>
            </div>
            </div>
            `;

            rowsAdm.appendChild(col);
        });

        //Reservations
        const reservations = await service.getall(`${URL}Reservation/all`);

        //si hay reservas se agrega una a la barra de navegacion
        if (reservations.length > 0) {
            const reserv = document.getElementById("reserv");
            reserv.classList.remove("d-none");

            const tabReservation = document.getElementById("tab-reservation");
            tabReservation.classList.remove("d-none");

            const cardsReservation = document.getElementById("cardsReservation");
            reservations.forEach((element) => {
                const col = document.createElement("div");
                col.className = "col col-sm-12 col-md-6 col-lg-4 col-xl-3";
                col.innerHTML = `
                <div class="card mb-2" >
                    <div class="card-body">
                        <h5 class="card-title"><strong>Reservation N°: ${element.idReservation}</strong></h5>
                    </div>
                    <ul class="list-group list-group-flush" id="cardRes">
                        <li class="list-group-item"><b>StartDate:</b> ${element.startDate.split("T")[0]}</li>
                        <li class="list-group-item"><b>DevolutionDate:</b> ${element.devolutionDate.split("T")[0]}</li>
                        <li class="list-group-item"><b>Status:</b> ${element.status}</li>
                    </ul>
                    <div class="card-body">
                        <button type="button" class="btn btn-primary mb-2" onclick="setFormReservation(${element.idReservation})" >Edit</button>
                        <button type="button" class="btn btn-danger mb-2" onclick="deleteReservation(${element.idReservation})">Delete</button>
                        <button type="button" class="btn btn-info mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="scoreReservation(${element.idReservation})">Score</button>
                    </div>
                </div>
                `;
                cardsReservation.appendChild(col);
            });

            const cardRes = document.getElementById("cardRes");
            for (let i = 0; i < reservations.length; i++) {
                if (reservations[i].score !== null) {
                    const li = document.createElement("li");
                    li.className = "list-group-item";
                    li.innerHTML = `<b>Score:</b> ${reservations[i].score.score}`;
                    cardRes.appendChild(li);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}());


/* Category */

//delete
async function deleteCategory(id) {
    try {
        await service.delete(`${URL}Category/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

//edit
async function setFormCategory(id) {
    try {
        const category = await service.getbyId(`${URL}Category/`, id);
        document.getElementById("nameCat").value = category.name;
        document.getElementById("descriptionCat").value = category.description;
        action = "update";
        idCategory = category.id;
    } catch (error) {
        console.log(error);
    }
}
async function updateCategory(id) {
    try {
        const name = document.getElementById("nameCat").value;
        const description = document.getElementById("descriptionCat").value;

        const data = {
            id: id,
            name: name,
            description: description,
        }

        await service.update(`${URL}Category/update`, data);
        action = "create";
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

//save

async function saveFormCategory() {
    try {
        const name = document.getElementById("nameCat").value;
        const description = document.getElementById("descriptionCat").value;

        const data = {
            name: name,
            description: description,
        }
        await service.create(`${URL}Category/save`, data);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

/* Audiences */

//delete
async function deleteAudience(id) {
    try {
        await service.delete(`${URL}Audience/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

//edit
async function setFormAudience(id) {
    try {
        const audience = await service.getbyId(`${URL}Audience/`, id);
        document.getElementById("nameAud").value = audience.name;
        document.getElementById("ownerAud").value = audience.owner;
        document.getElementById("capacityAud").value = audience.capacity;
        document.getElementById("descriptionAud").value = audience.description;
        document.getElementById("categoryAud").style.display = "none";
        document.getElementById("labelCategory").style.display = "none";
        action = "update";
        idAudience = audience.id;
    } catch (error) {
        console.log(error);
    }
}
async function updateAudience(id) {
    try {
        const name = document.getElementById("nameAud").value;
        const owner = document.getElementById("ownerAud").value;
        const capacity = document.getElementById("capacityAud").value;
        const description = document.getElementById("descriptionAud").value;

        const audience = {
            id: id,
            name: name,
            owner: owner,
            capacity: capacity,
            description: description
        };

        await service.update(`${URL}Audience/update`, audience);
        action = "create";
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

//save
async function sendFormAudience() {
    try {
        const name = document.getElementById("nameAud").value;
        const owner = document.getElementById("ownerAud").value;
        const capacity = document.getElementById("capacityAud").value;
        const categoryId = document.getElementById("categoryAud").value;
        const description = document.getElementById("descriptionAud").value;

        const audience = {
            name: name,
            owner: owner,
            capacity: capacity,
            category: {
                id: categoryId
            },
            description: description
        };

        await service.create(`${URL}Audience/save`, audience);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

/* Client */

//delete
async function deleteClient(id) {
    try {
        await service.delete(`${URL}Client/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

//edit
async function setFormClient(id) {
    try {
        const client = await service.getbyId(`${URL}Client/`, id);
        document.getElementById("nameCl").value = client.name;
        document.getElementById("emailCl").style.display = "none";
        document.getElementById("labelEmail").style.display = "none";
        document.getElementById("passwordCl").value = client.password;
        document.getElementById("ageCl").value = client.age;
        action = "update";
        idClient = id;
    } catch (error) {
        console.log(error);
    }
}
async function updateClient(id) {
    try {
        const name = document.getElementById("nameCl").value;
        const age = document.getElementById("ageCl").value;
        const password = document.getElementById("passwordCl").value;

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

//save
async function sendFormClient() {
    try {
        const name = document.getElementById("nameCl").value;
        const email = document.getElementById("emailCl").value;
        const password = document.getElementById("passwordCl").value;
        const age = document.getElementById("ageCl").value;
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

/* Message */

async function messageClient(id) {
    try {
        const audiences = await service.getall(`${URL}Audience/all`);
        const selectAudience = document.getElementById("recipient-audience");
        audiences.forEach(audience => {
            const option = document.createElement("option");
            option.value = audience.id;
            option.text = audience.name;
            selectAudience.appendChild(option);
        });

        const messageText = document.getElementById("message-text");

        const btnSubmitModal = document.getElementById("btn-submit-modal");
        btnSubmitModal.addEventListener("click", async () => {
            const message = {
                messageText: messageText.value,
                client: {
                    idClient: id
                },
                audience: {
                    id: parseInt(selectAudience.value)
                }
            };
            await service.create(`${URL}Message/save`, message);
            location.reload();
        });
    } catch (error) {
        console.log(error);
    }
};

/* Reservations */

async function reservationClient(id) {
    try {
        const audiences = await service.getall(`${URL}Audience/all`);
        const selectAudience = document.getElementById("recipient-audience");
        audiences.forEach(audience => {
            const option = document.createElement("option");
            option.value = audience.id;
            option.text = audience.name;
            selectAudience.appendChild(option);
        });

        //cambiamos el titulo del modal
        const exampleModalLabel = document.getElementById("exampleModalLabel");
        exampleModalLabel.innerHTML = "Enter Reservation";

        //hacemos visible los campos de la reserve
        const inptreserDate1 = document.getElementById("inpt-reserDate1")
        const inptreserDate2 = document.getElementById("inpt-reserDate2");
        const intpStatus = document.getElementById("intpStatus");
        inptreserDate1.classList.remove("d-none");
        inptreserDate2.classList.remove("d-none");
        intpStatus.classList.remove("d-none");

        //ocultamos los campos de message
        const inptmessage = document.getElementById("inpt-messag");
        inptmessage.classList.add("d-none");


        const btnSubmitModal = document.getElementById("btn-submit-modal");
        btnSubmitModal.addEventListener("click", async () => {
            const startDate = document.getElementById("startDate").value;
            const devolutionDate = document.getElementById("devolutionDate").value;
            const status = document.getElementById("status").value;
            const Reservation = {
                startDate: startDate,
                devolutionDate: devolutionDate,
                client: { idClient: id },
                audience: { id: parseInt(selectAudience.value) },
                status: status
            }
            await service.create(`${URL}Reservation/save`, Reservation);
            location.reload();
        });


    } catch (error) {
        console.log(error);
    }
};

async function deleteReservation(id) {
    try {
        await service.delete(`${URL}Reservation/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

async function setFormReservation(id) {
    try {
        const formReservation = document.getElementById("formReservation");
        formReservation.classList.remove("d-none");

        const reservation = await service.getbyId(`${URL}Reservation/`, id);

        document.getElementById("updateStartDate").value = reservation.startDate.split("T")[0];
        document.getElementById("updateDevolutionDate").value = reservation.devolutionDate.split("T")[0];
        document.getElementById("updateStatus").value = reservation.status;

        const btnUpdateReservation = document.getElementById("btn-update-reservation");
        btnUpdateReservation.addEventListener("click", async () => {
            const startDate = document.getElementById("updateStartDate").value;
            const devolutionDate = document.getElementById("updateDevolutionDate").value;
            const status = document.getElementById("updateStatus").value;

            const reservation = {
                idReservation: id,
                startDate: startDate,
                devolutionDate: devolutionDate,
                status: status
            };
            await service.update(`${URL}Reservation/update`, reservation);
            location.reload();
        });
        ;

    } catch (error) {
        console.log(error);
    }
}



/* Admin */

//delete
async function deleteAdmin(id) {
    try {
        await service.delete(`${URL}Admin/${id}`);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

//edit
async function setFormAdmin(id) {
    try {
        const admin = await service.getbyId(`${URL}Admin/`, id);
        document.getElementById("nameAdm").value = admin.name;
        document.getElementById("emailAdm").style.display = "none";
        document.getElementById("labelEmailAdm").style.display = "none";
        document.getElementById("passwordAdm").value = admin.password;
        action = "update";
        idAdmin = id;
    } catch (error) {
        console.log(error);
    }
}

async function updateAdmin(id) {
    try {
        const name = document.getElementById("nameAdm").value;
        const password = document.getElementById("passwordAdm").value;

        const admin = {
            id: id,
            name: name,
            password: password
        };
        await service.update(`${URL}Admin/update`, admin);
        location.reload();
    } catch (error) {
        console.log(error);
    }
}

//save
async function sendFormAdmin() {
    try {
        const name = document.getElementById("nameAdm").value;
        const email = document.getElementById("emailAdm").value;
        const password = document.getElementById("passwordAdm").value;
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

/* Score */

async function scoreReservation(id) {
    try {
        //ocultamos los campos de message
        const inptmessage = document.getElementById("inpt-messag");
        const inptMessageAudc = document.getElementById("inpt-message-audience");
        inptmessage.classList.add("d-none");
        inptMessageAudc.classList.add("d-none");

        //cambiamos el titulo del modal
        const exampleModalLabel = document.getElementById("exampleModalLabel");
        exampleModalLabel.innerHTML = "Enter Score";

        //hacemos visible los campos de la Score
        const inptScore = document.getElementById("inpt-score");
        const inptScoreMessage = document.getElementById("inpt-score-message");
        inptScore.classList.remove("d-none");
        inptScoreMessage.classList.remove("d-none");

        const btnSubmitModal = document.getElementById("btn-submit-modal");
        btnSubmitModal.addEventListener("click", async () => {
            const score = document.getElementById("score").value;
            const message = document.getElementById("message-score").value;
            const Score = {
                score: parseInt(score),
                message: message,
                reservation: { idReservation: id }
            }
            await service.create(`${URL}Score/save`, Score);
            location.reload();
        });

    } catch (error) {
        console.log(error);
    }
}

/* JQuery */
class StickyNavigation {

    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;
        let self = this;
        $('.et-hero-tab').click(function () {
            self.onTabClick(event, $(this));
        });
        $(window).scroll(() => { this.onScroll(); });
        $(window).resize(() => { this.onResize(); });
    }

    onTabClick(event, element) {
        event.preventDefault();
        let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
        $('html, body').animate({ scrollTop: scrollTop }, 600);
    }

    onScroll() {
        this.checkTabContainerPosition();
        this.findCurrentTabSelector();
    }

    onResize() {
        if (this.currentId) {
            this.setSliderCss();
        }
    }

    checkTabContainerPosition() {
        let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
        if ($(window).scrollTop() > offset) {
            $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
        }
        else {
            $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
        }
    }

    findCurrentTabSelector(element) {
        let newCurrentId;
        let newCurrentTab;
        let self = this;
        $('.et-hero-tab').each(function () {
            let id = $(this).attr('href');
            let offsetTop = $(id).offset().top - self.tabContainerHeight;
            let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
            if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });
        if (this.currentId != newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab;
            this.setSliderCss();
        }
    }

    setSliderCss() {
        let width = 0;
        let left = 0;
        if (this.currentTab) {
            width = this.currentTab.css('width');
            left = this.currentTab.offset().left;
        }
        $('.et-hero-tab-slider').css('width', width);
        $('.et-hero-tab-slider').css('left', left);
    }

}

new StickyNavigation();


/* events */
const btnSaveCategory = document.getElementById("btn-save-category");
btnSaveCategory.addEventListener("click", async function () {
    if (action === "create") {
        saveFormCategory();
    }
    if (action === "update") {
        updateCategory(idCategory);
    }
});

const btnSaveAudience = document.getElementById("btn-save-audience");
btnSaveAudience.addEventListener("click", async function () {
    if (action === "create") {
        sendFormAudience();
    }
    if (action === "update") {
        updateAudience(idAudience);
    }
});

const btnSaveClient = document.getElementById("btn-save-client");
btnSaveClient.addEventListener("click", async function () {
    if (action === "create") {
        sendFormClient();
    }
    if (action === "update") {
        updateClient(idClient);
    }
});

const btnSaveAdmin = document.getElementById("btn-save-adm");
btnSaveAdmin.addEventListener("click", async function () {
    if (action === "create") {
        sendFormAdmin();
    }
    if (action === "update") {
        updateAdmin(idAdmin);
    }
});

