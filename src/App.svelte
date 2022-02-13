<script>
  // Import the router component
  // Normally, this would be: `import Router from 'svelte-spa-router'`
  import Router from "svelte-spa-router";

  // Import the list of routes
  import routes from "./routes";
  import Navbar from "./components/Navbar.svelte";
</script>

<!-- Navigation links -->
<Navbar />

<!-- Show the router -->
<Router {routes} />

<style>
  /* Style for "active" links; need to mark this :global because the router adds the class directly */
  :global(a.active) {
    color: red;
  }
</style>
