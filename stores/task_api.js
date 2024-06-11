// store/sendAPItasks.js
import { defineStore } from 'pinia';
import axios from 'axios';

//Sends API request to the backend API.
export const sendAPITasks = defineStore('sendAPI', {
  //Defines todo based on the json data, together with the error message and url.
  state: () => ({
    todo: {todo: {id: '', assignee: '', dueDateTime: '', description: ''}},
    error: null,
    url: 'https://86a4h9y007.execute-api.eu-west-1.amazonaws.com/development/nulmeting/todo'
  }),
  //Requests data from the backend API.
  actions: {
    async useTodoStore() {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: this.url,
          headers: {
            'x-api-key': 'key'
          }
        };
        const response = await axios.request(config);
        this.todo = response.data;
      } 
      catch (error) {
        this.error = error;
      }
    }
  }
});
