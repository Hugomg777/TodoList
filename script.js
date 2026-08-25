const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        priority: priorityInput.value
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {
        const taskElement = document.createElement("div");

        taskElement.classList.add("task");
        taskElement.classList.add(`priority-${task.priority || "medium"}`);

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const priorityNames = {
            low: "🟢 Baixa",
            medium: "🟡 Média",
            high: "🔴 Alta"
        };

        taskElement.innerHTML = `
            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? "checked" : ""}
            >

            <span class="task-text">
                ${task.text}
            </span>

            <span class="priority-label priority-${task.priority || "medium"}">
                ${priorityNames[task.priority || "medium"]}
            </span>

            <button class="edit-button" title="Editar tarefa">
                ✏️
            </button>

            <button class="delete-button" title="Excluir tarefa">
                🗑️
            </button>
        `;

        const checkbox = taskElement.querySelector(".task-checkbox");

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;

            saveTasks();
            renderTasks();
        });

        const editButton = taskElement.querySelector(".edit-button");

        editButton.addEventListener("click", () => {
            startEditing(task, taskElement);
        });

        const deleteButton = taskElement.querySelector(".delete-button");

        deleteButton.addEventListener("click", () => {
            taskElement.classList.add("removing");

            taskElement.addEventListener("animationend", () => {
                tasks = tasks.filter(item => item.id !== task.id);

                saveTasks();
                renderTasks();
            });
        });

        taskList.appendChild(taskElement);
    });

    updateCounter();
}

function startEditing(task, taskElement) {
    const textElement = taskElement.querySelector(".task-text");
    const priorityElement = taskElement.querySelector(".priority-label");
    const editButton = taskElement.querySelector(".edit-button");

    const input = document.createElement("input");

    input.type = "text";
    input.className = "edit-input";
    input.value = task.text;

    const prioritySelect = document.createElement("select");

    prioritySelect.className = "edit-priority";

    prioritySelect.innerHTML = `
        <option value="low">🟢 Baixa</option>
        <option value="medium">🟡 Média</option>
        <option value="high">🔴 Alta</option>
    `;

    prioritySelect.value = task.priority || "medium";

    textElement.replaceWith(input);
    priorityElement.replaceWith(prioritySelect);

    editButton.textContent = "✓";
    editButton.classList.add("save-button");
    editButton.title = "Salvar tarefa";

    input.focus();
    input.select();

    function saveEdit() {
        const newText = input.value.trim();

        if (newText === "") {
            input.value = task.text;
            return;
        }

        task.text = newText;
        task.priority = prioritySelect.value;

        saveTasks();
        renderTasks();
    }

    editButton.onclick = saveEdit;

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            saveEdit();
        }

        if (event.key === "Escape") {
            renderTasks();
        }
    });
}

function updateCounter() {
    const pendingTasks = tasks.filter(task => !task.completed).length;

    if (pendingTasks === 0) {
        taskCounter.textContent = "Nenhuma tarefa pendente";
    } else if (pendingTasks === 1) {
        taskCounter.textContent = "1 tarefa pendente";
    } else {
        taskCounter.textContent = `${pendingTasks} tarefas pendentes`;
    }
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderTasks();
    });
});

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();