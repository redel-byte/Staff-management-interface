//======================= menu ========================
const sidebarTitle = document.getElementById("sidebar--title");
const employeeAdd = document.getElementById("employee-add");
const moreBtn = document.getElementById("showmore--btn");
const sidebar = document.getElementById("sidebar");
const popup = document.getElementById("popup");
const saveWorker = document.getElementById("save-worker");
const addWorkerForm = document.getElementById("add-worker-form");
const employeeContain = document.getElementById("employee-container");
const removeForm = document.getElementById("remove-form");

const photoUrlInput = document.getElementById("photo__url");
const imgprivewDiv = document.getElementById("imgprivew-div");
const imgPrivew = document.getElementById("imgprivew");
const photoLabel = document.getElementById("photo__label");
const photoInput = document.getElementById("photo");

const closeWorkerProfile = document.getElementById("close-worker-profile");
const closeWorkerPopup = document.getElementById("close-worker-popup");
const workerDisplayPopup = document.getElementById("worker-display-popup");
const workerDisplayPopupRoom = document.getElementById("worker-display-popup-room")


let imageUrl = "";

if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
}

function toggleSidebar() {
    sidebar.classList.toggle("w-1/4");
    sidebar.classList.toggle("w-16");
}

displayEmployees(getWorkers());

function modelcardhidden() {
    const modelCard = document.querySelectorAll(".model-card");
    if (sidebar.classList.contains("w-16")) {
        modelCard.forEach((e) => { e.classList.add("hidden") });
    } else {
        modelCard.forEach((e) => { e.classList.remove("hidden") });
    }
}

moreBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("w-16")) {
        sidebarTitle?.classList.add("hidden");
        employeeAdd?.classList.add("hidden");
    } else {
        sidebarTitle?.classList.remove("hidden");
        employeeAdd?.classList.remove("hidden");
    }
    modelcardhidden();
});

// ============================= EXPERIENCES ============================

function addNewExperience() {
    const experiencesBlock = document.getElementById('experiences--container');
    if (!experiencesBlock) return;

    const div = document.createElement('form');
    div.classList.add('experiences-block', 'border', 'p-4', 'mt-3', 'rounded-xl', 'bg-bb', 'shadow-lg', 'shadow-shado');

    div.innerHTML = `
        <label class="block font-medium mt-2">Company:</label>
        <input type="text" placeholder="Enter company" class="company w-full p-2 border rounded-md">
        <span class="company-error" style="color: red;"></span>

        <label class="block font-medium mt-2">Role:</label>
        <input type="text" placeholder="Enter role" class="roles w-full p-2 border rounded-md">
        <span class="roles-error" style="color: red;"></span>

        <label class="block font-medium mt-2">From:</label>
        <input type="date" class="from-date w-full p-2 border rounded-md">
        <span class="from-date-error hidden error" style="color: red;"></span>

        <label class="block font-medium mt-2">To:</label>
        <input type="date" class="to-date w-full p-2 border rounded-md">
        <span class="to-date-error hidden error" style="color: red;"></span>

        <div class="mt-3 flex gap-2">
            <button type="button" class="remove-experience border rounded p-2">Remove</button>
        </div>
    `;
    experiencesBlock.appendChild(div);
}

function resetBlocks() {
    const arr = document.querySelectorAll(".experiences-block");
    arr.forEach((e) => e.remove());
}

// ============================= GLOBAL CLICK HANDLER ============================

document.addEventListener("click", (e) => {

    if (e.target?.id === "employee-add") {
        popup.classList.remove("hidden");
    }

    if (e.target?.id === "save-worker") {
        saveWorkerInfo();
    }

    if (e.target?.id === "cancel-worker" || e.target?.id === "remove-form") {
        addWorkerForm?.reset();
        popup?.classList.add("hidden");
        resetImg();
        resetBlocks();
    }

    if (e.target?.classList.contains("add-experiences")) {
        addNewExperience();
    }

    if (e.target?.classList.contains("remove-experience")) {
        const block = e.target.closest('.experiences-block');
        if (block) block.remove();
    }

    const workerElement = e.target.closest('.listing-workers-rooms[data-id]');
    if (workerElement) {
        relocateEmployee(workerElement.dataset.id);
        Object.keys(targetDivData).forEach(roomId => {
            displayEmployeInRooms(targetDivData[roomId], document.getElementById(roomId));
        });

        displayEmployees(getWorkers())
    }

    const card = e.target.closest('[data-id]');
    if (card) {
        const id = card.dataset.id;

        if (e.target.classList.contains("model-edit-btn")) {
            openEditWorker(id);
        }
        if (e.target.classList.contains("model-delete-btn")) {
            deleteWorker(id);
            displayEmployees(getWorkers());
        }
        if (e.target.classList.contains("model-img") ||
            e.target.classList.contains("model-name") ||
            e.target.classList.contains("model-role") ||
            e.target.classList.contains("model-card")) {
            workerProfile(id);

        }

        // relocateEmployee(id);
        // if(e.target.classList.contains("Listing")){
        //     console.log(id)
        // }
    }
});




//========================================
function relocateEmployee(workerId) {
    let selectedWorker = null;

    Object.keys(targetDivData).forEach(roomId => {
        targetDivData[roomId] = targetDivData[roomId].filter(worker => {
            if (worker.id === workerId) {
                addWorker(worker);
                return false;
            }
            return true;
        });
    });

    if (!selectedWorker) return;

    // targetDivData[targetDivId].push(selectedWorker);

    Object.keys(targetDivData).forEach(roomId => {
        displayEmployeInRooms(targetDivData[roomId], document.getElementById(roomId));
    });
    displayEmployees(getWorkers());
}

// ============================= IMAGE HANDLER ============================

function setupImageInput() {
    if (!photoInput) return;

    photoInput.addEventListener('change', function () {
        const file = this.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgPrivew.src = e.target.result;
                imgprivewDiv.classList.remove('hidden');
                photoLabel.classList.add('hidden');
                imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

setupImageInput();

function resetImg() {
    imgPrivew.src = "";
    imgprivewDiv.classList.add("hidden");
    photoLabel.classList.remove("hidden");
    imageUrl = "";
    if (photoInput) photoInput.value = "";
    if (photoUrlInput) photoUrlInput.value = "";
}

// ============================= VALIDATION ============================

const validationRules = {
    fullname: {
        regex: /^[a-zA-Z0-9\s,.'-]{2,50}$/,
        message: "Name must be 2-50 characters long."
    },
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format."
    },
    phone: {
        regex: /^(\+\d{1,3}[-.\s]?)?\d{7,}$/,
        message: "Invalid phone format."
    },
    company: {
        regex: /^[a-zA-Z\s'\-]{2,}$/,
        message: "Company name must be at least 2 characters long."
    },
    roles: {
        regex: /^[a-zA-Z0-9\s,.'-]{2,50}$/,
        message: "Role must be 2-50 characters long."
    }
};

function toggleError(field, show, message = "") {
    document.querySelectorAll(`.${field}-error`).forEach(err => err.textContent = message);
    document.querySelectorAll(`.${field}`).forEach(input => {
        input.classList.toggle("border-red-500", show);
        input.classList.toggle("border-green-500", !show);
    });
}

function validateField(field, value) {
    const rule = validationRules[field];
    if (rule && !rule.regex.test(value)) {
        toggleError(field, true, rule.message);
        return false;
    }
    toggleError(field, false);
    return true;
}

function validateForm() {
    let ok = true;
    for (const field in validationRules) {
        const el = document.getElementById(field);
        if (el && !validateField(field, el.value.trim())) {
            ok = false;
        }
    }
    return ok;
}

// ============================= STORAGE ============================

function getWorkers() {
    return JSON.parse(localStorage.getItem("workers") || "[]");
}

function addWorker(w) {
    const workers = getWorkers();
    workers.push(w);
    localStorage.setItem("workers", JSON.stringify(workers));
}

function updateWorker(w) {
    const workers = getWorkers().map(x => x.id === w.id ? w : x);
    localStorage.setItem("workers", JSON.stringify(workers));
}

function deleteWorker(id) {
    const workers = getWorkers().filter(w => w.id !== id);
    localStorage.setItem("workers", JSON.stringify(workers));
}

// ============================= SAVE EMPLOYEE ============================

function getExperiences() {
    return [...document.querySelectorAll('.experiences-block')].map(block => ({
        company: block.querySelector(".company")?.value.trim() || "",
        roles: block.querySelector(".roles")?.value.trim() || "",
        fromDate: block.querySelector(".from-date")?.value || "",
        toDate: block.querySelector(".to-date")?.value || ""
    })).filter(e => e.company !== "");
}

function saveWorkerInfo() {
    if (!validateForm()) return;

    const idEl = document.getElementById("job-id");
    const worker = {
        id: idEl?.value.trim() || Date.now().toString(),
        fullName: document.getElementById("fullname")?.value.trim() || "",
        resumeRoles: document.getElementById("resume-roles")?.value.trim() || "",
        email: document.getElementById("email")?.value.trim() || "",
        phone: document.getElementById("phone")?.value.trim() || "",
        image: imageUrl || photoUrlInput?.value.trim() || "",
        experiences: getExperiences()
    };

    if (idEl?.value) updateWorker(worker);
    else addWorker(worker);

    popup.classList.add("hidden");
    addWorkerForm.reset();
    resetImg();
    displayEmployees(getWorkers());
}

// ============================= EMPLOYEE DISPLAY ============================

function displayEmployees(workers) {
    const list = document.getElementById("employee-list");
    if (!list) return;

    list.innerHTML = "";

    workers.forEach(worker => {

        if (!worker || typeof worker !== "object") return;
        if (!worker.id) return;

        const div = document.createElement("div");
        div.classList.add("listing");
        div.dataset.id = worker.id;

        div.innerHTML = `
          <div class="model-card mb-3 flex justify-between border bg-gray-100 rounded-xl w-full p-2 items-center">
            <img class="model-img rounded-full w-[3em] h-[3em]" src="${worker.image || ""}" alt="">
            <div class="w-40">
              <h4 class="model-name ml-3 font-bold">${worker.fullName || ""}</h4>
              <span class="model-role ml-4 text-xs">${worker.resumeRoles || ""}</span>
            </div>
            <div class="flex gap-2">
              <button class="model-edit-btn border rounded-xl p-1 border-yellow-500 text-yellow-500">Edit</button>
              <button class="model-delete-btn border border-red-500 p-1 rounded-xl text-red-500">Delete</button>
            </div>
          </div>
        `;
        list.appendChild(div);
    });
}


// ============================= PROFILE ============================

function openEditWorker(id) {
    const worker = getWorkers().find(w => w.id === id);
    if (!worker) return;

    document.getElementById("job-id").value = worker.id;
    document.getElementById("fullname").value = worker.fullName;
    document.getElementById("resume-roles").value = worker.resumeRoles;
    document.getElementById("email").value = worker.email;
    document.getElementById("phone").value = worker.phone;

    if (photoUrlInput) photoUrlInput.value = worker.image;

    if (worker.image) {
        imgPrivew.src = worker.image;
        imgprivewDiv.classList.remove("hidden");
        photoLabel.classList.add("hidden");
        imageUrl = worker.image;
    } else resetImg();

    const container = document.getElementById("experiences--container");
    container.innerHTML = "";

    worker.experiences?.forEach(exp => {
        const div = document.createElement("div");
        div.classList.add("experiences-block", "border", "p-4", "mt-3", "rounded-xl", "bg-bb");
        div.innerHTML = `
            <input type="text" class="company w-full p-2 border rounded-md" value="${exp.company}">
            <span class="company-error" style="color:red;"></span>

            <input type="text" class="roles w-full p-2 border rounded-md mt-2" value="${exp.roles}">
            <span class="roles-error" style="color:red;"></span>

            <input type="date" class="from-date w-full p-2 border rounded-md mt-2" value="${exp.fromDate}">
            <input type="date" class="to-date w-full p-2 border rounded-md mt-2" value="${exp.toDate}">

            <div class="mt-3 flex gap-2">
              <button type="button" class="remove-experience border rounded p-2">Remove</button>
            </div>
        `;
        container.appendChild(div);
    });

    popup.classList.remove("hidden");
}

function workerProfile(id) {
    const worker = getWorkers().find(w => w.id === id);
    if (!worker) return;
    addInfoToProfile(worker);
}

function addInfoToProfile(worker) {
    document.getElementById("display-photo").src = worker.image;
    document.getElementById("display-name").textContent = worker.fullName;
    document.getElementById("display-role").textContent = worker.resumeRoles;
    document.getElementById("display-email").textContent = worker.email;
    document.getElementById("display-phone").textContent = worker.phone;

    const expContainer = document.getElementById("display-experiences");
    expContainer.innerHTML = "";

    if (worker.experiences?.length) {
        const ul = document.createElement("ul");
        worker.experiences.forEach(exp => {
            const li = document.createElement("li");
            li.textContent = `${exp.company} — ${exp.roles} (${exp.fromDate} → ${exp.toDate})`;
            ul.appendChild(li);
        });
        expContainer.appendChild(ul);
    } else {
        expContainer.textContent = "No experiences available";
    }

    document.getElementById("worker-display-popup").classList.remove("hidden");
}

// ============================= CLOSE PROFILE ============================

document.addEventListener("click", (e) => {
    if (
        e.target?.id === "close-worker-profile" ||
        e.target?.id === "close-worker-popup" ||
        e.target?.id === "close-worker-popup-room"
    ) {
        workerDisplayPopup.classList.add("hidden");
        workerDisplayPopupRoom.classList.add("hidden");
    }
});

// ============================= ROOMS ============================

const conferenceRoom = [];
const receptionRoom = [];
const serveursRoom = [];
const personnelRoom = [];
const securityRoom = [];
const archivesRoom = [];

const roomFilters = {
    "conference-space-btn": null,
    "reception-btn": ["Receptionist", "Manager"],
    "serveurs-btn": ["IT Guy"],
    "personnel-btn": ["Security", "Other"],
    "security-btn": ["Security", "Manager"],
    "archives-btn": ["Manager"]
};

const roomTargetDivs = {
    "conference-space-btn": "conference-space",
    "reception-btn": "reception-space",
    "serveurs-btn": "serveurs-space",
    "personnel-btn": "personnel-space",
    "security-btn": "security-space",
    "archives-btn": "archives-space"
};

const targetDivData = {
    "conference-space": conferenceRoom,
    "reception-space": receptionRoom,
    "serveurs-space": serveursRoom,
    "personnel-space": personnelRoom,
    "security-space": securityRoom,
    "archives-space": archivesRoom
};

let currentRoomButton = null;
let workerClickListenerAdded = false;

function displayEmployeesInList(workers, preview = document.getElementById("worker-preview")) {
    if (!preview) return;

    preview.innerHTML = "";

    workers.forEach(worker => {
        if (!worker || typeof worker !== "object") return;
        if (!worker.id) return;

        const div = document.createElement("div");
        div.classList.add("listing-workers");
        div.dataset.id = worker.id;

        div.innerHTML = `
                <div class="model-card mb-3 flex justify-between border bg-gray-100 rounded-xl w-full p-2 items-center">
                    <img class="model-img rounded-full w-[3em] h-[3em]" src="${worker.image}">
                    <div class="w-40">
                        <h4 class="model-name ml-3 font-bold">${worker.fullName}</h4>
                        <span class="model-role ml-4 text-xs">${worker.resumeRoles}</span>
                    </div>
                </div>
            `;
        preview.appendChild(div);
    }
    );
}
function displayEmployeInRooms(workers, preview = document.getElementById("worker-preview")) {
    if (!preview) return;
    if (!workers || typeof workers !== "object") return;


    preview.innerHTML = "";
    workers.forEach(worker => {
        if (!worker || typeof worker !== "object") return;
        if (!worker.id) return;

        const div = document.createElement("div");
        div.classList.add("listing-workers-rooms");
        div.dataset.id = worker.id;

        div.innerHTML = `
                <div class="model-card mb-3 flex justify-between border bg-gray-100 rounded-xl w-full p-2 items-center">
                    <img class="model-img rounded-full w-[3em] h-[3em]" src="${worker.image}">
                    <div class="w-40">
                        <h4 class="model-name ml-3 font-bold">${worker.fullName}</h4>
                        <span class="model-role ml-4 text-xs">${worker.resumeRoles}</span>
                    </div>
                </div>
            `;
        preview.appendChild(div);
    }
    );
}


// ============================= LOCATE EMPLOYEE ============================

function locateEmployees(workerId, targetDivId) {
    const workers = getWorkers();
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    targetDivData[targetDivId].push(worker);

    deleteWorker(workerId);
    displayEmployees(getWorkers());
    workerDisplayPopupRoom.classList.add("hidden");

    // refresh room previews
    Object.keys(targetDivData).forEach(key => {
        displayEmployeInRooms(targetDivData[key], document.getElementById(key));
    });
}

// ============================= ROOM BUTTONS ============================

document.addEventListener("click", function (event) {
    const buttonId = event.target.id;
    const roles = roomFilters[buttonId];
    if (roles === undefined) return;

    currentRoomButton = buttonId;

    workerDisplayPopupRoom.classList.remove("hidden");

    const workers = getWorkers();
    let filtered;
    if (roles) {
        filtered = workers.filter(function (worker) {
            if (!worker.resumeRoles) return;
            return roles.includes(worker.resumeRoles);
        });
    } else {
        filtered = workers;
    }
    // const filtered = roles === null ? workers : workers.filter(w => roles.includes(w.resumeRoles));

    displayEmployeesInList(filtered);
    if (!workerClickListenerAdded) {
        const workerPreview = document.getElementById("worker-preview");
        workerPreview.addEventListener("click", (e) => {
            const target = e.target.closest(".listing-workers");
            if (!target) return;

            const workerId = target.dataset.id;
            const targetDivId = roomTargetDivs[currentRoomButton] || "conference-space";

            locateEmployees(workerId, targetDivId);
        });

        workerClickListenerAdded = true;
    }
});
