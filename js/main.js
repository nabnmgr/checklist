let checklists = getChecklists();
7;
checklists = lastEdited(checklists);
populateList(checklists);

document.querySelector("#filter-by").addEventListener("change", e => {
  let filterBy = e.target.value;
  if (filterBy === "byCreated") {
    checklists = lastCreated(checklists);
  } else if (filterBy === "alphabetical") {
    checklists = alphabetical(checklists);
  } else if (filterBy === "byEdited") {
    checklists = lastEdited(checklists);
  }
  populateList(checklists);
});

// create new checklist button
document.querySelector("#create-checklist").addEventListener("click", () => {
  // create new ids and timestamps
  const id = uuidv4();
  const timestamp = moment().valueOf();

  checklists.push({
    id,
    title: "",
    items: [],
    createdAt: timestamp,
    updatedAt: timestamp
  });

  saveChecklists(checklists);

  // provide checklist id
  location.assign(`/edit.html#${id}`);
});
