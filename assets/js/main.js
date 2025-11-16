const sidebarTitle = document.getElementById("sidebar--title");
const sidebarAddPersonBtn = document.getElementById("addperson");
const moreBtn = document.getElementById("showmore--btn")
const sidebar = document.getElementById("sidebar");


lucide.createIcons();
function toggleSidebar() {
    sidebar.classList.toggle("w-64");
    sidebar.classList.toggle("w-16");
}

moreBtn.addEventListener("click", (e) => {
    if (sidebar.contains("w-64")) {
        sidebarTitle.classList.remove("hidden");
        sidebarAddPersonBtn.classList.remove("hidden");
    }
    else {
        sidebarTitle.classList.add("hidden");
        sidebarAddPersonBtn.classList.add("hidden");
    }
})

function addProjectBlock() {
    const projectsContainer = document.getElementById('projects-container');
    const projectBlock = document.createElement('div');
    projectBlock.classList.add('');
    projectBlock.innerHTML = `
        <div>
            <label for="Company" class="block font-medium mb-1">Company:</label>
            <input id="Company" type="text" placeholder="Enter company" class="w-full p-2 border rounded-md">
        </div>
        <span class="company__error error" style="color: red;"></span>
        <div>
            <label for="roles" class="block font-medium mb-1">Role:</label>
            <input id="roles" type="text" placeholder="Enter role" class="w-full p-2 border rounded-md">
            <span class="roles__error hidden error" style="color: red;"></span>
        </div>
        <div>
            <label for="from-date" class="block font-medium mb-1">from:</label>
            <input id="from-data" type="date" class="w-full p-2 border rounded-md">
            <span class="start-date__error hidden error" style="color: red;"></span>
        </div>
        <div>
            <label for="-date" class="block font-medium mb-1">To:</label>
            <input id="to-data" type="date" class="w-full p-2 border rounded-md">
            <span class="end-date__error hidden error" style="color: red;"></span>
        </div>

        <button type="button" class="btn-delete-project">Remove Project</button>
    `;
    // Append the new project block to the projects container
    projectsContainer.appendChild(projectBlock);
}