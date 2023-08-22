function customMain() {
  const nameSet = FileExplorerStore.getSet();
  // const inputName=document.querySelector("#inputName").value;
  document.addEventListener("click", function (event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("file-button")) {
      let inputName = document.querySelector("#inputName").value;
      const parentDiv = clickedElement.closest(".parentDiv");
      const parentId = parentDiv ? parentDiv.getAttribute("id") : null;
      if (inputName && isValidString(inputName) && !nameSet.has(inputName)) {
        nameSet.add(inputName);
        Dispatcher.dispatch(addNodeToList(inputName, "File", parentId));
        FileExplorerView.render();
        document.querySelector("#inputName").value = "";
      } else {
        alert("Please Enter The Name Correcctly");
      }
    }

    if (clickedElement.classList.contains("folder-button")) {
      //   const folderName = prompt("Enter folder name:");
      let inputName = document.querySelector("#inputName").value;
      const parentDiv = clickedElement.closest(".parentDiv");
      const parentId = parentDiv ? parentDiv.getAttribute("id") : null;
      if (inputName && isValidString(inputName) && !nameSet.has(inputName)) {
        Dispatcher.dispatch(addNodeToList(inputName, "Folder", parentId));
        FileExplorerView.render();
        document.querySelector("#inputName").value = "";
      } else {
        console.error("Please Enter The Name Correcctly");
      }
    }
    if (clickedElement.classList.contains("delete-button")) {
      const ParentToDelete = event.target.closest(".parentDiv");
      const idOfElementToDelete = ParentToDelete.getAttribute("id");
      Dispatcher.dispatch(deleteNodeToList(idOfElementToDelete));
      FileExplorerView.render();
    }
    if (clickedElement.classList.contains("edit-button")) {
      const parentToEdit = event.target.closest(".parentDiv");
      const idOfElementToEdit = parentToEdit.getAttribute("id");
      const editedName = prompt("Please enter a number:");
      if (editedName && isValidString(editedName) && !nameSet.has(editedName)) {
        Dispatcher.dispatch(editNodeFromList(idOfElementToEdit, editedName));
        FileExplorerView.render();
        document.querySelector("#inputName").value = "";
      }
    }
    if (clickedElement.classList.contains("toggle-button")) {
      const parentDiv = clickedElement.closest(".parentDiv");
      const childDivs = parentDiv.querySelectorAll(".parentDiv > div");
      if (clickedElement.classList.contains("fa-chevron-right")) {
        clickedElement.classList.replace("fa-chevron-right", "fa-chevron-down");
        childDivs.forEach((childDiv) => {
          childDiv.style.display = "block";
        });
      } else {
        clickedElement.classList.replace("fa-chevron-down", "fa-chevron-right");
        childDivs.forEach((childDiv) => {
          childDiv.style.display = "none";
        });
      }
    }
  });
}
