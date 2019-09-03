
import {store} from '../redux/store.js';

export const editConfig = (newName) => {
  store.dispatch({
    type: "EDIT_CONFIG", 
    payload: newName
  })
}

export const doneTask = (id) => {
  store.dispatch({
    type: "DONE_TASK", 
    payload: id
  })
}

export const hideTask = (id) => {
  store.dispatch({
    type: "HIDE_TASK", 
    payload: id,
  })
}

export const newNote = (data) => {
  store.dispatch({
    type: 'NEW_NOTE', 
    payload: data
  })
}

export const route = (route) => {
  store.dispatch({
    type: 'ROUTE', 
    payload: route
  })
}

export const deleteTask = (item) => {
  store.dispatch({
    type: 'DELETE', 
    payload: item
  })
}

export const changeData = (newData) => {
  store.dispatch({
    type: 'CHANGE_DATA', 
    payload: newData
  })
}

 
 
 

export const api = async () => {
  const res = await  fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        store.dispatch({
          type: 'ALL_DATA', 
          payload: json
        })
      })
}
 
