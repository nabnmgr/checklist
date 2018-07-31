const checklistsEl = document.querySelector("#checklists");
const itemListEl = document.querySelector(".items");

// check if checklists exists in localStorage
const getChecklists = function() {
  const checklistsJSON = localStorage.getItem("checklists");

  try {
    return checklistsJSON ? JSON.parse(checklistsJSON) : [];
  } catch (e) {
    return [];
  }
};

// save checklists ot localStorage
const saveChecklists = function(data) {
  localStorage.setItem("checklists", JSON.stringify(data));
};

// remove a checklist
const removeList = id => {
  const listIndex = checklists.findIndex(checklist => checklist.id === id);
  // findIndex method either returns the index of the first element or -1
  if (listIndex > -1) {
    checklists.splice(listIndex, 1);
  }
};

// generate checklists results
const populateList = function(lists) {
  let html = "";

  if (checklists.length === 0) {
    html = emptyMsg();
  } else {
    lists.forEach(list => {
      html += `
      <a href="/edit.html#${list.id}" class="list-item">
        <p class="list-item__title">
          ${list.title.length > 0 ? list.title : "Untitled"}
        </p>
        <p class="list-item__subtitle">${list.id}</p>
      </a>
      `;
    });
  }

  checklistsEl.innerHTML = html;
};

const emptyMsg = function() {
  return '<p class="empty-message">No checklist to show</p>';
};

// add item for a checklist
const addChecklistItem = function(checklist, item) {
  const itemFound = checklist.items.some(listItem => listItem.name === item);
  console.log(itemFound);
  if (!itemFound) {
    checklist.items.push({
      name: item,
      completed: false
    });
    populateItems(checklist.items);
  } else {
    console.log("Item alreaddy here");
  }
};

// generate items within a checklist
const populateItems = function(items) {
  let html = "";
  items.forEach(item => {
    html += `
      <li class="item">
        <p class="item__name">${item.name}</p>
        <a class="item__delete">
          <ion-icon name="trash"></ion-icon>
        </a>
      </li>
    `;
  });
  itemListEl.innerHTML = html;
};
