document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const dateInput = document.querySelector("#davaToday");
    const list_el = document.querySelector("#tasks");
    const todayTasksCountElement = document.querySelector('.number-tasks1');
    const futureTasksCountElement = document.querySelector('.number-tasks2');
    const completedTasksCountElement = document.querySelector('.number-tasks4');
    const taskCountElement = document.getElementById('task-count');
    const newTasksMessage = document.querySelector('.new-tasks');
    let completedTasks = [];

    let todayTasksCount = 0;
    let futureTasksCount = 0;
    let completedTasksCount = 0;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        const date = new Date(dateInput.value);
        const currentDate = new Date();

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task + " - " + date.toLocaleDateString();
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        const task_completed_el = document.createElement('button');
        task_completed_el.classList.add('completed');
        task_completed_el.innerText = 'Completed';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        task_actions_el.appendChild(task_completed_el);

        task_el.appendChild(task_actions_el);

        if (date.toDateString() === currentDate.toDateString()) {
            list_el.appendChild(task_el);
            todayTasksCount++;
            todayTasksCountElement.innerText = todayTasksCount;
        } else if (date > currentDate) {
            list_el.appendChild(task_el);
            futureTasksCount++;
            futureTasksCountElement.innerText = futureTasksCount;
        }

        input.value = '';
        dateInput.value = '';

        updateTaskCount();

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);
            if (!task_el.classList.contains('completed')) {
                if (date.toDateString() === currentDate.toDateString()) {
                    todayTasksCount--;
                    todayTasksCountElement.innerText = todayTasksCount;
                } else if (date > currentDate) {
                    futureTasksCount--;
                    futureTasksCountElement.innerText = futureTasksCount;
                }
                updateTaskCount();
            } else {
                completedTasksCount--;
                completedTasksCountElement.innerText = completedTasksCount;
                updateCompletedTaskCount();
            }
        });

        task_completed_el.addEventListener('click', (e) => {
            const completedTask = task_input_el.value;
            completedTasks.push(completedTask);
            localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

            task_input_el.style.textDecoration = "line-through"; 
            task_el.classList.add('completed');

            completedTasksCount++;
            completedTasksCountElement.innerText = completedTasksCount;

            if (date.toDateString() === currentDate.toDateString()) {
                todayTasksCount--;
                todayTasksCountElement.innerText = todayTasksCount;
            } else if (date > currentDate) {
                futureTasksCount--;
                futureTasksCountElement.innerText = futureTasksCount;
            }

            updateTaskCount();
            updateCompletedTaskCount();
            updateNewTasksMessage();
        });
    });

    function updateTaskCount() {
        taskCountElement.innerText = list_el.querySelectorAll('.task').length;
    }

    function updateCompletedTaskCount() {
        const completedTaskElements = document.querySelectorAll('.task.completed');
        const completedTaskCount = completedTaskElements.length;
        document.querySelector('.number-tasks4').innerText = completedTaskCount;
    }

    function updateNewTasksMessage() {
        const totalNewTasksCount = todayTasksCount + futureTasksCount;
        newTasksMessage.innerHTML = `You have <span id="task-count">${totalNewTasksCount}</span> new tasks!`;
    }
});
