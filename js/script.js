// SELEÇÃO DE ELEMENTOS

const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const themeBeach = document.querySelector("#beachBtn")
const themeHack = document.querySelector("#hackerBtn")
const themeWild = document.querySelector("#wildBtn")
const themeFocus = document.querySelector("#focusBtn")
const body = document.querySelectorAll("body")



let oldInputValue;


// FUNÇÕES
const saveTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)

    todoInput.value = "";
    todoInput.focus();
}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text


        }
    })

}

// EVENTOS

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value

    if (inputValue) {
        // save todo
        saveTodo(inputValue)
    }

})


document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done")
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove()
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})

themeBeach.addEventListener("click",(e) =>{
    e.preventDefault();
    console.log("praia")
    document.body.style.backgroundImage="url(img/beach.gif)"
})

themeHack.addEventListener("click",(e)=> {
    e.preventDefault();
    console.log("hack")
    document.body.style.backgroundImage="url(img/hacker.gif)"
})

themeWild.addEventListener("click",(e)=>{
    e.preventDefault();
    document.body.style.backgroundImage="url(img/paisagem.gif)"
})

themeFocus.addEventListener("click",(e)=>{
    e.preventDefault()
    document.body.style.backgroundImage="none"
})




cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        // atualizar
        updateTodo(editInputValue)
    }

    toggleForms()
})

// FILTRAR LISTAS


const filterSelect = document.getElementById("filter-select");

function onChange() {

    // capturei os valores dos filtros
    const valueFilter = filterSelect.value;
    const textFilter = filterSelect.options[filterSelect.selectedIndex].text;

    const todoClass = document.querySelectorAll(".todo")



    if (valueFilter == "all") {

        todoClass.forEach((item) => {
            const itemList = item
            itemList.style.display = "flex"  
        
        })

    }

    if (valueFilter == "done") {

        todoClass.forEach((item) => {
            const itemList = item
            itemList.classList.contains("done")?itemList.style.display = "flex" : itemList.style.display = "none";
             
        })
    }

    if (valueFilter == "todo") {
      
        todoClass.forEach((item) => {
            const itemList = item
            !itemList.classList.contains("done")? itemList.style.display = "flex" : itemList.style.display = "none" ;  
         
        })
    }
}

filterSelect.onchange = onChange;
onChange();