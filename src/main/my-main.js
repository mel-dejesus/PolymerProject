import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import {} from '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
 
import {connect} from 'pwa-helpers';
import { store } from '../redux/store.js';
import {} from '../../node_modules/@polymer/polymer/lib/elements/dom-if.js'
import { deleteTask, hideTask, changeData, doneTask } from '../redux/action'
// import { customElement, property, query, queryAll } from '@polymer/decorators';

import '../css/sharedStyles.js'

export class MyMain extends connect(store)(PolymerElement) {

  // @queryAll('.hideButton')
  //   hideButton: HTMLButtonElement;
 
  // @property({type: String, value: this.message})

  static get properties() {
    return {
 
      toggle: {
        type: Boolean, 
        value: false
      }, 
      hideToggle: {
        type: Boolean, 
        value: false,
      }, 
      hideText: {
        type: String, 
        value: "hide"
      }
 
    }
  }

  stateChanged(state) {
    console.log(state)
    const {tasks, show_hidden, route} = state   
    Object.assign(this, {tasks, show_hidden, route})
    // only show non-hidden
    // if showHidden = false 
    var x = this.shadowRoot.querySelector("#list")
    if (this.show_hidden) {
      this.tasks = this.tasks.filter(e => e.hide == true)
      this.hideText = "unhide"
      x.render();
    } else {
      this.tasks = this.tasks.filter(e => e.hide !== true)
      this.hideText = "hide"
      x.render();
    }
   console.log("tasks - ", this.tasks)
    // if showHidden = true
    // only show hidden
    // var x = this.shadowRoot.querySelector("#list")
    // you can't change DOM here unless you first render: 
    // x.render();
    // change dom - redo of hide

    if (route) {
      this.tasks.forEach(e => {
       
        if (e.done) {
          let id = parseInt(e.id) 
              // this only selects the label
            let note = this.shadowRoot.querySelectorAll(".inputPair_"+id );
            // this selects the input
            let note2 = this.shadowRoot.querySelectorAll(".inputPair_"+id+" > input" );
        
            // strikeout
            note.forEach(e => e.setAttribute('style', 'text-decoration : line-through'))
            note2.forEach(e => e.setAttribute('style', 'text-decoration : line-through'))
          
        }
      })
    }
    x.render()
  }
 

  hide(e) {
    e.preventDefault()
    this.hideToggle = !this.hideToggle;
    console.log(this.hideToggle)
    let id = e.target.id
    console.log(id)
    id=id.substr(5)
    hideTask(id)
  }

  done(e) {
    // get id
    e.preventDefault()
    let id = e.target.id
    id=id.substr(5)
 
    // this only selects the label
    let note = this.shadowRoot.querySelectorAll(".inputPair_"+id );
    // this selects the input
    let note2 = this.shadowRoot.querySelectorAll(".inputPair_"+id+" > input" );
   
    // strikeout
    note.forEach(e => e.setAttribute('style', 'text-decoration : line-through'))
    note2.forEach(e => e.setAttribute('style', 'text-decoration : line-through'))

    // dispatch action
    doneTask(id)
  }

 edit(e){
   // if save, it doesn't get teh notes

  e.preventDefault()
  this.toggle=!this.toggle
  var id = e.target.id
  console.log("toggle - ", this.toggle)
  id=id.substr(5)
  console.log(id)
  if (this.toggle) {
    // allow edit and change text to save
  
    let inputs = this.shadowRoot.querySelectorAll(".inputPair_"+id+">input")
    inputs.forEach(e => e.removeAttribute('disabled'))
    
    this.shadowRoot.querySelector("#edit_"+id).textContent = "save"
  } else {
    // finished edit and save

    let inputs = this.shadowRoot.querySelectorAll(".inputPair_"+id+">input")
    console.log(inputs)
    inputs.forEach(e => e.setAttribute('disabled', ''))

    e.target.textContent = "edit";
      // read
      var newTask = this.shadowRoot.querySelector(".inputPair_"+id +" > input#name").value
      var newNote = this.shadowRoot.querySelector(".inputPair_"+id +" > input#notes").value
      
      var data = {
        newTask: newTask,
        newNote: newNote, 
        id: id, 
      }
      console.log("here ------", data)
 
      changeData(data)
  }
}

 
  static get template() {
    return html`
      <style include='style-element'>
      </style>
      <div id="box"> 
        <dom-repeat id="list" items="{{tasks}}">
          <template>
          <form>
            <!-- <fieldset> -->
              <!-- <div id="real_fieldset"> -->
                <div id = "inputBoxes">
                  <div  class$="inputPair_[[item.id]] input">
                    <label for="name">Task:</label>
                    <input id="name" type="text" value="{{item.task}}" disabled>
                  </div>
                  <div  class$="inputPair_[[item.id]] input">
                      <label for="notes">Notes:</label>
                      <input id="notes" type="text" value="{{item.notes}}" disabled>
                  </div>
                </div>
                  <div id="buttons">
                    <button id$= "edit_{{item.id}}" on-click="edit">edit</button>
                    <button id$= "done_[[item.id]]" on-click="done">done</button>
                    <button class="hiddenButton" id$= "hide_[[item.id]]" on-click="hide">[[hideText]]</button>
                  </div>
                <!-- </div> -->
              <!-- </fieldset> -->
            </form>
          </template>
        </dom-repeat>
      </div>
    `;
  }
  
  constructor() {
    super();
     
  }
}

customElements.define('my-main', MyMain);

