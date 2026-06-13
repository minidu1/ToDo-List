import { addToProjectList } from "./project.js";
export default class Todo {
    constructor({ title, description, dueDate, priority = "low", project = "common" }) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

// export const todoList = []

function createTodo(title,description,dueDate,priority,project) {
    const todoItem = new Todo({
        title,
        description,
        dueDate,
        priority,
        project
    })
    return todoItem //return obj to getInput
}

function getInputs(){

    const title = "title"
    const description =  "description"
    const dueDate =  "date"
    const priority = "priority"
    let project 

    const newTodo = createTodo(title,description,dueDate,priority, project) //get obj
    return newTodo // return obj to do to addTodo
}

function addTodoToList(){
    const newTodo = getInputs() //need a returned obj
    todoList.push(newTodo)
}

function addTodoToAProject(){
    const newTodo = getInputs() //need a returned obj
    addToProjectList(newTodo)
}

export function test() {
    // addTodoToList()
    // console.log(todoList)

    addTodoToAProject()
}