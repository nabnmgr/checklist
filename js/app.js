///////////////////////////////
// CHECKLIST CONTROLLER
//////////////////////////////
const checklistController = (function() {
  const checklists = function() {
    const checklistsJSON = localStorage.getItem("checklists");

    try {
      return checklistsJSON ? JSON.parse(checklistsJSON) : [];
    } catch (e) {
      return [];
    }
  };

  let data = checklists();

  return {
    addChecklists: function() {
      // create new ids and timestamps
      const id = uuidv4();
      const timestamp = moment().valueOf();

      data.push({
        id,
        title: "",
        tasks: [],
        createdAt: timestamp,
        updatedAt: timestamp
      });

      // provide checklist id
      location.assign(`/edit.html#${id}`);
    },

    saveChecklist: function(data) {
      localStorage.setItem("checklists", JSON.stringify(data));
    },

    getChecklists: function() {
      return data;
    },

    testing: function() {
      console.log(data);
    }
  };
})();

///////////////////////////////
// UI CONTROLLER
//////////////////////////////
const UIController = (function() {
  const DOMStrings = {
    createBtn: "#create-checklist",
    searchInput: "#search-text",
    filterDropdown: "#filter-by",
    listContainer: "#checklists"
  };

  return {
    populateList: function(lists) {
      let html = "";
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

      document.querySelector(DOMStrings.listContainer).innerHTML = html;
    },

    emptyMsg: function() {
      const message = '<p class="empty-message">No checklist to show</p>';
      document.querySelector(DOMStrings.listContainer).innerHTML = message;
    },

    getDOMStrings: function() {
      return DOMStrings;
    }
  };
})();

///////////////////////////////
// GLOBAL APP CONTROLLER
//////////////////////////////
const controller = (function(listCtrl, UICtrl) {
  const setupEventListeners = function() {
    const DOM = UICtrl.getDOMStrings();

    // create new checklist button
    document.querySelector(DOM.createBtn).addEventListener("click", addList);
  };

  const addList = function() {
    // create empty checklist
    listCtrl.addChecklists();

    // should i just include this in addChecklists() ?
    listCtrl.saveChecklist(listCtrl.getChecklists());
  };

  return {
    init: function() {
      // fetch checklists
      const checklists = listCtrl.getChecklists();
      // show message if empty
      if (checklists.length === 0) {
        UICtrl.emptyMsg();
      } else {
        UICtrl.populateList(checklists);
      }

      setupEventListeners();
    }
  };
})(checklistController, UIController);

controller.init();
