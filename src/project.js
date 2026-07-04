const projectList = JSON.parse(localStorage.getItem("projects")) || {}

function createNewProject(name) {
    projectList[name] = {
        data: [],
        id: crypto.randomUUID(),
        name: name
    }
    // projectList[name].data = [] //make empty arrays to add projects
    // projectList.id = crypto.randomUUID()
    // projectList.name = name


    // console.log("project created")
}

//check todo's project already in projectList, if not add it to project list
function ensureProjectExist(todo) {
    if (todo.project in projectList) { //check is project of todo already in the list
        return
    }
    else {
        // console.log("project is not in list")
        createNewProject(todo.project)

        // console.log("new project list", projectList)
    }
}

export function addToProjectList(todo) {
    ensureProjectExist(todo)
    projectList[todo.project].data.push(todo) // add new todo to projectlist(inside the project user gave [todo.project])
    // projectList[todo.project].id = crypto.randomUUID()
    localStorage.setItem("projects", JSON.stringify(projectList))
}

export function getAllProjects() {
    const projects = []
    for (const project in projectList) {
        projects.push(projectList[project])
    }
    // console.log("projects are ", projects)
    return projects
}

export function getAllTodos() {
    const projects = getAllProjects() //give all project name issnide an array
    const todos = []
    for (const project of projects) {
        // console.log("list", project)
        for (const todo of project.data) {
            // console.log("todo", projectList[project].data)
            todos.push(todo)
        }
    }
    // console.log("todo", todos)
    return todos
}

export function test() {
    // console.log("final project list  ",projectList)
    // getAllProjects()
    // getAllTodos()

    // console.log(projectList)

}
