document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
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
        });

        // Append checkbox, task description, and delete button to the list item
        listItem.appendChild(taskText);
        listItem.appendChild(checkbox);
        listItem.appendChild(deleteButton);

        // Add the list item to the task list
        taskList.appendChild(listItem);

        // Clear input field after adding task
        taskInput.value = "";
    } else {
        alert("Please enter a task description!");
    }
}
