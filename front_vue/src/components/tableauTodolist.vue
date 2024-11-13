<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">
            <div class="flex">
              <div class="mt-1">Name Of Tasks</div>
              <button @click="filtrage_nom()">
                <svg
                  class="ml-2 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Bold"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                >
                  <path
                    d="M6.414,9H17.586a1,1,0,0,1,.707,1.707l-5.586,5.586a1,1,0,0,1-1.414,0L5.707,10.707A1,1,0,0,1,6.414,9Z"
                  />
                </svg>
              </button>

              <button @click="filtrage_nom_decoissant()">
                <svg
                  class="ml-2 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Bold"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                >
                  <path
                    d="M6.414,15.586H17.586a1,1,0,0,0,.707-1.707L12.707,8.293a1,1,0,0,0-1.414,0L5.707,13.879A1,1,0,0,0,6.414,15.586Z"
                  />
                </svg>
              </button>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">
            <div class="flex">
              <div class="mt-1">Status</div>
              <button @click="filtrage_status()">
                <svg
                  class="mx-2 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Bold_status"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                >
                  <path
                    d="M6.414,9H17.586a1,1,0,0,1,.707,1.707l-5.586,5.586a1,1,0,0,1-1.414,0L5.707,10.707A1,1,0,0,1,6.414,9Z"
                  />
                </svg>
              </button>

              <button @click="filtrage_status_decoissant()">
                <svg
                  class="ml-2 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Bold"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                >
                  <path
                    d="M6.414,15.586H17.586a1,1,0,0,0,.707-1.707L12.707,8.293a1,1,0,0,0-1.414,0L5.707,13.879A1,1,0,0,0,6.414,15.586Z"
                  />
                </svg>
              </button>
            </div>
          </th>
          <th scope="col" class="px-6 py-3">State at the moment</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in tasks"
          :key="task._id"
          class="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            {{ task.nom }}
          </th>
          <td class="px-6 py-4">{{ task.description }}</td>
          <td class="px-6 py-4">{{ task.status }}</td>
          <td class="px-6 py-4">
            <div>
              <div class="flex items-center me-4">
                <input
                  type="radio"
                  :name="'state-' + index"
                  value="To Start"
                  v-model="task.selectedState"
                  @change="update_taskStatus(task)"
                  class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded"
                />
                <label
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >To Start</label
                >
              </div>
              <div class="flex items-center me-4">
                <input
                  type="radio"
                  :name="'state-' + index"
                  value="In Progress"
                  v-model="task.selectedState"
                  @change="update_taskStatus(task)"
                  class="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded"
                />
                <label
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >In Progress</label
                >
              </div>
              <div class="flex items-center me-4">
                <input
                  type="radio"
                  :name="'state-' + index"
                  value="Finished"
                  v-model="task.selectedState"
                  @change="update_taskStatus(task)"
                  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded"
                />
                <label
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Finished</label
                >
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <button
              @click="open_edit_modal(task)"
              class="text-white bg-blue-700 rounded-full px-5 py-2.5 mr-3"
            >
              Edit
            </button>
            <button
              @click="delete_tasks(index)"
              class="text-white bg-red-700 rounded-full px-5 py-2.5"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal pour l'édition de tâches -->
    <div
      v-if="show_modals"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-lg font-semibold mb-4">Edit Task</h2>
        <label class="block mb-2">Name</label>
        <input
          v-model="editable_task.nom"
          type="text"
          class="w-full mb-4 p-2 border rounded"
        />
        <label class="block mb-2">Description</label>
        <input
          v-model="editable_task.description"
          type="text"
          class="w-full mb-4 p-2 border rounded"
        />
        <div class="flex justify-end">
          <button
            @click="update_task"
            class="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          >
            Save
          </button>
          <button
            @click="close_edit_modal"
            class="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      id_tasks: "",
      show_modals: false,
      editable_task: {},
    };
  },
  mounted() {
    this.getTask();
  },
  methods: {
    getTask() {
      axios
        .get("http://localhost:3020/api/v1/todolistRouter/todolist_read")
        .then((res) => {
          this.tasks = res.data.map((task) => ({
            ...task,
            // Initialiser selectedState en fonction de task.status
            selectedState:
              task.status === "Terminer"
                ? "Finished"
                : task.status === "En Cours"
                ? "In Progress"
                : "To Start",
          }));
        });
    },
    update_taskStatus(task) {
      // Met à jour le statut en fonction de selectedState
      task.status =
        task.selectedState === "Finished"
          ? "Terminer"
          : task.selectedState === "In Progress"
          ? "En Cours"
          : "Non Terminer";

      // Mettre à jour le statut dans la base de données
      axios
        .put(
          `http://localhost:3020/api/v1/todolistRouter/todolist_update/${task._id}`,
          task
        )
        .then(() => {
          this.getTask(); // Rafraîchir les tâches après la mise à jour
        });
    },
    open_edit_modal(task) {
      this.editable_task = { ...task };
      this.show_modals = true;
    },
    close_edit_modal() {
      this.show_modals = false;
    },
    update_task() {
      axios
        .put(
          `http://localhost:3020/api/v1/todolistRouter/todolist_update/${this.editable_task._id}`,
          this.editable_task
        )
        .then(() => {
          this.getTask();
          this.close_edit_modal();
        });
    },
    delete_tasks(index) {
      this.id_tasks = this.tasks[index]._id;
      axios
        .delete(
          `http://localhost:3020/api/v1/todolistRouter/todolist_delet/${this.id_tasks}`
        )
        .then(() => {
          alert("Suppression réussie");
          this.getTask(); // Rafraîchir les tâches après suppression
        });
    },
    filtrage_nom() {
      axios
        .get(`http://localhost:3020/api/v1/todolistRouter/filtrage_by_name`)
        .then((res) => {
          this.tasks = res.data.map((task) => ({
            ...task,
            // Initialiser selectedState en fonction de task.status
            selectedState:
              task.status === "Terminer"
                ? "Finished"
                : task.status === "En Cours"
                ? "In Progress"
                : "To Start",
          }));
        });
    },
    filtrage_status() {
      axios
        .get(`http://localhost:3020/api/v1/todolistRouter/filtrage_par_status`)
        .then((res) => {
          this.tasks = res.data.map((task) => ({
            ...task,
            // Initialiser selectedState en fonction de task.status
            selectedState:
              task.status === "Terminer"
                ? "Finished"
                : task.status === "En Cours"
                ? "In Progress"
                : "To Start",
          }));
        });
    },
    filtrage_nom_decoissant() {
      axios
        .get(
          `http://localhost:3020/api/v1/todolistRouter/filtrage_by_name_decroissant`
        )
        .then((res) => {
          this.tasks = res.data.map((task) => ({
            ...task,
            // Initialiser selectedState en fonction de task.status
            selectedState:
              task.status === "Terminer"
                ? "Finished"
                : task.status === "En Cours"
                ? "In Progress"
                : "To Start",
          }));
        });
    },
    filtrage_status_decoissant() {
      axios
        .get(
          `http://localhost:3020/api/v1/todolistRouter/filtrage_par_status_decroissant`
        )
        .then((res) => {
          this.tasks = res.data.map((task) => ({
            ...task,
            // Initialiser selectedState en fonction de task.status
            selectedState:
              task.status === "Terminer"
                ? "Finished"
                : task.status === "En Cours"
                ? "In Progress"
                : "To Start",
          }));
        });
    },
  },
};
</script>

<style scoped></style>

/* git status git add . git commit -m "Added a basic layout and header" git push
origin main */
