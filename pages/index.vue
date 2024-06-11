<!-- Creating the empty fields-->
<template>
  <div class="page-wrapper">
    <div class="element-wrapper">
      <div class="element-body">
        <h1>Welkom bij de Levarne Nulmeting</h1>
        <LevButton @click="fetchTodo">Fetch todo!</LevButton>
        <br>
        <br>
        <table id="tab" v-if="todo">
          <thead>
            <tr>
              <th>ID</th>
              <th>Assignee </th>
              <th>Date Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <br>
        <NuxtLink to="/about">Over ons</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { sendAPITasks } from '~/stores/task_api';

// Sends API request to the API backend.
const todoStore = sendAPITasks();

// Fetches the data from the requested API response.
// Then puts the data parameters from the todo object into the 'insertRow' function.
const fetchTodo = async () => {
    await todoStore.useTodoStore();
    const todoItem = todoStore.$state.todo.todo
    insertRow(String(todoItem.id), String(todoItem.assignee),
    parseDate(String(todoItem.dueDateTime)),String(todoItem.description));
  };

//Retrieves the todo data from the store.
const todo = computed(() => todoStore.todo);

// Formats the DateTime string by splitting it up in data and time respectively.
function parseDate(val : string){
  const splittedData = JSON.stringify(val).split('T');
  return splittedData[0].split('\"')[1] + ' at ' + splittedData[1].split('.')[0];
}
var uniqueEntries = new Set();

// Inserts parameters from the data into the table.
// Makes sure it doesn't include any duplicates.
function insertRow(id : string, assignee : string, dueDateTime : string, description : string) {
  var entryID = id;
  if(!uniqueEntries.has(entryID)){
    var tableBody = document.querySelector("tbody");
    if (tableBody) {
      var newRow = document.createElement("tr");
      
      var cell1 = document.createElement("td");
      cell1.textContent = id;
      newRow.appendChild(cell1);

      var cell2 = document.createElement("td");
      cell2.textContent = assignee;
      newRow.appendChild(cell2);

      var cell3 = document.createElement("td");
      cell3.textContent = dueDateTime;
      newRow.appendChild(cell3);

      var cell4 = document.createElement("td");
      cell4.textContent = description;
      newRow.appendChild(cell4);

      uniqueEntries.add(entryID);

      tableBody.appendChild(newRow);
    }
  }
}
</script>