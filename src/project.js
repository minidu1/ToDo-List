const projectList = {}

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
}

export function test() {
    // createNewProject("one")
    // createNewProject("hello")
    console.log("final project list is ",projectList)


    // console.log(project.prj1)
    // console.log(second[0])
}

// let project ={ prj1:[{}, 2], prj2 : []}
// let second = [{p1:[1,2]}, {p2:[]}]

// TestprojectList = {
//     "Default" : [todo1, todo2],
//     "Work" : [todo3]
// }