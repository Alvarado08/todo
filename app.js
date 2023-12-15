//TODO 1. make todos of type object
//TODO 2. todo object will have keys: title,description,dueDate,status
//TODO 3. Users should be able to create new projects and choose which project their todos go into
//TODO 4. Separate components. E.g. logic, dom, etc.
//TODO Review: view all projects (card), view all todos in each project (title,duedate.Use colors for priorities), expand todos to see more details, todos crud

//* using import for module files
// import { v4 as uuid } from 'uuid';
// console.log(uuid());
//* browser environment built in API uuid(crypto) without packages
let uuid = crypto.randomUUID(); 
// console.log(uuid);
//* using require for non modules files
// const { v4: uuidv4 } = require('uuid');
// console.log(uuidv4());

const projectManagerContainer = document.getElementById('manager-container');
const newProjectBtn = document.getElementById('new-project-btn');

// Objects
class Todo {
    constructor(id,title,description,dueDate,status){
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
}

class Project {
    constructor(title){
        this.title = title;
        this.todos = [];
    }
    store = (todo) => {
        this.todos.push(todo);
        this.getTodos();
    }
    delete = (index) => {
        this.todos.splice(index,1);
    }
    edit = (index,title = '',description = '',dueDate='',status = '') => {
        if(index >= 0 && index < this.todos.length){
            const todoToUpdate = this.todos[index];
            if(title !== '') this.todos[todoToUpdate].title = title;
            if(description !== '') this.todos[todoToUpdate].description = description;
            if(dueDate !== '') this.todos[todoToUpdate].dueDate = dueDate;
            if(status !== '') this.todos[todoToUpdate].status = status;
        }else{
            console.log('Todo not found!');
        }
    }
    getTodos = () => {
        this.todos.forEach(todo => {
            todoCard(todo,this.title);
        })
        console.log(this.todos);
    }
    countTodos = () => {
        console.log(this.todos.length);
    }
}

class ProjectManager {
    constructor(){
        this.projects = [];
    }
    store = (project) => {
        this.projects.push(project);
        this.getProjects()
    }
    delete = (index) => {
        this.projects.splice(index,1);
    }
    getProjects = () => {
        if (projectManagerContainer.firstChild) {
            projectManagerContainer.firstChild.remove();
        }
        this.projects.forEach(project => {
            projectCard(project);
        })
        console.log(this.projects);
    }
}

// Project Manager Instantiation
let myProjects = new ProjectManager();

// DOM Single Responsibility Functions
// Modals
function projectModal(){
    const dialog = document.createElement('dialog');
    dialog.className = 'p-5 rounded bg-white w-full max-w-sm'
    dialog.innerHTML = `
                <form id="new-project-form" class="space-y-3">
                    <h2 class="font-bold text-2xl">New Project</h2>
                    <div>
                        <label for="title" class="block text-lg font-semibold">Title</label>
                        <input id="title" type="text" class="w-full rounded p-3 border" placeholder="My awesome project title">
                    </div>
                    <div class="flex items-center justify-center gap-2">
                        <button type="submit" class="bg-green-700 rounded py-2 px-4 text-white">Add project</button>
                        <button id="close" class="bg-blue-500 rounded py-2 px-4 text-white">Close</button>
                    </div>
                </form>
            `;
    projectManagerContainer.appendChild(dialog);
    const closeBtn = document.getElementById('close');
    dialog.showModal();
    closeBtn.addEventListener('click', () => {
        dialog.close();
        projectManagerContainer.removeChild(dialog);
    })
    const titleInput = document.getElementById('title');
    const projectForm = document.getElementById('new-project-form');
    projectForm.addEventListener('submit', (e)=>{
        if(titleInput.value.trim() === ''){
            alert('Please fill out all inputs!');
            e.preventDefault();
        }else{
            e.preventDefault();
            dialog.close();
            projectManagerContainer.removeChild(dialog);
            createProject(titleInput);
        }
    })
}

function todoModal(title,container,todoBtnContainer){
    // const addTodoContainer = document.getElementById('addTodoContainer');
    const addTodoBtn = document.createElement('button');
    addTodoBtn.className = 'w-full bg-gray-200/40 text-black/50 border rounded py-3 px-6 duration-300 hover:text-black/80 flex items-center justify-center gap-1';
    addTodoBtn.innerHTML = `
            <span>Add task</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" />
            </svg>
    `
    const dialog = document.createElement('dialog');
    dialog.className = 'p-5 rounded bg-white w-full max-w-sm';
    dialog.innerHTML = `
            <form id="new-todo-form" class="space-y-3">
                <h2 class="font-bold text-2xl">Project: ${title}</h2>
                <h3 class="text-xl font-bold">New Todo</h3>
                <div>
                    <label for="title" class="block text-lg font-semibold">Title</label>
                    <input id="title" type="text" class="w-full rounded p-3 border" placeholder="My awesome todo">
                </div>
                <div>
                    <label for="description" class="block text-lg font-semibold">Description</label>
                    <textarea id="description" class="w-full rounded p-3 border" placeholder="My cool description"></textarea>
                </div>
                <div>
                    <label for="date" class="block text-lg font-semibold">Due Date</label>
                    <input id="date" type="date" class="w-full rounded p-3 border" placeholder="Due date">
                </div>
                <div class="flex items-center justify-center gap-2">
                    <button type="submit" class="bg-green-700 rounded py-2 px-4 text-white">Add todo</button>
                    <button id="close" class="bg-blue-500 rounded py-2 px-4 text-white">Close</button>
                </div>
            </form>
        `;
    todoBtnContainer.appendChild(addTodoBtn);
    let currProject = myProjects.projects.find(item => item.title === title);
    addTodoBtn.addEventListener("click", () => {
        projectManagerContainer.appendChild(dialog);
        dialog.showModal();
        const closeBtn = document.getElementById('close');
        console.log(currProject);
        closeBtn.addEventListener('click', () => {
            dialog.close();
            projectManagerContainer.removeChild(dialog);
        })
        const titleInput = document.getElementById('title');
        const descInput = document.getElementById('description');
        const dateInput = document.getElementById('date');
        const todoForm = document.getElementById('new-todo-form');
        todoForm.addEventListener('submit', (e) => {
            if(titleInput.value.trim() === '' || descInput.value.trim() === '' || dateInput.value.trim() === ''){
                alert('Please fill out all inputs!');
                e.preventDefault();    
            }else{
                e.preventDefault();
                dialog.close();
                projectManagerContainer.removeChild(dialog);
                createTodo(currProject,titleInput.value,descInput.value,dateInput.value);
                //if(container.firstChild)container.firstChild.remove();
                currProject.countTodos();
            }
        })
    })
}

// Cards
function projectCard(project) {
    const projectCard = document.createElement('div');
    let completed = project.todos.filter(item => item.status);
    projectCard.className = 'min-h-fit bg-white rounded shadow p-5';
    projectCard.innerHTML = `
                <h1 class="font-bold text-lg">${project.title}</h1>
                <h3><span class="font-semibold">Todos:</span> ${project.todos.length}</h3>
                <h3 class="${project.todos.length === 0 && 'hidden'}"><span class="font-semibold">Completed:</span> ${completed.length}</h3>
                <div id="addTodoContainer" class="mt-3"></div>
                <div id="todos-container-${project.title}" class="pt-3 space-y-3"></div>
            `
    projectManagerContainer.appendChild(projectCard);
    const todosContainer = document.getElementById(`todos-container-${project.title}`);
    const addTodoContainer = document.getElementById('addTodoContainer');
    todoModal(project.title,todosContainer,addTodoContainer);
}

function todoCard(todo,title) {
    const todosContainer = document.getElementById(`todos-container-${title}`);
    const todoCard = document.createElement('article');
    todoCard.className = `w-full bg-white rounded p-3 shadow ${todo.status ? 'border-green-500' : 'border-red-500'} border-l-2 flex items-center justify-between duration-300`;
    todoCard.innerHTML = `
                <h5 class="hover:cursor-pointer">${todo.title}</h5>
                <div class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash text-red-500" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
                </div>
            `
    todosContainer.appendChild(todoCard);
    todoCard.addEventListener('click', () => {
        todo.status = !todo.status;
        alert(`${todo.status}`)
    })
}

// Object Instances
function createProject(title){
    myProjects.store(new Project(title.value));
}

function createTodo(project,title,desc,dueDate){
    project.store(new Todo(uuid,title,desc,dueDate,false));
}

// Event Listeners
newProjectBtn.addEventListener('click',projectModal);

/*
Console CRUD
let myProjects = new ProjectManager();

let project1 = new Project('CRM');
let project2 = new Project('SPA');

let todo1 = new Todo(uuid,'My Awesome Todo','This is a desc!','2015',true);
let todo2 = new Todo(uuid,'My Cool Todo','This is a desc x2!','2019',true);
let todo3 = new Todo(uuid,'My Cool Todo x 2','This is a desc x3!','2019',false);

myProjects.store(project1);
myProjects.store(project2);
project1.store(todo1);
project2.store(todo2);
project2.store(todo3);

myProjects.getProjects();
project1.getTodos();
project2.getTodos();
*/