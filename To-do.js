document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskk');
    const taskInput = document.getElementById('taskInput');
    const todoList = document.getElementById('todolist');
    const progressList = document.getElementById('progresslist');
    const doneList = document.getElementById('donelist');
 //rendering in the current view point
 //retrieves tasks or returns an empty array if tasks are not stored
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 
    function renderTasks() {//clearing task lists
      todoList.innerHTML = '';
      progressList.innerHTML = '';
      doneList.innerHTML = '';
 
      tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        if (task.status === 'todo') {
          todoList.appendChild(taskElement);
        } else if (task.status === 'progress') {
          progressList.appendChild(taskElement);
        } else if (task.status === 'done') {
          doneList.appendChild(taskElement);
        }
      });
    }
//  adds icons on the columns
    function createTaskElement(task, index) {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task-item');
      taskElement.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-buttons">
          ${task.status !== 'done' ? '<button class="complete-btn" title="Complete"><i class="fas fa-check"></i></button>' : ''}
          ${task.status !== 'done' ? '<button class="edit-btn" title="Edit"><i class="fas fa-edit"></i></button>' : ''}
          <button class="delete-btn" title="Delete"><i class="fas fa-trash"></i></button>
          ${task.status !== 'done' ? '<button class="move-btn" title="Move"><i class="fas fa-arrow-right"></i></button>' : ''}
        </div>
      `;
 
      const completeBtn = taskElement.querySelector('.complete-btn');
      const editBtn = taskElement.querySelector('.edit-btn');
      const deleteBtn = taskElement.querySelector('.delete-btn');
      const moveBtn = taskElement.querySelector('.move-btn');
 
      if (completeBtn) {
        completeBtn.addEventListener('click', () => completeTask(index));
      }
      if (editBtn) {
        editBtn.addEventListener('click', () => editTask(index));
      }
      deleteBtn.addEventListener('click', () => deleteTask(index));
      if (moveBtn) {
        moveBtn.addEventListener('click', () => moveTask(index));
      }
 
      return taskElement;
    }
 
    function addTask(text) {
      tasks.push({ text, status: 'todo' });
      saveTasks();
      renderTasks();
      scrollToNewTask();
    }
 
    function scrollToNewTask() {
      const newTaskElement = todoList.lastElementChild;
      if (newTaskElement) {
        newTaskElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
 
    function editTask(index) {
      const newText = prompt('Edit task:', tasks[index].text);
      if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    }
 
    function deleteTask(index) {
      if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    }
 
    function moveTask(index) {
      const task = tasks[index];
      if (task.status === 'todo') {
        task.status = 'progress';
      } else if (task.status === 'progress') {
        task.status = 'done';
      }
      saveTasks();
      renderTasks();
    }
 
    function completeTask(index) {
      tasks[index].status = 'done';
      saveTasks();
      renderTasks();
    }
 
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = taskInput.value.trim();
      if (text) {
        addTask(text);
        taskInput.value = '';
      }
    });
 
    renderTasks();
});