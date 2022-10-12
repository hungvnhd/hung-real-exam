let itemsnumber = Number(
  window.location.href.replace("http://127.0.0.1:3000/?per_page=", "")
);
let todoItems = document.getElementsByClassName("todo-list")[0];
let remainingTask = document.getElementsByClassName(
  "todo-notifications__content"
)[0];
let createTodoForm = document.getElementById("todo-form__input");
let createTodoInput = document.getElementById("formInput");
let deleteAll = document.getElementsByClassName(
  "todo-notifications__clearbtn"
)[0];
let loading = document.getElementsByClassName("loading")[0];
fetch(`http://127.0.0.1:3000/api/v1/todos?per_page=${itemsnumber}`)
  .then((response) => {
    loading.style.display = "block";
    return response.json();
  })
  .then((data) => {
    loading.style.display = "none";
    data.forEach((e) => {
      let div = document.createElement("div");
      div.classList.add("todo-list__items");
      div.id = "list-item__detele";
      div.innerHTML = `<span>${e.title}</span> <button id="todo-list__detelebtn"><i
      class="fa-solid fa-trash"></i></button>`;

      let count = 0;
      let countTodo = itemsnumber;
      if (e.completed == true) {
        count++;
        countTodo = itemsnumber - count;
        div.style.textDecoration = "line-through";
      }

      todoItems.appendChild(div);
      remainingTask.innerHTML = `You have ${countTodo} pending tasks`;
      // let listItems = document.getElementById("list-item__detele");
      // let deteleItemBtn = document.getElementById("todo-list__detelebtn");
      // console.log(listItems, deteleItemBtn);
    });
  });

const data = {
  userId: Math.floor(Math.random() * 10),
  id: Math.floor(Math.random() * 200 + 200),
  title: createTodoInput.value,
  completed: false,
};

createTodoForm.onsubmit = (e) => {
  const data = {
    userId: Math.floor(Math.random() * 10),
    id: Math.floor(Math.random() * 200 + 200),
    title: createTodoInput.value,
    completed: false,
  };
  e.preventDefault();
  console.log(createTodoInput.value);
  fetch(`http://127.0.0.1:3000/api/v1/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      loading.style.display = "block";
      window.location.href = `http://127.0.0.1:3000/?per_page=${itemsnumber}`;
      return response.json();
    })
    .then((data) => {
      loading.style.display = "none";
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

deleteAll.onclick = () => {
  fetch("http://127.0.0.1:3000/api/v1/todos", {
    method: "DELETE",
  })
    .then((res) => {
      loading.style.display = "block";
      return res.text();
    })
    .then((res) => {
      loading.style.display = "none";
      window.location.href = `http://127.0.0.1:3000/?per_page=${itemsnumber}`;
      console.log(res);
    });
};
