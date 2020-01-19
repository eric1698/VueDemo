<template>
  <div id="app">
    <div class="container">
      <header class="app-header navbar">
        <!-- Header content here -->
      </header>

      <div class="app-body">
        <div class="sidebar">
          <!-- Sidebar content here -->
        </div>
        <main class="main">
          <!-- Main content here -->
        </main>
        <aside class="aside-menu">
          <!-- Aside menu content here -->
        </aside>
      </div>
    </div>
    <div class="mb-4">
      <!-- <router-link to="/HomePage" class="py-3 mr-3">HomePage</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  components: {   
  } 
};

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
