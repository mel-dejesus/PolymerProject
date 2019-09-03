import { PolymerElement, html } from '@polymer/polymer';
import {} from '@polymer/polymer/lib/elements/dom-repeat'
 
import {connect} from 'pwa-helpers';
import { store } from '../redux/store.js';
import {} from '@polymer/polymer/lib/elements/dom-if'
import { editConfig } from '../redux/action'
import '../css/sharedStyles.js'

export class MyConfig extends connect(store)(PolymerElement) {

  static get properties() {
    return {
 
      toggle: {
        type: Boolean, 
        value: false, 
        notify: true, 
        
      }
    }
  }
  stateChanged(state) {
    const {tasks, message, user} = state 
    Object.assign(this, {message, tasks, user}) 
    this.nTasks = this.tasks.length;
    this.nDone = this.tasks.filter(e => e.done)
    this.nDone = this.nDone.length
    this.nHidden = this.tasks.filter(e => e.hide) 
 
    this.nHidden = this.nHidden.length
  
  }
 
  submit(e) {
    e.preventDefault()
    this.toggle = !this.toggle
    if (this.toggle) {
      this.shadowRoot.querySelector("#user").removeAttribute('disabled')
      this.shadowRoot.querySelector("button").textContent = "Save UserName"
    } else {
      this.shadowRoot.querySelector("#user").setAttribute('disabled', '')
      this.shadowRoot.querySelector("button").textContent = "Edit UserName"
      const newName = this.shadowRoot.querySelector("#user").value
      console.log(newName)
      editConfig(newName)
    }

 
  }

  static get template() {
    return html`
      <style include='style-element' >
     
  
 
 
        button {
          height: 2vh;
          border-radius: 10%; 
          padding: 10px;
   
        }



      </style>
  
      <!-- shadow DOM goes here -->
      <div id="box">
      <form>
      <!-- <fieldset> -->
        <!-- <legend>Create a New Task</legend> -->
        <!-- <div id="real_fieldset"> -->
          <div id="inputBoxes">
            <!-- input 1 -->
            <div class ="input">
              <label for="user">Username: </label>
              <input type="text" name="user" id="user" value={{user}} disabled>
            </div>
            <!-- input 2 -->
            <div class = "input">  
              <label for="tasks">No. of tasks: </label>
              <input type="text" name="tasks" id="tasks" value="[[nTasks]]" disabled>
            </div>
            <!-- input 2 -->
            <div class = "input">  
              <label for="done">No. done: </label>
              <input type="text" name="done" id="done" value="[[nDone]]" disabled>
            </div>
            <!-- input 2 -->
            <div class = "input">  
              <label for="hidden">No. hidden: </label>
              <input type="text" name="hidden" id="hidden" value="[[nHidden]]" disabled>
            </div>
          </div>

          <div id="buttons">
            <button on-click="submit" type="submit">Edit UserName</button> 
          </div>
        <!-- </div> -->
      <!-- </fieldset> -->
       </form>
      </div>
    `;
  }
  
  constructor() {
    super();
     
  }
}

customElements.define('my-config', MyConfig);

