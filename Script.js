const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    const taskHeader = document.createElement("div");
    taskHeader.classList.add("task-header");

    const span = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text");

    span.addEventListener("click", function() {
        li.classList.toggle("completed");
    });

    const iconsDiv = document.createElement("div");
    iconsDiv.classList.add("icons");

    // Complete Icon
    const checkIcon = document.createElement("i");
    checkIcon.className = "fa-solid fa-circle-check icon-btn";
    checkIcon.addEventListener("click", function() {
        li.classList.toggle("completed");
    });

    // Delete Icon
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash icon-btn";
    deleteIcon.addEventListener("click", function() {
        taskList.removeChild(li);
    });

    iconsDiv.appendChild(checkIcon);
    iconsDiv.appendChild(deleteIcon);

    taskHeader.appendChild(span);
    taskHeader.appendChild(iconsDiv);

    // Date & Time
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("task-date");

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    dateDiv.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${date} 
                         <i class="fa-solid fa-clock"></i> ${time}`;

    li.appendChild(taskHeader);
    li.appendChild(dateDiv);
    taskList.appendChild(li);

    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

