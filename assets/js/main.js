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

let imageUrl = ""; //base64 ;

if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
}

function toggleSidebar() {
    sidebar.classList.toggle("w-64");
    sidebar.classList.toggle("w-16");
}

displayEmployees(getWorkers());

moreBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("w-16")) {
        sidebarTitle?.classList.add("hidden");
        employeeAdd?.classList.add("hidden");
        modelCard.classList
    } else {
        sidebarTitle?.classList.remove("hidden");
        employeeAdd?.classList.remove("hidden");
    }
});


function addNewExperience() {
    const experiencesBlock = document.getElementById('experiences--container');
    if (!experiencesBlock) return;
    const experiencesDiv = document.createElement('form');
    experiencesDiv.classList.add('experiences-block', 'border', 'p-4', 'mt-3', 'rounded-xl', 'bg-bb');
    experiencesDiv.innerHTML = `
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
    experiencesBlock.appendChild(experiencesDiv);
}

function experiencesBlock() {
    const modelRestArrat = Array.from(document.getElementsByClassName("experiences-block"));
    modelRestArrat.forEach((e) => {
            e.reset();
    })
}

document.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.id === "employee-add") {
        if (popup.classList.contains("hidden")) popup.classList.remove("hidden");
    }

    if (target && target.id === "save-worker") {
        saveWorkerInfo();
    }

    if (target && (target.id === "cancel-worker" || target.id === "remove-form")) {
        addWorkerForm?.reset();
        popup?.classList.add("hidden");
        resetImg();
        experiencesBlock();
    }

    if (target && target.classList && target.classList.contains("add-experiences")) {
        addNewExperience();
    }

    if (target && target.classList && target.classList.contains("remove-experience")) {
        const block = target.closest('.experiences-block');
        if (block) block.remove();
    }

    const card = target.closest && target.closest('[data-id]');
    if (card) {
        const id = card.dataset.id;
        if (target.classList.contains("model-edit-btn")) {
            openEditWorker(id);
        } else {
            workerProfile(id);
        }
    }
});

function setupImageInput() {
    if (!photoInput) return;
    photoInput.addEventListener('change', function () {
        const file = this.files && this.files[0];
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
// call to attach listener
setupImageInput();

// get experiences values from DOM (only blocks with non-empty company)
function getExperiences() {
    const experiencesBlock = document.querySelectorAll('.experiences-block');
    return Array.from(experiencesBlock).map(block => {
        const companyEl = block.querySelector('.company');
        const rolesEl = block.querySelector('.roles');
        const fromEl = block.querySelector('.from-date');
        const toEl = block.querySelector('.to-date');
        return {
            company: companyEl ? (companyEl.value || '').trim() : '',
            roles: rolesEl ? (rolesEl.value || '').trim() : '',
            fromDate: fromEl ? fromEl.value : '',
            toDate: toEl ? toEl.value : ''
        };
    }).filter(p => p.company && p.company.trim() !== '');
}

// localStorage helpers
function getWorkers() {
    const workers = localStorage.getItem('workers');
    return workers ? JSON.parse(workers) : [];
}
function addWorker(work) {
    const workers = getWorkers();
    workers.push(work);
    localStorage.setItem('workers', JSON.stringify(workers));
}
function updateWorker(updatedWorker) {
    let workers = getWorkers();
    workers = workers.map(w => (w.id === updatedWorker.id ? updatedWorker : w));
    localStorage.setItem('workers', JSON.stringify(workers));
}
function deleteWorker(id) {
    let workers = getWorkers();
    workers = workers.filter(worker => worker.id !== id);
    localStorage.setItem('workers', JSON.stringify(workers));
}

// validation rules
const validationRules = {
    'fullname': {
        regex: /^[a-zA-Z0-9\s,.'-]{2,50}$/,
        message: "Name must be 2-50 characters long."
    },
    'email': {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format."
    },
    'phone': {
        regex: /^(\+\d{1,3}[-.\s]?)?\d{7,}$/,
        message: "Invalid phone format."
    },
    'company': {
        regex: /^[a-zA-Z\s'\-]{2,}$/,
        message: "Company name must be at least 2 characters long."
    },
    'roles': {
        regex: /^[a-zA-Z0-9\s,.'-]{2,50}$/,
        message: "Role must be 2-50 characters long."
    }
};

function toggleError(field, showError, message = '') {
    const errorDisplay = Array.from(document.getElementsByClassName(`${field}-error`));
    const inputField = Array.from(document.getElementsByClassName(field));
    if (showError) {
        errorDisplay.forEach(e => { e.textContent = message; });
        inputField.forEach(e => {
            e.classList.add('border-red-500');
            e.classList.remove('border-green-500');
        });
    } else {
        errorDisplay.forEach(e => { e.textContent = message; });
        inputField.forEach(e => {
            e.classList.remove('border-red-500');
            e.classList.add('border-green-500');
        });
    }
}
function validateField(field, value) {
    const rule = validationRules[field];
    if (rule && !rule.regex.test(value)) {
        toggleError(field, true, rule.message);
        return false;
    } else if (rule) {
        toggleError(field, false);
        return true;
    }
    return true;
}
function validateForm() {
    let isValid = true;
    for (const field in validationRules) {
        const inputField = document.getElementById(field);
        if (inputField && !validateField(field, inputField.value.trim())) {
            isValid = false;
        }
    }
    return isValid;
}

// reset image preview
function resetImg() {
    if (imgPrivew) imgPrivew.src = "";
    if (imgprivewDiv) imgprivewDiv.classList.add("hidden");
    if (photoLabel) photoLabel.classList.remove("hidden");
    imageUrl = "";
    if (photoInput) photoInput.value = "";
    if (photoUrlInput) photoUrlInput.value = "";
}

// save (create or update) worker
function saveWorkerInfo() {
    const id = document.getElementById('job-id')?.value.trim();
    const fullName = document.getElementById("fullname")?.value.trim() || "";
    const resumeRoles = document.getElementById("resume-roles")?.value.trim() || "";
    const photoUrlVal = photoUrlInput?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";

    if (!validateForm()) {
        return;
    }

    // prefer base64/imageUrl from file input, otherwise fallback to provided photo__url input
    const finalImage = imageUrl || photoUrlVal || "";

    const workerData = {
        id: id || new Date().getTime().toString(),
        fullName,
        resumeRoles,
        image: finalImage,
        email,
        phone,
        experiences: getExperiences()
    };

    if (id) {
        updateWorker(workerData);
    } else {
        addWorker(workerData);
    }

    const workers = getWorkers();
    popup.classList.add("hidden");
    addWorkerForm.reset();
    resetImg();
    displayEmployees(workers);
}

// render employee list (fixed function name and uses worker.image)
function displayEmployees(workers) {
    const employeeList = document.getElementById("employee-list");
    if (!employeeList) return;
    employeeList.innerHTML = "";

    workers.forEach(worker => {
        const modelCard = document.createElement("div");
        modelCard.classList.add("listing");
        modelCard.dataset.id = worker.id;
        modelCard.innerHTML = `
      <div class="model-card mb-3 flex justify-between border bg-gray-100 rounded-full w-[100%] p-2 items-center">
        <img class="model-img rounded-full w-[3em] h-[3em]" src="${worker.image || ''}" alt="image">
        <div class="w-40">
          <h4 class="model-name ml-3 text-left font-bold">${worker.fullName || ''}</h4>
          <span class="model-role ml-4 text-xs">${worker.resumeRoles || ''}</span>
        </div>
        <div class="flex gap-2">
          <button class="model-edit-btn text-yellow-500" type="button">Edit</button>
          <button class="model-delete-btn text-red-500" type="button">Delete</button>
        </div>
      </div>
    `;
        employeeList.appendChild(modelCard);
    });
}

// open edit modal and populate form for the worker with given id
function openEditWorker(id) {
    const workers = getWorkers();
    const worker = workers.find(w => w.id === id);
    if (!worker) return;
    // populate fields
    document.getElementById('job-id').value = worker.id;
    document.getElementById('fullname').value = worker.fullName || '';
    document.getElementById('resume-roles').value = worker.resumeRoles || '';
    document.getElementById('email').value = worker.email || '';
    document.getElementById('phone').value = worker.phone || '';
    if (photoUrlInput) photoUrlInput.value = worker.image || '';
    if (worker.image) {
        imgPrivew.src = worker.image;
        imgprivewDiv.classList.remove('hidden');
        photoLabel.classList.add('hidden');
        imageUrl = worker.image;
    } else {
        resetImg();
    }

    // clear experiences container and re-add from worker.experiences
    const expContainer = document.getElementById('experiences--container');
    if (expContainer) {
        expContainer.innerHTML = '';
        if (Array.isArray(worker.experiences)) {
            worker.experiences.forEach(exp => {
                const div = document.createElement('div');
                div.classList.add('experiences-block', 'border', 'p-4', 'mt-3', 'rounded-10', 'bg-bb');
                div.innerHTML = `
          <input type="text" class="company w-full p-2 border rounded-md" value="${exp.company || ''}">
          <span class="company-error" style="color: red;"></span>

          <input type="text" class="roles w-full p-2 border rounded-md mt-2" value="${exp.roles || ''}">
          <span class="roles-error" style="color: red;"></span>

          <input type="date" class="from-date w-full p-2 border rounded-md mt-2" value="${exp.fromDate || ''}">
          <input type="date" class="to-date w-full p-2 border rounded-md mt-2" value="${exp.toDate || ''}">

          <div class="mt-3 flex gap-2">
            <button type="button" class="remove-experience border rounded p-2">Remove</button>
          </div>
        `;
                expContainer.appendChild(div);
            });
        }
    }

    // show modal
    if (popup) popup.classList.remove('hidden');
}

// show worker profile in display area
function workerProfile(id) {
    const workers = getWorkers();
    const worker = workers.find(w => w.id === id);
    if (!worker) return;
    addInfoToProfile(worker);
}

function addInfoToProfile(worker) {
    const displayPhoto = document.getElementById("display-photo");
    const displayName = document.getElementById("display-name");
    const displayRole = document.getElementById("display-role");
    const displayEmail = document.getElementById("display-email");
    const displayPhone = document.getElementById("display-phone");
    const displayExperiences = document.getElementById("display-experiences");

    if (displayPhoto) displayPhoto.src = worker.image || "";
    if (displayName) displayName.textContent = worker.fullName || "";
    if (displayRole) displayRole.textContent = worker.resumeRoles || "";
    if (displayEmail) displayEmail.textContent = worker.email || "";
    if (displayPhone) displayPhone.textContent = worker.phone || "";

    // render experiences as list
    if (displayExperiences) {
        displayExperiences.innerHTML = "";
        if (Array.isArray(worker.experiences) && worker.experiences.length > 0) {
            const ul = document.createElement('ul');
            worker.experiences.forEach(exp => {
                const li = document.createElement('li');
                li.textContent = `${exp.company || ''} — ${exp.roles || ''} (${exp.fromDate || ''} → ${exp.toDate || ''})`;
                ul.appendChild(li);
            });
            displayExperiences.appendChild(ul);
        } else {
            displayExperiences.textContent = "No experiences available";
        }
    }

    const displayPopup = document.getElementById("worker-display-popup");
    if (displayPopup) displayPopup.classList.remove("hidden");
}

// initial render
displayEmployees(getWorkers());



//close  profile popup:


const closeWorkerProfile = document.getElementById("close-worker-profile");
const closeWorkerPopup = document.getElementById("close-worker-popup");
const workerDisplayPopup = document.getElementById("worker-display-popup");


document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "close-worker-profile" || e.target && e.target.id === "close-worker-popup") {
        workerDisplayPopup.classList.add('hidden');
    }
})