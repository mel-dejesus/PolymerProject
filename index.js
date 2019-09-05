import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './src/nav/my-nav.js';
import './src/main/my-main.js';
import './src/create/my-create.js';
import './src/messageBox/messageBox.js';
import './src/config/config.js'
import { installRouter } from 'pwa-helpers/router.js';
import Navigo from "https://unpkg.com/navigo@7.1.2/lib/navigo.es.js"
import {connect} from 'pwa-helpers';
import { store } from './src/redux/store.js';
import {route} from './src/redux/action'
import { setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import {} from './node_modules/@polymer/polymer/lib/elements/dom-if.js'
 
class MyBody extends connect(store)(PolymerElement) {

    stateChanged(state) {
      const {route, config, tab} = state
      this.route = route;
      this.config = config;
      this.tab = tab;
    }

    static get template() {
        return html`
          <!-- shadow DOM goes here -->
          <my-nav></my-nav>
          <message-box></message-box>
          <dom-if if="{{_homeTest(tab)}}">
            <template>
              <my-main ></my-main>
            </template>
          </dom-if>
          <dom-if if="{{_createTest(tab)}}">
            <template>
              <my-create ></my-create>
            </template>
          </dom-if>
          <dom-if if ="[[_configTest(tab)]]"> 
            <template>
              <my-config></my-config>
            </template>
          </dom-if>
          <!--  -->
        `;
      }
      
      static get properties() {
        return {
          route: { type: Object }, 
          tab: {type: String}
        };
      }

      _homeTest(tab) {
        return (tab == 'home' || tab =='hidden') ? true: false;
      }

      _createTest(tab) {
        return tab == 'create' ? true : false;
      }

      _configTest(tab) {
        return tab == 'config' ? true : false;
      }
  
      constructor() {
        super();
      }
  }

  customElements.define('my-body', MyBody);