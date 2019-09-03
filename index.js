import { PolymerElement, html } from './node_modules/@polymer/polymer/polymer-element.js';
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
      console.log(state)
    }


    
    static get template() {
        return html`
          <style>
  
          
          </style>
      
          <!-- shadow DOM goes here -->
          <my-nav></my-nav>
          <message-box></message-box>
          <!-- outside of a polymer managed template -->
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
        console.log("home")
        if (tab == 'home' || tab =='hidden') {
          return true 
        } else {
          return false
        }

      }
      _createTest(tab) {
        
        if (tab == 'create') {
          return true 
        } else {
          return false
        }
      }

      _configTest(tab) {
        
        if (tab == 'config') {
          return true 
        } else {
          return false
        }
        
      }
  

      constructor() {
        super();
        // console.log(window.location.pathname)
     
        // let router = new Navigo("/", true, "#!")
        // console.log(router)

        // router.on("/pagea", () => {

        //   this.route = html` <my-main></my-main> `;
        //   console.log("route - ", this.route)
          
        //   route("HOME")
        // })
        /// create an action to save route pagea -- then in nav - underline only that route.
      //   .on("/pageb", () => {
      //     this.route = html`<my-create></my-create>`
      //     route("SAVE")
      //   })
      //   .on("*", () => {
      //     this.route = html`This is home`
      //     route("-")
      //   })
      //   router.resolve()
      // }
        // setRootPath('/');
        // installRouter((location) => console.log(location));
        // installRouter((location) => {
        //   const route = decodeURIComponent(location.hash).substring(2);
        //   console.log("route " ,route)
        //   const routeParts = route.split('/').filter((part) => part !== '');
        //   console.log(routeParts)
        //   if (routeParts.length > 0) {
        //     // Navigate to a page
        //     let subRoute = []

        //     [this.page, ...subRoute] = routeParts;
        //     if (this.page === 'study') {
        //       if (subRoute.length > 0) {
        //         this.studyId = parseInt(subRoute[0], 10);
        //       }
        //     } else {
        //       this.studyId = null;
        //     }
        //   }
        // });
      }
  }

  customElements.define('my-body', MyBody);