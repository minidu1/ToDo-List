export default class Todo {
    constructor({ title, description, dueDate, priority = "low" }) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export const todoList = []

function createTodo(title,description,dueDate,priority) {
    const todoItem = new Todo({
        title,
        description,
        dueDate,
        priority
    })
    return todoItem
}

function getInputs(){

    const title = "title"
    const description =  "description"
    const dueDate =  "date"
    const priority = "priority"

    const newTodo = createTodo(title,description,dueDate,priority)
    return newTodo
}

function addTodoToList(){
    const newTodo = getInputs()
    todoList.push(newTodo)
}

export function test() {
    addTodoToList()
    console.log(todoList[0].title)
}