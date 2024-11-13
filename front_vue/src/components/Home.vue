<template>
  <div>
    <!-- Navbar -->
    <the-home />

    <div class="flex">
      <!-- Main Content (Tableau TodoList) -->
      <main class="flex-1 p-4">
        <tableau-todolist />
      </main>

      <!-- Aside (Add Todo List) -->
      <aside class="w-1/4 bg-gray-100 p-4">
        <add-todolist />
      </aside>
    </div>
  </div>
</template>

<script>
import TheHome from "./TheHome.vue";
import TableauTodolist from "./tableauTodolist.vue";
import AddTodolist from "./addTodolist.vue";

export default {
  name: "Home",
  components: {
    TheHome,
    TableauTodolist,
    AddTodolist,
  },
};
</script>

<style scoped>
/* Vous pouvez ajouter des styles globaux ici si nécessaire */
</style>
