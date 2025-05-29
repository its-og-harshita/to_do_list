// JavaScript code for the To-Do List website

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    const modal = document.getElementById('infoModal');
    const closeButton = document.querySelector('.close-button');


    // Load tasks from local storage
    loadTasks();

    // Add task event
    addTaskButton.addEventListener('click', () => {
        const taskValue = taskInput.value.trim();

        if (taskValue !== '') {
            const li = document.createElement('li');

            // Create task text
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = taskValue;

            // Create task date
            const taskDate = document.createElement('span');
            taskDate.className = 'task-date';
            const currentDate = new Date();
            taskDate.textContent = `Added on: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

            // Create complete button
            const completeButton = document.createElement('button');
            completeButton.className = 'complete-button';
            completeButton.textContent = '✔';
            completeButton.addEventListener('click', () => {
                taskText.classList.toggle('completed');
                completeButton.classList.toggle('completed-button');
            });

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = '✖';
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(li);
            });

            li.appendChild(taskText);
            li.appendChild(taskDate);
            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);

            taskInput.value = ''; // Clear the input field
        }
    });

    // Function to add a task
    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        // Create a complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        taskItem.appendChild(completeButton);
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);
        saveTasks();
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll('li');
        taskItems.forEach(item => {
            tasks.push({
                text: item.firstChild.textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                taskList.removeChild(taskItem);
                saveTasks();
            });

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => {
                taskItem.classList.toggle('completed');
                saveTasks();
            });

            taskItem.appendChild(completeButton);
            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
        });
    }
});