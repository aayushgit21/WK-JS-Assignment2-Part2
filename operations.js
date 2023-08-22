function addNodeToContainer(type, name, parentId, id) {
  const newNode = document.createElement("div");
  newNode.setAttribute("id", `${id}`);
  newNode.classList.add("node", "parentDiv", "rootDiv");

  if (type === "Folder") {
    const toggleButton = document.createElement("span");
    toggleButton.classList.add("fas", "fa-chevron-right", "toggle-button");
    toggleButton.style.marginRight = "5px";

    const createIcon = document.createElement("span");
    createIcon.setAttribute("class", "fas fa-folder");
    createIcon.style.marginRight = "10px";

    const labelName = document.createElement("label");
    labelName.setAttribute("class", "labelName");
    labelName.innerHTML = `${name}`;
    labelName.style.marginRight = "10px";

    const createFileButton = document.createElement("span");
    createFileButton.classList.add(
      "file-button",
      `${id}-file-button`,
      "fas",
      "fa-file",
      "hidden-button",
      "buttons"
    );
    createFileButton.style.marginRight = "10px";
    // createFileButton.style.border = "1px solid black";

    const createFolderButton = document.createElement("span");
    createFolderButton.classList.add(
      "folder-button",
      `${id}-folder-button`,
      "fas",
      "fa-folder",
      "hidden-button",
      "buttons"
    );
    createFolderButton.style.marginRight = "10px";
    // createFolderButton.style.border = "1px solid black";

    const createDeleteButton = document.createElement("span");
    createDeleteButton.classList.add(
      "fas",
      "fa-trash",
      "delete-button",
      "buttons"
    );
    createDeleteButton.style.marginRight="10px";

    const createEditButton=document.createElement("span");
    createEditButton.classList.add(
      "fas",
      "fa-pencil-alt",
      "edit-button",
      "buttons"
    )

    newNode.appendChild(toggleButton);
    newNode.appendChild(createIcon);
    newNode.appendChild(labelName);
    newNode.appendChild(createFileButton);
    newNode.appendChild(createFolderButton);
    newNode.appendChild(createDeleteButton);
    newNode.appendChild(createEditButton);
    //   const contentContainer = document.getElementById(`${parentId}`);
    //   contentContainer.appendChild(newNode);
  } else if (type === "File") {
    const createIcon1 = document.createElement("span");
    createIcon1.setAttribute("class", "fas fa-file");
    createIcon1.style.marginRight = "10px";

    const labelName = document.createElement("label");
    labelName.setAttribute("class", "labelName");
    labelName.innerHTML = `${name}`;
    labelName.style.marginRight = "10px";

    const createDeleteButton = document.createElement("span");
    createDeleteButton.classList.add(
      "fas",
      "fa-trash",
      "delete-button",
      "buttons"
    );
    createDeleteButton.style.marginRight="10px";
    const createEditButton=document.createElement("span");
    createEditButton.classList.add(
      "fas",
      "fa-pencil-alt",
      "edit-button",
      "buttons"
    )

    newNode.appendChild(createIcon1);
    newNode.appendChild(labelName);
    newNode.appendChild(createDeleteButton);
    newNode.appendChild(createEditButton);
    //   const contentContainer = document.getElementById(`${parentId}`);
    //   contentContainer.appendChild(newNode);
  }
  return newNode;
}

// function deleteNodeFromContainer(id,parentId){
//     const parentDiv=document.getElementById(parentId);
//     const childDiv=document.getElementById(id);

//     if(parentDiv && childDiv){
//         parentDiv.removeChild(childDiv);
//     }
// }

//   function deleteNodeFromContainer(id) {
//       const elementToRemove = document.getElementById(id);
//       if (elementToRemove) {
//         const parent = elementToRemove.parentNode;
//         parent.removeChild(elementToRemove);
//       }
// }
