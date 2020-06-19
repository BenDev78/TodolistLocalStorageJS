let input         = document.querySelector('#userInput');
const button      = document.querySelector('#enter');
const ul          = document.querySelector('ul');
let todos_object  = {"todos": []};

if(localStorage.getItem('todos')){
    todos_object = JSON.parse(localStorage.getItem('todos'));
    loadElements();
}


function inputLength(){
    return input.value.length;
}

function loadElements(){
    for (let index = 0; index < todos_object["todos"].length; index++) {
        const todo = todos_object["todos"][index];
        createElement(todo);
    }
}

function createElement(todo){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(todo));
    li.className = 'item';

    const btnUpd = document.createElement('button');
    btnUpd.appendChild(document.createTextNode('U'));
    btnUpd.className = 'update';

    const btnDel = document.createElement('button');
    btnDel.appendChild(document.createTextNode('X'));
    btnDel.className = 'delete';
    li.append(btnDel, btnUpd);

    ul.appendChild(li);

    btnDel.addEventListener('click', (e)=>{
        li.style.display = 'none';
        delElementToLocalStorage(todo);


        e.stopPropagation();
    });

    btnUpd.addEventListener('click', (e)=>{
        let update = prompt('Modifiez votre tâche : ');
        li.textContent = update;
        li.append(btnDel, btnUpd);
        updateElementLocalStorage(todo, update);

        e.stopPropagation();
    });

    li.addEventListener('click', ()=>{
        li.classList.toggle('checked');
    });
}

function updateElementLocalStorage(todo, update){
    todos_object["todos"][todos_object["todos"].indexOf(todo)] = update;

    localStorage.setItem('todos', JSON.stringify(todos_object));
}

function addElementToLocalStorage(todo){
    todos_object["todos"].push(todo);

    localStorage.setItem('todos', JSON.stringify(todos_object));
}

function delElementToLocalStorage(todo){
    todos_object["todos"].splice(todos_object["todos"].indexOf(todo), 1);

    localStorage.setItem('todos', JSON.stringify(todos_object));
}

button.addEventListener('click', (e)=>{
    e.preventDefault();

    if (inputLength() > 0){
        const todo = input.value;
        createElement(todo);
        addElementToLocalStorage(todo);
        input.value = '';
    } else {
        alert('Veuillez renseigner une tâche.');
    }
});

