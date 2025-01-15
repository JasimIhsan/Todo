document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");

    taskList.addEventListener("click", function (e) {
        const taskElement = e.target.closest("li");

        if (e.target && e.target.classList.contains("edit")) {
            // Show the edit form
            const editForm = taskElement.querySelector(".edit-form");
            const taskText = taskElement.querySelector(".task-text");
            const editButton = taskElement.querySelector(".edit");
            const deleteButton = taskElement.querySelector(".delete");

            // Hide the task text and the buttons
            taskText.style.display = "none";
            editButton.style.display = "none";
            deleteButton.style.display = "none";

            // Show the edit form
            editForm.style.display = "block";
        }

        if (e.target && e.target.classList.contains("cancel-edit")) {
            // Hide the edit form and restore the task text and buttons
            const editForm = taskElement.querySelector(".edit-form");
            const taskText = taskElement.querySelector(".task-text");
            const editButton = taskElement.querySelector(".edit");
            const deleteButton = taskElement.querySelector(".delete");

            // Restore the task text and show the buttons again
            editForm.style.display = "none";
            taskText.style.display = "block";
            editButton.style.display = "inline-block";
            deleteButton.style.display = "inline-block";
        }

        if (e.target && e.target.classList.contains("save-edit")) {
            const editInput = taskElement.querySelector(".edit-input");
            const newTaskText = editInput.value;
            const taskId = taskElement.getAttribute("data-id");

            if (newTaskText.trim() !== "") {
                axios
                    .put(`http://localhost:5757/edit-task/${taskId}`, { newTask: newTaskText })
                    .then((response) => {
                        if (response.data.success) {
                            taskElement.querySelector(".task-text").textContent = newTaskText;
                            taskElement.querySelector(".task-text").style.display = "block";
                            taskElement.querySelector(".edit-form").style.display = "none";
                            taskElement.querySelector(".edit").style.display = "inline-block";
                            taskElement.querySelector(".delete").style.display = "inline-block";
                        }
                    })
                    .catch((error) => {
                        console.error("Error saving task:", error);
                    });
            }
        }

        if (e.target && e.target.classList.contains("delete")) {
            const taskId = taskElement.getAttribute("data-id");

            axios
                .delete(`http://localhost:5757/delete-task/${taskId}`)
                .then((response) => {
                    if (response.data.success) {
                        // Remove the task element from the DOM
                        taskElement.remove();
                        console.log("Task deleted successfully.");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting task:", error);
                });
        }

        if (e.target && e.target.classList.contains("task-text")) {
            const taskId = taskElement.getAttribute("data-id");
            const isCompleted = taskElement.classList.contains("completed");

            axios
                .put(`http://localhost:5757/toggle-task/${taskId}`, { completed: !isCompleted })
                .then((response) => {
                    if (response.data.success) {
                        taskElement.classList.toggle("completed");
                    }
                })
                .catch((error) => {
                    console.error("Error toggling task completion:", error);
                });
        }
    });
});
