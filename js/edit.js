const titleEl = document.querySelector("#checklist__title");
const saveBtn = document.querySelector("#edit");
const removeBtn = document.querySelector("#remove");
const newItemEl = document.querySelector("#checklist__item");
const addTaskBtn = document.querySelector("#checklist__add");

const itemEl = document.querySelector(".item");
const itemText = document.querySelector(".item__name");
const itemDelete = document.querySelector(".item__delete");

// GET CLICKED CHECKLIST
const listId = location.hash.substring(1);
const checklists = getChecklists();
const checklist = checklists.find(checklist => checklist.id === listId);

if (checklist === undefined) {
  location.assign("/index.html");
}

titleEl.value = checklist.title;

// load containing items
populateItems(checklist.items);

saveBtn.addEventListener("click", () => {
  checklist.title = titleEl.value.trim();
  checklist.updatedAt = moment().valueOf();
  saveChecklists(checklists);
  location.assign("/index.html");
});

// Delete a checklist
removeBtn.addEventListener("click", () => {
  removeList(checklist.id);
  saveChecklists(checklists);
  location.assign("/index.html");
});

// Add Item from input
// TODO:: DISPLAY MSG ON EMPTY OR DUPLICATE ITEM
function addItem() {
  const item = newItemEl.value.trim();
  if (item.length > 0) {
    addChecklistItem(checklist, item);
    checklist.updatedAt = moment().valueOf();
    saveChecklists(checklists);
    newItemEl.value = "";
    newItemEl.focus();
  } else {
    console.log("empty");
  }
}

addTaskBtn.addEventListener("click", addItem);
newItemEl.addEventListener("keypress", e => {
  if (e.keyCode === 13 || e.which === 13) {
    addItem();
  }
});

// clicks on UL to perfom delete and check items
itemListEl.addEventListener("click", e => {
  let itemToRemove, id, itemToChange;
  // Remove Item
  if (e.target && e.target.parentElement.matches(".item__delete")) {
    itemToRemove = e.target.parentElement.parentElement;
    // 15 mins to realise why findIndex was not working
    id = parseInt(itemToRemove.className.split("-")[1]);
    removeItem(checklist, id);
    checklist.updatedAt = moment().valueOf();
    saveChecklists(checklists);
    populateItems(checklist.items);
  }

  // Toggle item completion
  if (e.target && e.target.parentElement.matches(".item")) {
    itemToChange = e.target.parentElement;
    id = parseInt(itemToChange.className.split(" ")[1].split("-")[1]);
    toggleItem(checklist.items, id);
    checklist.updatedAt = moment().valueOf();
    saveChecklists(checklists);
  }
});
