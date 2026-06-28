const projectList = JSON.parse(localStorage.getItem("projects")) || {}

function createNewProject(name){
    projectList[name] =[] //make empty arrays to add projects
    console.log("project created")
}

//check todo's project already in projectList, if not add it to project list
function ensureProjectExist(todo){
    if(todo.project in projectList){ //check is project of todo already in the list
        // console.log("project is in list")
        // console.log("old project list is", projectList)
    }
    else{
        // console.log("project is not in list")
        createNewProject(todo.project)

        // console.log("new project list", projectList)
    }
}

export function addToProjectList(todo){
    ensureProjectExist(todo)
    projectList[todo.project].push(todo) // add new todo to projectlist(inside the project user gave [todo.project])
    localStorage.setItem("projects", JSON.stringify(projectList))
}

function getAllProjects(){
    const projects  = []
    for (const project in projectList){
        projects.push(project)

        // console.log("projects are ", projectList[project])
    }
    // console.log("projects are ", projects)
    return projects
}

export function getAllTodos(){
    const projects = getAllProjects() //give all project name issnide an array
    const todos = []
    for (const project of projects){
        // console.log(projectList[project])
        for (const todo of projectList[project]){
            // console.log(todo)
            todos.push(todo)
        }
    }
    // console.log(todos)
    return todos
}

export function test(){
    // console.log("final project list  ",projectList)
    // getAllProjects()
    getAllTodos()

}
