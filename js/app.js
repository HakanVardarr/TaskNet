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

        // Append checkbox and task description to the list item
        listItem.appendChild(taskText);
        listItem.appendChild(checkbox);

        // Add the list item to the task list
        taskList.appendChild(listItem);

        // Clear input field after adding task
        taskInput.value = "";
    } else {
        alert("Please enter a task description!");
    }
}
