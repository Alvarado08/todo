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
        this.todos = [];
    }
    add = () => {
        let todo = {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
        }
        this.todos.push(todo);
    }
    getTodos = () => {
        return this.todos;
    }
}
let myTodos = new Todo(uuid,'hello','A little description!','NOW!',true);
myTodos.add();
console.log(myTodos.getTodos());