
const styleElement = document.createElement('dom-module');

styleElement.innerHTML = `
  <template>
    <style>

      #box {
        padding: 0 10vw;
 
      }
      
      form {
        display: flex; 
        justify-content: space-evenly;
        padding: 5vw;
        border-radius: 3%;
        border: 1px solid black;
        align-items: center;
        background-color: #f4f5f6 
          
        
      }
 
      button {
        font-family: 'Open Sans', sans-serif;
        align-self: center;
        font: medium;
        font-size: .874rem;  
        letter-spacing: .078rem;
        margin: 2px;
       
        border-radius: 10%;
        padding: 1vw;
      }

      .input {
        padding: 1vw;
      }

      label, input {
        font-family: 'Open Sans', sans-serif;
        align-self: center;
        font-size: .874rem;  
        letter-spacing: 0.016rem;
      }

      #buttons {
        display:flex;
        // width: 40%;
        flex-direction: column;
        text-justify: center;
        text-align: center;
      }

      input {
        // border: none;
        // border-color: transparent;
      }

    <style>
  </template>
`
styleElement.register('style-element')
