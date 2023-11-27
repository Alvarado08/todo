//TODO 1. make todos of type object
//TODO 2. todo object will have keys: title,description,dueDate,priority
//TODO 3. Users should be able to create new projects and choose which project their todos go into
//TODO 4. Separate components. E.g. logic, dom, etc.
//TODO Review: view all projects (card), view all todos in each project (title,duedate.Use colors for priorities), expand todos to see more details, todos crud

//* using import for module files
// import { v4 as uuid } from 'uuid';
// console.log(uuid());
//* browser enviornment built in uuid without packages
let uuid = crypto.randomUUID(); 
// console.log(uuid);
//* using require for non modules files
// const { v4: uuidv4 } = require('uuid');
// console.log(uuidv4());

const projectManagerContainer = document.getElementById('manager-container');

class Todo {
    constructor(id,title,description,dueDate,status){
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
    // store = () => {
    //     let todo = {
    //         id: this.id,
    //         title: this.title,
    //         description: this.description,
    //         dueDate: this.dueDate,
    //         status: this.status,
    //     }
    //     this.todos.push(todo);
    // }
    // delete = (index) => {
    //     this.todos.splice(index,1);
    // }
    // edit = (index,title = '',description = '',dueDate='',status = '') => {
    //     if(index >= 0 && index < this.todos.length){
    //         if(title !== '') this.todos[index].title = title;
    //         if(description !== '') this.todos[index].description = description;
    //         if(dueDate !== '') this.todos[index].dueDate = dueDate;
    //         if(status !== '') this.todos[index].status = status;
    //     }
    // }
    // getTodos = () => {
    //     return this.todos;
    // }
}

class Project {
    constructor(title){
        this.title = title;
        this.todos = [];
    }
    store = (todo) => {
        this.todos.push(todo);
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
        const todosContainer = document.querySelectorAll(`.todos-container-${this.title}`);
        todosContainer.forEach(todoContainer => {
            this.todos.forEach(todo => {
                const todoCard = document.createElement('article');
                todoCard.className = `w-full bg-white rounded p-3 shadow ${todo.status ? 'border-green-500' : 'border-red-500'} border-l-2`;
                todoCard.innerHTML = `
                    <h5>${todo.title}</h5>
                `
                todoContainer.appendChild(todoCard);
            })
        })
        console.log(this.todos);
    }
}

class ProjectManager {
    constructor(){
        this.projects = [];
    }
    store = (project) => {
        this.projects.push(project);
    }
    delete = (index) => {
        this.projects.splice(index,1);
    }
    getProjects = () => {
        this.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'bg-white rounded shadow p-5';
            projectCard.innerHTML = `
                <h1 class="font-bold text-lg">${project.title}</h1>
                <h3><span class="font-semibold">Todos:</span> ${project.todos.length}</h3>
                <div class="todos-container-${project.title} pt-3 space-y-3"></div>
            `
            projectManagerContainer.appendChild(projectCard);
        })
        console.log(this.projects);
    }
}

let myProjects = new ProjectManager();

let project1 = new Project('CRM');
let project2 = new Project('SPA');

let todo1 = new Todo(uuid,'My Awesome Todo','This is a desc!','2015',true);
let todo2 = new Todo(uuid,'My Cool Todo','This is a desc x2!','2019',false);
let todo3 = new Todo(uuid,'My Cool Todo x 2','This is a desc x3!','2019',false);

myProjects.store(project1);
myProjects.store(project2);
project1.store(todo1);
project2.store(todo2);
project2.store(todo3);

myProjects.getProjects();
project1.getTodos();
project2.getTodos();