const projectList = JSON.parse(localStorage.getItem("projects")) || {}

function createNewProject(name){
    projectList[name] =[] //make empty arrays to add projects
    console.log("project created")
}

//check todo's project already in projectList, if not add it to project list
function ensureProjectExist(todo){
    if(todo.project in projectList){ //check is project of todo already in the list
        console.log("in list")
        console.log("old project list is", projectList)
    }
    else{
        console.log("not in list")
        createNewProject(todo.project)

        console.log("new project list", projectList)
    }
}

export function addToProjectList(todo){
    ensureProjectExist(todo)
    projectList[todo.project].push(todo)
    localStorage.setItem("projects", JSON.stringify(projectList))
}

export function test(){
    console.log("final project list  ",projectList)
}
