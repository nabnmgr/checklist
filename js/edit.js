const titleEl = document.querySelector("#checklist__title");
const saveBtn = document.querySelector("#edit");
const removeBtn = document.querySelector("#remove");
const itemEl = document.querySelector("#checklist__item");
const addTaskBtn = document.querySelector("#checklist__add");

const listId = location.hash.substring(1);
const checklists = getChecklists();
const checklist = checklists.find(checklist => checklist.id === listId);

if (checklist === undefined) {
  location.assign("/index.html");
}

titleEl.value = checklist.title;

saveBtn.addEventListener("click", () => {
  checklist.title = titleEl.value;
  checklist.updatedAt = moment().valueOf();
  saveChecklists(checklists);
  location.assign("/index.html");
});

removeBtn.addEventListener("click", () => {
  removeList(checklist.id);
  saveChecklists(checklists);
  location.assign("/index.html");
});

addTaskBtn.addEventListener("click", () => {
  const item = itemEl.value;
  if (item.length > 0) {
    addChecklistItem(checklist, item);
    checklist.updatedAt = moment().valueOf();
    saveChecklists(checklists);
  } else {
    console.log("empty");
  }
});
