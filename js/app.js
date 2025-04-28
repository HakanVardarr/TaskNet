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
        listItem.textContent = taskDescription;
        taskList.appendChild(listItem);

        // Clear input after adding task
        taskInput.value = "";
    } else {
        alert("Please enter a task description!");
    }
}
