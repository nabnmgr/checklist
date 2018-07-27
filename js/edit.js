const titleEl = document.querySelector("#title");
const saveEl = document.querySelector("#edit");
const removeEl = document.querySelector("#remove");

const listId = location.hash.substring(1);
const checklists = getChecklists();
const checklist = checklists.find(checklist => checklist.id === listId);

if (checklist === undefined) {
  location.assign("/index.html");
}

titleEl.value = checklist.title;

saveEl.addEventListener("click", () => {
  checklist.title = titleEl.value;
  checklist.updatedAt = moment().valueOf();
  saveChecklists(checklists);
  location.assign("/index.html");
});

removeEl.addEventListener("click", () => {
  removeList(checklist.id);
  saveChecklists(checklists);
  location.assign("/index.html");
});
