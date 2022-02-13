<script>
  import {link} from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'
</script>

<style>
  /* Style for "active" links; need to mark this :global because the router adds the class directly */
  :global(a.active) {
      color: red;
  }
</style>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="/">aah-recycleview-webapp</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#/" use:link use:active={{path: '/', className: 'active', inactiveClassName: 'inactive'}}>Industry <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/about" use:link use:active={{path: '/about', className: 'active', inactiveClassName: 'inactive'}}>About</a>
      </li>
    </ul>
  </div>
</nav>