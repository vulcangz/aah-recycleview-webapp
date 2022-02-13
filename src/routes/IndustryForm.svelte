<script>
  import { baseURL } from "./../lib/api.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let editIndustry;
  let loading = false;
  let data = {
    IndustryName: "",
    Nature: "",
  };
  let URL, method;

  $: data = editIndustry;

  let addNewIndustry = async () => {
    if (data.IndustryName.trim() === "") {
      return;
    }
    loading = true;
    if (editIndustry.IndustryID) {
      URL = `${baseURL}/industry/${editIndustry.IndustryID}`;
      method = "PUT";
    } else {
      URL = `${baseURL}/industry`;
      method = "POST";
    }
    const res = await fetch(URL, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let r;
    ({ industry: r } = await res.json());
    dispatch("industryCreated", r);
    editIndustry = {}
    loading = false;
  };
  let switchToCreate = async => {
    editIndustry = {}
  }
</script>

<div class="col-4">
  <div class="card p-3">
    {#if !loading}
      <form on:submit|preventDefault={addNewIndustry}>
        <fieldset class="form-group">
          <legend>New industry</legend>
          <div class="form-group">
            <label for="title">Industry Name*</label>
            <input
              bind:value={editIndustry.IndustryName}
              type="text"
              class="form-control"
              id="text"
              placeholder="Name"
            />
          </div>
          <div class="form-group">
            <label for="title">Nature*</label>
            <input
              bind:value={editIndustry.Nature}
              type="text"
              class="form-control"
              id="text"
              placeholder="Nature"
            />
          </div>
        </fieldset>

        <button type="submit" class="btn btn-primary">
          {editIndustry.IndustryID ? "Update" : "Submit"}
        </button>
        {#if editIndustry.IndustryID}
          <button on:click="{switchToCreate}" type="reset" class="btn btn-info">
            Wanna create?
          </button>
        {/if}
      </form>
    {:else}
      <p>Loading ...</p>
    {/if}
  </div>
</div>