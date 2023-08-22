//Dipatcher
const Dispatcher = {
  callbacks: [],
  register(callback) {
    this.callbacks.push(callback);
  },
  dispatch(action) {
    this.callbacks.forEach((callback) => callback(action));
  },
};

// Store
const FileExplorerStore = {
  state: {
    id: "root",
    name: "Root",
    type: "Folder",
    children: [],
  },
  localStore: {
    nameSet: new Set(),
  },
  getState() {
    return this.state;
  },
  getSet() {
    return this.localStore.nameSet;
  },
  handleAction(action) {
    if (action.type === "AddNode") {
      createNode(action.nodeType, action.name, action.parentId);
      this.emitChange();
      this.saveStateToLocalStorage();
    } else if (action.type === "DeleteNode") {
      deleteNode(action.id);
      this.emitChange();
      this.saveStateToLocalStorage();
    } else if (action.type === "EditNode") {
      editNode(action.id, action.newName);
      this.emitChange();
      this.saveStateToLocalStorage();
    }
  },
  emitChange() {
    console.log("Store changed:", this.state);
  },
  saveStateToLocalStorage() {
    const serializedState = JSON.stringify(this.state);
    localStorage.setItem("fileExplorerState", serializedState);

    const nameSetArray = Array.from(this.localStore.nameSet);
    const serializedNameSet = JSON.stringify(nameSetArray);
    localStorage.setItem("nameSet", serializedNameSet);
  },
  loadStateFromLocalStorage() {
    const serializedState = localStorage.getItem("fileExplorerState");
    const localSet = localStorage.getItem("nameSet");
    if (serializedState) {
      this.state = JSON.parse(serializedState);
    }
    if (localSet) {
      const nameSetArray = JSON.parse(localSet);
      this.localStore.nameSet = new Set(nameSetArray);
    }
  },
};

//View
const FileExplorerView = {
  // Initialize renderDiv
  renderDiv: null,
  init() {
    this.renderDiv = document.querySelector("#root");
    console.log("root element: ", this.renderDiv);
    FileExplorerStore.loadStateFromLocalStorage();
    this.render(); // Call render after initializing renderDiv
  },

  render() {
    console.log("We Started Rendering");
    const StoreContent = FileExplorerStore.getState();
    console.log(this.renderDiv);
    const childDiv = this.renderDiv.querySelectorAll("div");
    childDiv.forEach((div) => {
      div.remove();
    });
    RenderTheDomBasedOnList(this.renderDiv, StoreContent);
  },
};

//Action Creators
function addNodeToList(name, nodeType, parentId) {
  return {
    type: "AddNode",
    name,
    nodeType,
    parentId,
  };
}
function deleteNodeToList(id) {
  return {
    type: "DeleteNode",
    id,
  };
}
function editNodeFromList(id, newName) {
  return {
    type: "EditNode",
    id,
    newName,
  };
}

//Connect Store cto Dispatcher
Dispatcher.register(FileExplorerStore.handleAction.bind(FileExplorerStore));

FileExplorerView.init();
