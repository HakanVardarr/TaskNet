document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

document.getElementById("clearCompletedButton").addEventListener("click", () => {
    const taskList = document.getElementById("taskList").getElementsByTagName("li");
    const tasksToRemove = [];

    // Loop through the task list and identify completed tasks
    for (let i = 0; i < taskList.length; i++) {
        const listItem = taskList[i];
        if (listItem.classList.contains("completed")) {
            tasksToRemove.push(listItem);  // Store tasks to remove
        }
    }

    // If there are completed tasks, remove them
    if (tasksToRemove.length > 0) {
        tasksToRemove.forEach(item => {
            item.parentNode.removeChild(item);  // Remove the task from the list
        });
        saveTasks();  // Update LocalStorage after removal
    }
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDescription = taskInput.value.trim();

    if (taskDescription !== "") {
        const taskList = document.getElementById("taskList");
        const listItem = document.createElement("li");

        // Create the checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");

        // Add event listener to toggle task completion
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                listItem.classList.add("completed");
            } else {
                listItem.classList.remove("completed");
            }
            saveTasks(); // Save tasks after completing or uncompleting a task
        });

        // Add task description text
        const taskText = document.createElement("span");
        taskText.textContent = taskDescription;

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        // Add event listener to delete task
        deleteButton.addEventListener("click", function() {
            taskList.removeChild(listItem);
            saveTasks(); // Save after deleting
        });

        // Append checkbox, task description, and delete button to the list item
        listItem.appendChild(taskText);
        listItem.appendChild(checkbox);
        listItem.appendChild(deleteButton);

        // Add the list item to the task list
        taskList.appendChild(listItem);

        // Save task to LocalStorage
        saveTasks();

        // Clear input field after adding task
        taskInput.value = "";
    } else {
        alert("Please enter a task description!");
    }
}

function saveTasks() {
    const taskList = document.getElementById("taskList").getElementsByTagName("li");
    const tasks = [];
    
    for (let i = 0; i < taskList.length; i++) {
        const listItem = taskList[i];
        const task = {
            description: listItem.querySelector("span").textContent,
            completed: listItem.classList.contains("completed")
        };
        tasks.push(task);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        const listItem = document.createElement("li");

        // Create the checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = task.completed; // Ensure checkbox reflects completed state

        // Add event listener to toggle task completion
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                listItem.classList.add("completed");
            } else {
                listItem.classList.remove("completed");
            }
            saveTasks(); // Save tasks after completing or uncompleting a task
        });

        // Add task description text
        const taskText = document.createElement("span");
        taskText.textContent = task.description;

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(listItem);
            saveTasks();
        });
        deleteButton.classList.add("delete-button");

        // Append checkbox, task description, and delete button to the list item
        listItem.appendChild(taskText);
        listItem.appendChild(checkbox);
        listItem.appendChild(deleteButton);

        // If the task is completed, add the completed class
        if (task.completed) {
            listItem.classList.add("completed");
        }

        // Add the list item to the task list
        taskList.appendChild(listItem);
    });
}

// Load tasks when the page is loaded
document.addEventListener("DOMContentLoaded", loadTasks);
