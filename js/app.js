/**
 * Event listener for DOMContentLoaded. Loads tasks and applies dark mode from localStorage.
 */
document.addEventListener("DOMContentLoaded", () => {
    loadTasks(); // Load saved tasks from localStorage
    applyDarkModeFromStorage(); // Apply the saved dark mode preference
    
    // Event listeners for various interactions
    document.getElementById("addTaskButton").addEventListener("click", addTask); // Add task button click
    document.getElementById("taskInput").addEventListener("keydown", (event) => {
        if (event.key === "Enter") { // Add task when Enter key is pressed
            addTask();
        }
    });
    document.getElementById("clearCompletedButton").addEventListener("click", clearCompletedTasks); // Clear completed tasks
    document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode); // Toggle dark mode
});

/**
 * Adds a new task to the task list.
 * @function
 */
function addTask() {
    const taskDescription = document.getElementById("taskInput").value.trim(); // Get input task description
    if (taskDescription !== "") { // Ensure description is not empty
        const taskList = document.getElementById("taskList");
        const listItem = createTaskItem(taskDescription); // Create a new task item
        taskList.appendChild(listItem); // Append task item to the task list
        saveTasks(); // Save tasks to localStorage
        document.getElementById("taskInput").value = ""; // Clear input field
    } else {
        alert("Please enter a task description!"); // Alert if input is empty
    }
}

/**
 * Creates a new task item element.
 * @param {string} description - The description of the task.
 * @param {boolean} [completed=false] - Whether the task is completed.
 * @returns {HTMLLIElement} The created task list item.
 */
function createTaskItem(description, completed = false) {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"; // Create a checkbox for the task
    checkbox.classList.add("task-checkbox");
    checkbox.checked = completed; // Set checkbox state based on the completed flag
    checkbox.addEventListener("change", () => toggleTaskCompletion(listItem, checkbox)); // Add change listener for completion

    const taskText = document.createElement("span");
    taskText.textContent = description; // Set the task description

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete"; // Create a delete button
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => deleteTask(listItem)); // Add listener for task deletion

    listItem.appendChild(taskText);
    listItem.appendChild(checkbox);
    listItem.appendChild(deleteButton);

    if (completed) {
        listItem.classList.add("completed"); // Add completed class if the task is marked as completed
    }

    // Apply dark mode styles if the body class contains 'dark-mode'
    if (document.body.classList.contains("dark-mode")) {
        listItem.classList.add("dark-mode");
    }

    return listItem;
}

/**
 * Toggles the completion state of a task.
 * @param {HTMLLIElement} listItem - The task list item.
 * @param {HTMLInputElement} checkbox - The checkbox element for the task.
 */
function toggleTaskCompletion(listItem, checkbox) {
    if (checkbox.checked) {
        listItem.classList.add("completed"); // Mark task as completed
    } else {
        listItem.classList.remove("completed"); // Remove completed mark
    }
    saveTasks(); // Save tasks to localStorage
}

/**
 * Deletes a task from the list.
 * @param {HTMLLIElement} listItem - The task list item to delete.
 */
function deleteTask(listItem) {
    document.getElementById("taskList").removeChild(listItem); // Remove the task list item
    saveTasks(); // Save updated tasks to localStorage
}

/**
 * Clears all completed tasks from the task list.
 */
function clearCompletedTasks() {
    const taskList = document.getElementById("taskList");
    const completedTasks = Array.from(taskList.getElementsByTagName("li"))
                                 .filter(item => item.classList.contains("completed"));
    
    completedTasks.forEach(task => taskList.removeChild(task)); // Remove each completed task
    saveTasks(); // Save tasks to localStorage
}

/**
 * Saves the current tasks to localStorage.
 */
function saveTasks() {
    const tasks = Array.from(document.getElementById("taskList").getElementsByTagName("li"))
                       .map(item => ({
                           description: item.querySelector("span").textContent,
                           completed: item.classList.contains("completed")
                       }));
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks as JSON in localStorage
}

/**
 * Loads the tasks from localStorage and adds them to the task list.
 */
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve saved tasks from localStorage
    tasks.forEach(task => {
        const listItem = createTaskItem(task.description, task.completed); // Create task item for each saved task
        document.getElementById("taskList").appendChild(listItem); // Append to the task list
    });
}

/**
 * Toggles the dark mode on and off.
 */
function toggleDarkMode() {
    const isDarkMode = localStorage.getItem("darkMode") === "true"; // Check if dark mode is enabled
    const button = document.getElementById("darkModeToggle");

    // Toggle the icon based on dark mode state
    button.innerHTML = isDarkMode ? '🌙' : '🌞';

    document.body.classList.toggle("dark-mode"); // Toggle dark mode on the body
    document.querySelector("header").classList.toggle("dark-mode"); // Toggle dark mode on the header
    
    const taskItems = document.querySelectorAll(".task-list li");
    taskItems.forEach(item => item.classList.toggle("dark-mode")); // Toggle dark mode on task items

    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode")); // Save dark mode preference
}

/**
 * Applies dark mode based on the stored preference from localStorage.
 */
function applyDarkModeFromStorage() {
    const isDarkMode = localStorage.getItem("darkMode") === "true"; // Retrieve dark mode preference from localStorage
    if (isDarkMode) {
        document.body.classList.add("dark-mode"); // Apply dark mode to body
        document.querySelector("header").classList.add("dark-mode"); // Apply dark mode to header
        const taskItems = document.querySelectorAll(".task-list li");
        taskItems.forEach(item => item.classList.add("dark-mode")); // Apply dark mode to task items
    }
}

/**
 * Sets up dark mode on page load based on the stored preference.
 */
document.addEventListener("DOMContentLoaded", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"; // Retrieve dark mode state
    if (isDarkMode) {
        document.body.classList.add("dark-mode"); // Apply dark mode to body
    }

    // Update the button icon based on dark mode state
    const button = document.getElementById("darkModeToggle");
    button.innerHTML = isDarkMode ? '🌞' : '🌙'; // Switch between sun and moon icon
});
