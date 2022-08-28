// SELEÇÃO DE ELEMENTOS

const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")


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

    const todoClass = document.querySelectorAll("#todo-list > *")

    console.log(valueFilter, textFilter);



    if (valueFilter == "all") {
        // exibe todos
        // remove todas as classes hide

        todoClass.forEach((item) => {
            const itemList = item
            console.log(itemList)
        
            if(itemList.classList.contains("hide")){
                itemList.classList.remove("hide")
                itemList.classList.add("todo")
                
            }
             
        })

    }

    if (valueFilter == "done") {
        // se nao tem a classe done, fica "hide"
        //so mostra os done..
        //done? exibe : coloca classe hide
        
        todoClass.forEach((item) => {
            const itemList = item
            console.log(itemList)
        
            if(itemList.classList.contains("done")){
                itemList.classList.remove("hide")
                itemList.classList.add("todo")
               
            } else {
                itemList.classList.add("hide")
                itemList.classList.remove("todo")
            }
             
        })

    }
    if (valueFilter == "todo") {
        // exibe todos que nao tem a classe Done
        // se tiver classe done fica "hide"
        //hide em todos que tem a classe done <<
        todoClass.forEach((item) => {
            const itemList = item
            console.log(itemList)

            if(itemList.classList.contains("done")){
                itemList.classList.add("hide")
                itemList.classList.remove("todo")
                itemList.classList.remove('done')
            }
         

        })


    }
}

filterSelect.onchange = onChange;
onChange();