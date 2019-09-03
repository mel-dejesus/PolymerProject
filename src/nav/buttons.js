import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import {} from '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import { route } from '../redux/action.js';

import {connect} from 'pwa-helpers';
import { store } from '../redux/store.js';

class Buttons extends PolymerElement {

  static get properties() {
    return {
      tabText: {
        type: Array, 
        value: ['home', 'create', 'hidden', 'config']
      }, 
  }
}

stateChanged(state) {
  console.log(state)
  const {tab} = state 
  Object.assign(this, {tab})
  console.log('state change ', tab)
}

  constructor() {
    super();

  }

  check(item){
    console.log("hit")
    if (this.tab == item) {
      return true
    }
    return "hello"
  }

  tabClicked(e) {
 
    // id = name of tab: home, details, saved
    let tab = e.target.getAttribute('id')
    var b = this.shadowRoot.querySelectorAll('a')
    b.forEach(e => e.setAttribute('style', 'border: none'))
    var a = this.shadowRoot.querySelector('#'+tab)
    a.setAttribute('style', 'border-bottom: 4px solid black')
    console.log(tab)
    route(tab)
    // if saved, then show form page
  }
 
  
  static get template() {
      return html`
        <style>
         ul{
           display: flex;
           justify-content: space-evenly;
         }
         li {
           list-style-type: none; 
           color: black;
         }
         a {
           color: black;
           text-decoration: none; 
           padding-bottom: 1vh;
           font-family: 'Open Sans', sans-serif; 
   
           font: medium; 
           font-size: 24 rem;
           letter-spacing: 1.25;
         }
         .underline-true {
           background-color: red;
         }

        </style>
          <ul>
            <dom-repeat items="{{tabText}}">  
              <template> 
              
                <li> <a id = {{item}} class$={{check()}} on-click="tabClicked"> {{item}} </a> </li>    
              </template>
            </dom-repeat>
          </ul>
         
      `;
    }    

  }

  customElements.define('my-button', Buttons);