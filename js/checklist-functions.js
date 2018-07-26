const checklistsEl = document.querySelector("#checklists");

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

// generate checklist items
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
