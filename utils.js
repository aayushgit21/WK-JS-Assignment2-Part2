let lastId = 0;
function getUniqueId() {
  lastId += 1;
  return lastId.toString();
}

function RenderTheDomBasedOnList(renderDiv, object) {
  console.log("parent id is", object.id);
  console.log("Print the object : ", object.children);
  for (let obj of object.children) {
    let createdDiv;
    if (obj.type === "File") {
      console.log("It's File");
      createdDiv = addNodeToContainer(obj.type, obj.name, object.id, obj.id);
    } else if (obj.type === "Folder") {
      console.log("It's Folder");
      createdDiv = addNodeToContainer(obj.type, obj.name, object.id, obj.id);
    }

    // Append the newly created div to the renderDiv
    renderDiv.appendChild(createdDiv);
    if (obj.type === "Folder") {
      const child = document.getElementById(`${obj.id}`);
      RenderTheDomBasedOnList(child, obj);
    }
  }
}

function createNode(type, name, parentId) {
  const id = getUniqueId();
  const newNode = {
    id: id,
    name: name,
    type: type,
    children: type === "Folder" ? [] : null,
  };

  if (parentId) {
    console.log("Trying to find parent with ID:", parentId);
    const parent = findNodeById(FileExplorerStore.getState(), parentId); // Pass the correct folderStructure object
    console.log("Parent found:", parent);

    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(newNode);
    } else {
      console.error("Parent node not found.");
    }
  } else {
    folderStructure.children.push(newNode);
  }
  return id;
}

function findNodeById(root, id) {
  if (root.id === id) {
    return root;
  }

  if (root.children) {
    for (const child of root.children) {
      const found = findNodeById(child, id);
      if (found) {
        return found;
      }
    }
  }
  console.log("parent not found");
  return null;
}

function deleteNode(id) {
  const parent = findParentNode(FileExplorerStore.getState(), id);
  if (parent) {
    const indexToRemove = parent.children.findIndex((child) => child.id === id);
    if (indexToRemove !== -1) {
      parent.children.splice(indexToRemove, 1);
    }
  } else {
    console.error("Parent node not found.");
  }
}

function findParentNode(root, id) {
  if (root.children) {
    for (const child of root.children) {
      if (child.id === id) {
        return root;
      }
      const foundParent = findParentNode(child, id);
      if (foundParent) {
        return foundParent;
      }
    }
  }
}
function isValidString(input) {
  const regex = /^[A-Za-z]{1,10}$/;
  return regex.test(input);
}

function editNode(id, newName) {
  const elementToEdit = findNodeById(FileExplorerStore.getState(), id);
  if (elementToEdit) {
    console.log("Element to edit found:", elementToEdit);
    elementToEdit.name = newName;
    alert("Name Modified");
  } else {
    console.log("Element To Edit Dosen't exist.");
  }
}

let r = 65;
let g = 105;
let b = 225;
function generateRandomColor() {
  r = r + 10;
  g = g + 10;
  b = b - 10;
  return `rgb(${r},${g},${b})`;
}
