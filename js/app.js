document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    applyDarkModeFromStorage();
    
    // Event listeners
    document.getElementById("addTaskButton").addEventListener("click", addTask);
    document.getElementById("taskInput").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
    document.getElementById("clearCompletedButton").addEventListener("click", clearCompletedTasks);
    document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
});

function addTask() {
    const taskDescription = document.getElementById("taskInput").value.trim();
    if (taskDescription !== "") {
        const taskList = document.getElementById("taskList");
        const listItem = createTaskItem(taskDescription);
        taskList.appendChild(listItem);
        saveTasks();
        document.getElementById("taskInput").value = ""; // Clear input
    } else {
        alert("Please enter a task description!");
    }
}

function createTaskItem(description, completed = false) {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => toggleTaskCompletion(listItem, checkbox));
    
    const taskText = document.createElement("span");
    taskText.textContent = description;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => deleteTask(listItem));
    
    listItem.appendChild(taskText);
    listItem.appendChild(checkbox);
    listItem.appendChild(deleteButton);
    
    if (completed) {
        listItem.classList.add("completed");
    }

    // Apply dark mode styles if needed
    if (document.body.classList.contains("dark-mode")) {
        listItem.classList.add("dark-mode");
    }

    return listItem;
}

function toggleTaskCompletion(listItem, checkbox) {
    if (checkbox.checked) {
        listItem.classList.add("completed");
    } else {
        listItem.classList.remove("completed");
    }
    saveTasks();
}

function deleteTask(listItem) {
    document.getElementById("taskList").removeChild(listItem);
    saveTasks();
}

function clearCompletedTasks() {
    const taskList = document.getElementById("taskList");
    const completedTasks = Array.from(taskList.getElementsByTagName("li"))
                                 .filter(item => item.classList.contains("completed"));
    
    completedTasks.forEach(task => taskList.removeChild(task));
    saveTasks();
}

function saveTasks() {
    const tasks = Array.from(document.getElementById("taskList").getElementsByTagName("li"))
                       .map(item => ({
                           description: item.querySelector("span").textContent,
                           completed: item.classList.contains("completed")
                       }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const listItem = createTaskItem(task.description, task.completed);
        document.getElementById("taskList").appendChild(listItem);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector("header").classList.toggle("dark-mode");
    
    const taskItems = document.querySelectorAll(".task-list li");
    taskItems.forEach(item => item.classList.toggle("dark-mode"));
    
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

function applyDarkModeFromStorage() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
        document.querySelector("header").classList.add("dark-mode");
        const taskItems = document.querySelectorAll(".task-list li");
        taskItems.forEach(item => item.classList.add("dark-mode"));
    }
}
