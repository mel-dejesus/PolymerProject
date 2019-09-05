const INITIAL_STATE = {
  tasks: [],
  show_hidden: false,
  user: "mel",
  nextId: 0,
  message: "you currently have no items.  Please create one.", 
  route: true, 
  tab: 'home', 
  config: false
}

export const reducer = (state = INITIAL_STATE, action) => {
  var state2 = Object.assign({}, state) 
  switch (action.type) {
 
    case 'EDIT_CONFIG': 
      state2.user = action.payload;
      return state2
 
      case 'HIDE_TASK': 
      {
        let id = parseInt(action.payload);
        let hideTask = state2.tasks.filter(e => e.id ==id)
        hideTask[0].hide = hideTask[0].hide ? false : true,
        state2.message = "your task has been hidden";
        state2.tasks[id] = hideTask[0];
        return state2
      }

    case 'DONE_TASK': 
      let id = parseInt(action.payload);
      let doneTask = state2.tasks.filter(e => e.id == id)
            // extract note items
      doneTask[0].done = true;
      state2.message = "your task has been marked complete."
            // add to state / return
      state2.tasks[id] = doneTask[0];
      return state2

    case 'NEW_NOTE': 
      const newNote = {
        id: state2.nextId,
        user: state2.user,
        done: false, 
        hide: false, 
        task: action.payload.task,
        notes: action.payload.notes
      }
      state2.tasks.push(newNote) 
      state2.message = "your note has been added."
      state2.route = true
      state2.nextId = state2.nextId +1
      return state2;

    case 'DELETE':
      var item = action.payload 
      state2.tasks = state2.tasks.filter(e => 
          e.id !== item)
      return state2

    case 'ROUTE': 
      state2.tab = action.payload;
      state2.show_hidden = action.payload == 'hidden' ? true : false;
      state2.route = (action.payload == 'home' || action.payload == 'hidden') ? true : false;
      if (action.payload === 'create') {
        state2.message = ' go ahead and create a new task'
      }
      if (action.payload === 'config') {
        state2.message = ' your settings';
        // state2.config = state2.config ? false : true;
      }
      return state2;
      
    case 'CHANGE_DATA': 
      let noteToChange = state2.tasks.filter(
        e => e.id == parseInt(action.payload.id)
      )
      // extract note items
      noteToChange[0].task = action.payload.newTask;
      noteToChange[0].notes = action.payload.newNote;
      // add to state / return
      state2.tasks[noteToChange[0].id] = noteToChange[0];

      state2.message = "your task has been edited"
      return state2
      
    default:
      return state
  }
};
