task = [ 
    {
        id: 1,
        name: "Tarea 1",
    },
    {
        id: 2,
        name: "Tarea 2",
    },
    {
        id: 3,
        name: "Tarea 3",
    },
]

let checkboxState = {};

const listTask = () => {
    const taskList = document.querySelector(".task-list");
    let html = "";
    task.map((task) => {
        const checked = checkboxState[task.id] ? 'checked' : '';
        html += `
        <div class="form-check">
            <input class="${task.id}" type="checkbox" value="" id="${task.id}" ${checked}>
                <label class="form-check-label" for="${task.id}">
                     ${task.name}-${task.id}
                </label>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">X</button>
        </div>
        
        `;
    });
    taskList.innerHTML = html;
  
    document.querySelectorAll('.form-check input').forEach(el => {
        el.addEventListener('change',()=>{
            updateCounters();
            updateCheckboxState();  
        } );
    });
};
listTask();


const saveTask = () => {
    
    const newTask = document.querySelector("#newTask");
    if(!newTask.value) return alert("Ingrese una tarea");
    
    task.push({
        id: task.length + 1,
        name: newTask.value,
    });
    newTask.value = "";
   
    listTask();
    updateCounters();
}
const updateCounters = () => {
    const total = task.length;
    const realizadas = task.filter(t => document.getElementById(t.id).checked).length;
    const pendientes = total - realizadas;
    document.querySelector('.total-count').innerHTML = `Total: ${total}`;
    document.querySelector('.realizadas-count').textContent = `Realizadas: ${realizadas} | Pendientes: ${pendientes}`;
};

updateCounters()


const updateCheckboxState = () => {
    task.map((t) => {
        checkboxState[t.id] = document.getElementById(t.id).checked;
    });
};

const deleteTask = (taskId) => {
    const index = task.findIndex((t) => t.id === taskId);
    task.splice(index, 1);
    updateCheckboxState();
    updateCounters();
    listTask();
};

