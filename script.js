document.addEventListener("DOMContentLoaded", () => {

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

loadTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(e){
    if(e.key === "Enter") addTask();
});

function addTask() {
    const text = taskInput.value.trim();
    if(text === "") return;

    createTask(text);
    saveTasks();
    taskInput.value="";
}

function createTask(text, completed=false) {

    const li = document.createElement("li");
    if(completed) li.classList.add("completed");

    li.innerHTML = `
        <span>${text}</span>
        <div>
            <button class="done"><i class="fa-solid fa-check"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    li.querySelector(".done").onclick = () => {
        li.classList.toggle("completed");
        saveTasks();
    };

    li.querySelector(".delete").onclick = () => {
        li.remove();
        saveTasks();
    };

    taskList.appendChild(li);
}

function saveTasks(){
    const data=[];
    document.querySelectorAll("#taskList li").forEach(li=>{
        data.push({
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(data));
}

function loadTasks(){
    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    data.forEach(t => createTask(t.text, t.completed));
}

});

