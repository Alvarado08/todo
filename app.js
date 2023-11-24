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

class Todo {
    constructor(id,title,description,dueDate,priority){
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    // store = () => {
    //     let todo = {
    //         id: this.id,
    //         title: this.title,
    //         description: this.description,
    //         dueDate: this.dueDate,
    //         priority: this.priority,
    //     }
    //     this.todos.push(todo);
    // }
    // delete = (index) => {
    //     this.todos.splice(index,1);
    // }
    // edit = (index,title = '',description = '',dueDate='',priority = '') => {
    //     if(index >= 0 && index < this.todos.length){
    //         if(title !== '') this.todos[index].title = title;
    //         if(description !== '') this.todos[index].description = description;
    //         if(dueDate !== '') this.todos[index].dueDate = dueDate;
    //         if(priority !== '') this.todos[index].priority = priority;
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
    edit = (index,title = '',description = '',dueDate='',priority = '') => {
        if(index >= 0 && index < this.todos.length){
            const todoToUpdate = this.todos[index];
            if(title !== '') this.todos[todoToUpdate].title = title;
            if(description !== '') this.todos[todoToUpdate].description = description;
            if(dueDate !== '') this.todos[todoToUpdate].dueDate = dueDate;
            if(priority !== '') this.todos[todoToUpdate].priority = priority;
        }else{
            console.log('Todo not found!');
        }
    }
    getTodos = () => {
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
        console.log(this.projects);
    }
}

let myProjects = new ProjectManager();

let project1 = new Project('CRM');
let project2 = new Project('SPA');

let todo1 = new Todo(uuid,'My Awesome Todo','This is a desc!','2015',true);
let todo2 = new Todo(uuid,'My Cool Todo','This is a desc x2!','2019',false);

myProjects.store(project1);
myProjects.store(project2);
project1.store(todo1);
project2.store(todo2);

myProjects.getProjects();
project1.getTodos();
project2.getTodos();