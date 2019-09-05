import { PolymerElement, html } from '@polymer/polymer';
import {} from '@polymer/polymer/lib/elements/dom-repeat'
 
import {connect} from 'pwa-helpers';
import { store } from '../redux/store.js';
import {} from '@polymer/polymer/lib/elements/dom-if'
import { newNote } from '../redux/action'
import '../css/sharedStyles.js'

export class MyCreate extends connect(store)(PolymerElement) {

  stateChanged(state) {
    const {tasks, message} = state 
    Object.assign(this, {message, tasks}) 
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
      <style include='style-element' >
        button {
          height: 2vh;
          border-radius: 10%;
        }
      </style>

      <div id="box">
      <form>
          <div id="inputBoxes">
            <!-- input 1 -->
            <div class ="input">
              <label for="task">Task: </label>
              <input type="text" name="task" id="task" value="Buy a Toaster">
            </div>
            <!-- input 2 -->
            <div class = "input">  
              <label for="notes">Notes: </label>
              <input type="text" name="notes" id="notes" value="at Sears">
            </div>
          </div>

          <div id="buttons">
            <button on-click="submit" type="submit">Submit Task</button> 
          </div>
       </form>
      </div>
    `;
  }
  
  constructor() {
    super();
     
  }
}

customElements.define('my-create', MyCreate);

