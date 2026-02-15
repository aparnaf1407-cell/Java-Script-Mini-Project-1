const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

loadTasks();

// Add task button
addBtn.addEventListener("click", addTask);

// Enter key support
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText);
    saveTasks();
    taskInput.value = "";
}

function createTaskElement(text, completed = false) {
    const li = document.createElement("li");

    if (completed) li.classList.add("completed");

    li.innerHTML = `
        <span>${text}</span>
        <div class="actions">
            <button class="complete"><i class="fa-solid fa-check"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    // complete task
    li.querySelector(".complete").addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    // delete task
    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    stored.forEach(task => createTaskElement(task.text, task.completed));
}
