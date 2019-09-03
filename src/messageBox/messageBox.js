import { PolymerElement, html } from '@polymer/polymer';
import {} from '@polymer/polymer/lib/elements/dom-repeat'
 
import {connect} from 'pwa-helpers';
import { store } from '../redux/store.js';
import {} from '@polymer/polymer/lib/elements/dom-if'
import { newNote } from '../redux/action'


export class MessageBox extends connect(store)(PolymerElement) {

  stateChanged(state) {
 
    const {tasks, message, user, show_hidden} = state 
    
    Object.assign(this, {message, tasks, user, show_hidden})
 
    
    if (show_hidden) {
      let hidden = tasks.filter( e => {
        return e.hide == true
      })
      if (hidden.length < 1) {
        this.message = "you have no hidden files!"
      } else {
        this.message = "here are your hidden files!"
      }
    }
    
  }
 
  submit(e) {
    e.preventDefault()
    const task = this.shadowRoot.querySelector("#task").value
    const notes = this.shadowRoot.querySelector("#notes").value
    const data = {
      task: task, 
      notes: notes
    }
    newNote(data)
  }

  static get template() {
    return html`
      <style>
        #box {
          display: flex;
          justify-content: center;
        }
        #message {
          padding: 3vh;
          
          font-family: 'Open Sans', sans-serif;
          align-self: center;
       
          font-size: 14 rem;  
          letter-spacing: 0.25;
        
        }
      </style>
  
      <!-- shadow DOM goes here -->
      <div id="box">
        <div id="message"> Hi [[user]],  [[message]] </div>
      </div>
    `;
  }
  
  constructor() {
    super();
     
  }
}

customElements.define('message-box', MessageBox);

