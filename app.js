//--------------------------------------------------------------------------
const windowBtn = document.querySelector(".modal");
const body = document.querySelector("body");
const noWind = document.querySelector(".modal-body");
const openBtnIn = 64;
const signIn = document.querySelector(".modal-content_in");

let logIn = (openBtnIn.onclick = () => {
  signIn.classList.add("open-log");
  windowBtn.classList.add("modal-open");
  body.classList.add("scroll");
});

let closeBtn = () => {
  windowBtn.classList.remove("modal-open");
  body.classList.remove("scroll");
};

window.onclick = (e) => {
  if (e.target == noWind) {
    windowBtn.classList.remove("modal-open");
    body.classList.remove("scroll");
  }
};

let h1 = document.querySelector(".dateInToday");
setInterval(
  () =>
    (h1.innerHTML = `<span>${new Date().toDateString()}</span> <span>${new Date().toLocaleTimeString()}</span>`),
  1000
);

let table = document.querySelector("table");
let todoHeads = ["ID", "Text", "Button"];
let theads = document.createElement("thead");
let tr = document.createElement("tr");
todoHeads.forEach((todoElement) => {
  let textTheads = document.createElement("th");
  textTheads.innerText = todoElement;
  tr.appendChild(textTheads);
});
theads.appendChild(tr);
table.appendChild(theads);

let todo = [
  { id: 1, text: "welcome to App TODO" },
  { id: 2, text: "Сделать уборку" },
  { id: 3, text: "Отвести братика в садик" },
  { id: 4, text: "Сходить на дополнительные уроки" },
  { id: 5, text: "Сделать уроки" },
  { id: 6, text: "Заниматься спортом" },
  { id: 7, text: "Сходит в магазин" },
];
let tbody = document.createElement("tbody");

function counterForBtnAdd(array) {
  return array.length === 0
    ? 1
    : Math.max(...array.map((element) => element.id)) + 1;
}

let formAdd = document.querySelector(".add");
formAdd.onsubmit = (event) => {
  event.preventDefault();
  let obj = {
    id: counterForBtnAdd(todo),
    text: event.target["inpAdd"].value,
  };
  todo.push(obj);
  formAdd.reset();
  get();
};

let remove = document.querySelector(".remove");
remove.onclick = () => {
  todo = [...new Set(todo.map((e) => e.text))]
    .map((e) => [
      ["id", todo.find((a) => a.text == e)["id"]],
      ["text", e],
    ])
    .map((e) => Object.fromEntries(e));
  get();
};

let sort = document.querySelector(".sort");
sort.onclick = () => {
  todo = todo.sort((a, b) => a.text.localeCompare(b.text));
  get();
};

let form2 = document.querySelector(".form2");

function editText(event) {
  let { id } = event.target;
  let obj = todo.find((a) => a.id == id);
  form2["text"].value = obj.text;
  logIn();
  form2.onsubmit = (event) => {
    event.preventDefault();
    let obj2 = {
      text: event.target["text"].value,
    };
    Object.assign(obj, obj2);
    form2.reset();
    closeBtn();
    get();
  };
}

function deletText(event) {
  const { id } = event.target;
  todo = todo.filter((elem) => elem.id != id);
  get();
}

function get() {
  tbody.innerHTML = "";
  todo.forEach((elem) => {
    let tr = document.createElement("tr");
    let id = document.createElement("td");
    id.innerText = elem.id;
    let text = document.createElement("td");
    text.innerHTML = `<p id="a${elem.id}">${elem.text}</p>`;
    let btns = document.createElement("td");
    btns.classList.add("btns");
    let delet = document.createElement("button");
    delet.innerText = "Delete";
    delet.classList.add("delet");
    delet.id = elem.id;
    delet.onclick = deletText;
    let edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.classList.add("edit");
    let cap = document.createElement("button");
    cap.innerText = "Cap";
    cap.classList.add("cap");
    cap.onclick = () =>
      document.querySelector(`#a${elem.id}`).classList.toggle("capilot");
    cap.id = elem.id;
    edit.id = elem.id;
    edit.onclick = editText;
    btns.appendChild(delet);
    btns.appendChild(edit);
    btns.appendChild(cap);
    tr.appendChild(id);
    tr.appendChild(text);
    tr.appendChild(btns);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

get();
