let checklists = getChecklists();

populateList(checklists);

// create new checklist button
document.querySelector("#create-checklist").addEventListener("click", () => {
  // create new ids and timestamps
  const id = uuidv4();
  const timestamp = moment().valueOf();

  checklists.push({
    id,
    title: "",
    tasks: [],
    createdAt: timestamp,
    updatedAt: timestamp
  });

  saveChecklists(checklists);

  // provide checklist id
  location.assign(`/edit.html#${id}`);
});
