document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const taskDescription = taskInput.value.trim();

    if (taskDescription != "") {
        const taskList = document.getElementById("taskList");
        const listItem = document.createElement("li");

        listItem.textContent = taskDescription;
        taskList.appendChild(listItem);

        taskInput.value = "";
    } else {
        alert("Please enter a task description!")
    }

});