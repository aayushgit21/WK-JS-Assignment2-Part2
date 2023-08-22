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
  getState() {
    return this.state;
  },
  handleAction(action) {
    if (action.type === "AddNode") {
      createNode(action.nodeType, action.name, action.parentId);
      this.emitChange();
    } else if (action.type === "DeleteNode") {
      deleteNode(action.id);
      this.emitChange();
    }
    else if(action.type === "EditNode"){
      editNode(action.id,action.newName);
      this.emitChange();
    }
  },
  emitChange() {
    console.log("Store changed:", this.state);
  },
};

//View
const FileExplorerView = {
  // Initialize renderDiv
  renderDiv: null,
  init() {
    this.renderDiv = document.querySelector("#root");
    console.log("root element: ", this.renderDiv);
    // this.render(); // Call render after initializing renderDiv
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
function editNodeFromList(id,newName){
  return{
    type: "EditNode",
    id,
    newName
  }
}

//Connect Store cto Dispatcher
Dispatcher.register(FileExplorerStore.handleAction.bind(FileExplorerStore));

FileExplorerView.init();
