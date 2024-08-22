document.addEventListener('DOMContentLoaded',function(){
    const taskInput=document.getElementById("taskInput");
    const saveTask=document.getElementById("save");
    const todoList=document.getElementById("todolist");
    const progressList=document.getElementById("progresslist");
    const doneList=document.getElementById("donelist");

    saveTask.addEventListener('click',saveTask);
    function saveTask(){
        const task=taskInput.value.trim();
        if(task){
            const taskElement=createTaskElement(task);
            todoList.appendChild(taskElement);
            taskInput.value='';
        }
    }
    function createTaskElement(text){
        const taskElement=document.createElement('div');
        taskElement.classList.add('task');
        taskElement.textContent=text;
    }

})