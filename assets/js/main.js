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
const fromDate = document.getElementById("from-data");
const toDate = document.getElementById("to-date");

lucide.createIcons();
function toggleSidebar() {
    sidebar.classList.toggle("w-64");
    sidebar.classList.toggle("w-16");
}

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

const imgprivew = document.getElementById("imgprivew");
photoUrl.addEventListener("blur", (event) => { imgprivew.src = photoUrl.value.trim() });




function addNewExperience() {
    const experiencesBlock = document.getElementById('experiences--container');
    const experiencesDiv = document.createElement('div');
    experiencesDiv.classList.add('experiences-block');
    experiencesDiv.innerHTML = `
         <div class="border p-4 mt-3 rounded-10 bg-bb">
                                    <form>
                                        <label for="company" class="block font-medium mt-4">Company:</label>
                                        <input id="company" type="text" placeholder="Enter company"
                                            class="company w-full p-2 border rounded-md">
                                        <span class="company__error error" style="color: red;"></span>

                                        <label for="roles" class="block font-medium mt-4">Role:</label>
                                        <input id="roles" type="text"  placeholder="Enter role"
                                            class="roles w-full p-2 border rounded-md">
                                        <span class="roles__error hidden error" style="color: red;"></span>

                                        <label for="from-date" class="block font-medium mt-4">from:</label>
                                        <input id="from-date" type="date" class="from-date w-full p-2 border rounded-md">
                                        <span class="from-date__error hidden error" style="color: red;"></span>

                                        <label for="to-date" class="block font-medium mt-4">To:</label>
                                        <input id="to-date" type="date" class="to-date w-full p-2 border rounded-md">
                                        <span class="to-date__error hidden error" style="color: red;"></span>
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
        saveWorkerInfo
        popup.classList.add("hidden");
        saveWorkerInfo();
    }
    if (e.target && e.target.id === "remove-form") {
        addWorkerForm.reset();
        popup.classList.add("hidden");
    }
    if (e.target && e.target.classList.contains("add-experiences")) {
        addNewExperience();
    }
})

function saveWorkerInfo() {
    const id = document.getElementById('job-id').value.trim();
    const fullName = document.getElementById("fullname").value.trim();
    const resumeRoles = document.getElementById("resume-roles").value.trim();
    const photoUrl = document.getElementById("photo__url").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    // const company = document.getElementById("company").value.trim();
    // const roles = document.getElementById("roles").value.trim();
    // const fromDate = document.getElementById("from-data").value;
    // const toDate = document.getElementById("to-date").value;


    const workerData = {
        id: id || new Date().getTime().toString(),
        fullName,
        resumeRoles,
        photoUrl,
        email,
        phone,
        experiences: getExperiences()
    };
    if (id) {
        updateWorker(workerData);
    } else {
        addWorker(workerData);
    }
}


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


const validationRules = {
    'fullname': {
        regex: /^[a-zA-Z0-9\s,.'-]{2,20}$/,
        message: "Name must be 2-20 characters long."
    },
    'photo__url': {
        regex: /^https?:\/\/[^\s]+$/,
        message: "rolestitle must be 2-50 characters long."
    },
    'email': {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email form."
    },
    'phone':{
        regex:/^[\+]?[0-9]{0,3}\W?+[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        message:"invalid phone form."
    },
    'company':{
        regex: /^[a-zA-Z0-9\s,.'-]{2,20}$/,
        message:"Company name must be 2-20 characters long."
    },
    'roles':{
        regex: /^[a-zA-Z0-9\s,.'-]{2,20}$/,
        message: "roles must be 2-20 characters long."
    }
};
function toggleError(field, show, message = '') {
    const errorDisplay = document.getElementById(`${field}`);
    const inputField = document.getElementById(field);
    if (show) {
        errorDisplay.textContent = message;
        errorDisplay.classList.remove('hidden');
        inputField.classList.add('border-red-500');
        inputField.classList.remove('border-green-500');
    } else {
        errorDisplay.classList.add('hidden');
        inputField.classList.remove('border-red-500');
        inputField.classList.add('border-green-500');
    }
}