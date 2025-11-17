const sidebarTitle = document.getElementById("sidebar--title");
const employeeAdd = document.getElementById("employee-add");
const moreBtn = document.getElementById("showmore--btn")
const sidebar = document.getElementById("sidebar");
const popup = document.getElementById("popup");
const saveWorker = document.getElementById("save-worker");
const addWorkerForm = document.getElementById("add-worker-form");
const employeeContain = document.getElementById("employee-container");
const removeForm = document.getElementById("remove-form");

// form input;
const fullName = document.getElementById("fullname");
const resumeRoles = document.getElementById("resume-roles");
const photoUrl = document.getElementById("photo__url");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const company = document.getElementById("company");
const roles = document.getElementById("roles");
const fromDate = document.getElementById("from-date");
const toDate = document.getElementById("to-date");

lucide.createIcons();
function toggleSidebar() {
    sidebar.classList.toggle("w-64");
    sidebar.classList.toggle("w-16");
}

displayemployee(getWorkers());
moreBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("w-16")) {
        sidebarTitle.classList.add("hidden");
        employeeAdd.classList.add("hidden");
    }
    else {
        sidebarTitle.classList.remove("hidden");
        employeeAdd.classList.remove("hidden");
    }
})




function addNewExperience() {
    const experiencesBlock = document.getElementById('experiences--container');
    const experiencesDiv = document.createElement('div');
    experiencesDiv.classList.add('experiences-block');
    experiencesDiv.innerHTML = `
        <div class="experiences-block border p-4 mt-3 rounded-10 bg-bb">
                                    <form>
                                        <label for="company" class="block font-medium mt-4">Company:</label>
                                        <input id="company" type="text" placeholder="Enter company"
                                            class="company w-full p-2 border rounded-md">
                                        <span class="company-error" style="color: red;"></span>

                                        <label for="roles" class="block font-medium mt-4">Role:</label>
                                        <input id="roles" type="text" placeholder="Enter role"
                                            class="roles w-full p-2 border rounded-md">
                                        <span class="roles-error" style="color: red;"></span>

                                        <label for="from-date" class="block font-medium mt-4">from:</label>
                                        <input id="from-date" type="date"
                                            class="from-date w-full p-2 border rounded-md">
                                        <span class="from-date-error hidden error" style="color: red;"></span>

                                        <label for="to-date" class="block font-medium mt-4">To:</label>
                                        <input id="to-date" type="date" class="to-date w-full p-2 border rounded-md">
                                        <span class="to-date-error hidden error" style="color: red;"></span>
                                    </form>
                                    <button type="button"
                                        class="add-experiences mt-4 border rounded-full p-3 bg-gray-50">Add
                                </div>
    `;
    // Append the new project block to the projects container
    experiencesBlock.appendChild(experiencesDiv);
}

document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "employee-add") {
        if (popup.classList.contains("hidden")) popup.classList.remove("hidden");
    }
    if (e.target && e.target.id === "save-worker") {
        saveWorkerInfo();
    }
    if (e.target && e.target.id === "cancel-worker" || e.target.id === "remove-form") {
        addWorkerForm.reset();
        popup.classList.add("hidden");
        resetImg();
    }
    if (e.target && e.target.classList.contains("add-experiences")) {
        addNewExperience();
        resetImg();
    }
})

function saveWorkerInfo() {
    const id = document.getElementById('job-id').value.trim();
    const fullName = document.getElementById("fullname").value.trim();
    const resumeRoles = document.getElementById("resume-roles").value.trim();
    const photoUrl = document.getElementById("photo__url").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const image = document.getElementById("photo").value;
    // const company = document.getElementById("company").value.trim();
    // const roles = document.getElementById("roles").value.trim();
    // const fromDate = document.getElementById("from-data").value;
    // const toDate = document.getElementById("to-date").value;

    if (!validateForm()) {
        return
    }

    const workerData = {
        id: id || new Date().getTime().toString(),
        fullName,
        resumeRoles,
        photoUrl,
        image,
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
    displayemployee(workers);
}

function resetImg() {
    imgPrivew.src = "";
    imgprivewDiv.classList.add("hidden");
    photoLabel.classList.remove("hidden");
}

// img preview ;
const imgprivewDiv = document.getElementById("imgprivew-div");
const imgPrivew = document.getElementById("imgprivew");
// photoUrl.addEventListener("blur", (event) => {
//     imgprivewDiv.classList.remove("hidden")
//     imgprivew.src = photoUrl.value.trim()

// });

let imageUrl;
const photoLabel = document.getElementById("photo__label");
const photoInput = document.getElementById("photo");

photoInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imgPrivew.src = e.target.result;
            imgprivewDiv.classList.remove('hidden');
            photoLabel.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
});

function getExperiences() {
    const experiencesBlock = document.querySelectorAll('.experiences-block');
    return Array.from(experiencesBlock).map(block => {
        return {
            company: block.querySelector('.company').value,
            roles: block.querySelector('.roles').value,
            fromDate: block.querySelector('.from-date').value,
            toDate: block.querySelector(".to-date").value
        };
    }).filter(p => p.company.trim() !== '');
}

function getWorkers() {
    const workers = localStorage.getItem('workers');
    return workers ? JSON.parse(workers) : [];
}

function addWorker(work) {
    const workers = getWorkers();
    workers.push(work);
    localStorage.setItem('workers', JSON.stringify(workers));
}
function updateWorker(updateWorker) {
    let workers = getWorkers();
    workers = workers.map(j => (j.id === updateWorker.id ? updatedJob : j));
    localStorage.setItem('workers', JSON.stringify(workers));
}

function deleteJob(id) {
    let workers = getWorkers();
    workers = workers.filter(worker => worker.id !== id);
    localStorage.setItem('workers', JSON.stringify(workers));
}

// validation part;

const validationRules = {
    'fullname': {
        regex: /^[a-zA-Z0-9\s,.'-]{2,20}$/,
        message: "Name must be 2-20 characters long."
    },
    // 'photo__url': {
    //     regex: /^https?:\/\/[^\s]+$/,
    //     message: "rolestitle must be 2-50 characters long."
    // },
    'email': {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email form."
    },
    'phone': {
        regex: /^(\+\d{1,3}[-.\s]?)?\d{7,}$/,
        message: "invalid phone form."
    },
    'company': {
        regex: /^[a-zA-Z\s'-]{2,}$/,
        message: "Company name must be at least 2 characters long."
    },
    'roles': {
        regex: /^[a-zA-Z0-9\s,.'-]{2,20}$/,
        message: "roles must be 2-20 characters long."
    }
};

function toggleError(field, showError, message = '') {
    const errorDisplay = Array.from(document.getElementsByClassName(`${field}-error`));
    const inputField = Array.from(document.getElementsByClassName(field));
    if (showError) {
        // console.log(`${field}: is errorDisplay null ? ${errorDisplay == null}`);
        console.log(field)
        errorDisplay.map((e) => { e.textContent = message });
        inputField.map((e) => {
            e.classList.add('border-red-500')
            e.classList.remove('border-green-500');
        });
    } else {
        errorDisplay.map((e) => { e.textContent = message })
        inputField.map((e) => {
            e.classList.remove('border-red-500')
            e.classList.add('border-green-500')
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
        if (inputField && !validateField(field, inputField.value)) {
            isValid = false;
        }
    }
    return isValid;
}



// add model;


// 
function displayemployee(workers) {
    const employeeList = document.getElementById("employee-list");
    employeeList.innerHTML = "";

    workers.forEach(worker => {
        const modelCard = document.createElement("div");
        modelCard.classList.add("listing");
        modelCard.innerHTML = `
<div data-id=${worker.id} class="model-card mb-3 flex  justify-between border bg-gray-100 rounded-full w-[100%] p-2">
    <img class="model-img rounded-full w-[3em] h-[3em] " src="${worker.image}" alt="image">
    <div class="w-40">
        <h4 class="model-name ml-3 text-left font-bold">${worker.fullName}</h4>
        <span class="model-role ml-4 text-xs">${worker.resumeRoles}</span>
    </div>
    <button class="model-edit-btn text-yellow-500" type="button">Edit</button>
</div>`;
        console.log(worker)
        employeeList.appendChild(modelCard);
    })
}


// listening on models:
const popupProfile = document.getElementById("worker-display-popup");

document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("model-card")||e.target.classList.contains ("model-name")||e.target.classList.contains("model-img")||e.target.classList.contains("model-role")||e.target.classList.contains("")) {
        const profile = workerProfile(e.target.getAttribute('data-id'));
        popupProfile.classList.remove("hidden")


    }
})

function workerProfile(id){
    const workers = getWorkers();
    
    workers.forEach((worker)=>{
        if(worker.id === id){
            return worker;
        }
    })
}
