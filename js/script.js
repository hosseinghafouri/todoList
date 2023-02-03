class Todo {

    constructor(title) {
        this.title = title;
        this.completed = false;
    }

}

class ToDoList {

    constructor(todosContainer) {
        this.todosContainer = todosContainer;
        this.todos = JSON.parse(localStorage.getItem("todo")) || [];
        this.addBtn = document.querySelector("#addButton");
        this.clearBtn = document.querySelector("#clearButton");
        this.todoInput = document.querySelector("#itemInput");

        this.render(this.todos);
    }

    render() {

        this.todosContainer.innerHTML = "";

        this.addBtn.addEventListener('click', () => {
            this.addNewToDo(this.todoInput.value);
        });

        this.todoInput.addEventListener('keypress', (event) => {

            if (event.keyCode === 13) {
                this.addNewToDo(this.todoInput.value);
            }

        });

        this.clearBtn.addEventListener('click', () => {
            this.clearTodos();

        });

        this.addTodosToDom();
        this.saveTodosIntoLocalStorage();
    }

    addTodosToDom() {
        this.todosContainer.innerHTML = "";

        this.todos.forEach((todo, todoIndex) => {
            let li = document.createElement('li');
            li.className = 'completed well';

            let todoTitleElem = document.createElement('label');
            todoTitleElem.innerHTML = todo.title;
            todo.completed ? todoTitleElem.classList.add("todo-completed") : null;

            let btnComplete = document.createElement('button'),
                btnRemove = document.createElement('button');

            btnComplete.className = 'btn btn-success';
            btnComplete.innerHTML = 'Complete';
            btnComplete.addEventListener('click', (event) => {
                event.target.previousSibling.classList.toggle("todo-completed");

                todo.completed = !todo.completed;
                this.saveTodosIntoLocalStorage();
                this.addTodosToDom();
            });

            btnRemove.className = 'btn btn-danger';
            btnRemove.innerHTML = 'Remove';
            btnRemove.addEventListener('click', () => {
                this.todosContainer.removeChild(li);

                let mainTodoIndex = this.todos.findIndex((todo, index) => index === todoIndex);
                this.todos.splice(mainTodoIndex, 1);

                this.saveTodosIntoLocalStorage();
                this.addTodosToDom();
            });

            li.append(todoTitleElem, btnComplete, btnRemove);
            this.todosContainer.append(li);
        });

    }

    addNewToDo(newTodoTitle) {
        console.log("=> :", newTodoTitle);

        if (newTodoTitle.trim()) {
            this.todos.push(new Todo(newTodoTitle));
            this.saveTodosIntoLocalStorage();
            this.render();

            this.todoInput.value = '';
            this.todoInput.focus();
        }
    }

    clearTodos() {
        console.log("Todos Clear");

        this.todos = [];
        this.saveTodosIntoLocalStorage();
        this.render();
    }

    saveTodosIntoLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

}

new ToDoList(document.querySelector('#todoList'));