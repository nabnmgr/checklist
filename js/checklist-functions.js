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
  let html = "",
    remainingItems = "";

  if (checklists.length === 0) {
    html = emptyMsg();
  } else {
    lists.forEach(list => {
      // how much items has been completed
      if (list.items.length > 0) {
        const checked = list.items.filter(item => item.completed === true);
        remainingItems = `${checked.length} / ${list.items.length}`;
      } else {
        remainingItems = "No items";
      }

      html += `
      <a href="/edit.html#${list.id}" class="list-item">
        <p class="list-item__title">
          ${list.title.length > 0 ? list.title : "Untitled"}
        </p>
        <p class="list-item__subtitle">
          ${remainingItems}
        </p>
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
  let id;

  const itemFound = checklist.items.some(listItem => listItem.name === item);
  if (!itemFound) {
    // create new ID
    if (checklist.items.length > 0) {
      // set id to last item's value + 1 NOT the length
      id = checklist.items[checklist.items.length - 1].id + 1;
    } else {
      id = 0;
    }

    checklist.items.push({
      id,
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
      <li class="item item-${item.id}${item.completed ? " completed" : ""}">
        <p class="item__name">${item.name}</p>
        <a class="item__delete">
          <ion-icon name="trash"></ion-icon>
        </a>
      </li>
    `;
  });
  itemListEl.innerHTML = html;
};

// remove an item
const removeItem = function(checklist, itemId) {
  const itemIndex = checklist.items.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    checklist.items.splice(itemIndex, 1);
  }
};

// TOGGLE item
const toggleItem = function(items, itemId) {
  const item = items.find(item => item.id === itemId);
  if (item) {
    item.completed = !item.completed;
  }
  // toggle class
  const itemClass = document.querySelector(`li.item-${itemId}`).classList;
  item.completed ? itemClass.add("completed") : itemClass.remove("completed");
};
