import { PolymerElement, html } from '../../node_modules/@polymer/polymer/polymer-element.js';
import {} from '../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import '@polymer/paper-button/paper-button.js';
// import { PolymerElement, html } from '@polymer/polymer';
// import {} from '@polymer/polymer/lib/elements/dom-repeat'
import './buttons.js';

class MyNav extends PolymerElement {

  static get template() {
      return html`
        <style>
          div {
            position: sticky;
            top: 0;
            background-color: #00e4a8;
            display: flex;
            flex-direction: column;
          }
          h2 {
            font-family: 'Open Sans', sans-serif;
            align-self: center;
            font: light;
            size: 96 rem;
            letter-spacing: -1.5;
          }
        </style>
    
 
        <div>
          <h2> To Do App </h2>          
          <my-button></my-button>
          <paper-button toggles raised class="green">toggles</paper-button>
        </div>
      `;
    }    
  }

  customElements.define('my-nav', MyNav);