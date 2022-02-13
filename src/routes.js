// Components
import About from './routes/About.svelte'
import Industry from './routes/Industry.svelte'
import NotFound from './routes/NotFound.svelte'

// Export the route definition object
export default {
  // Exact path
  '/': Industry,
  '/about': About,

  // Catch-all, must be last
  '*': NotFound
}
