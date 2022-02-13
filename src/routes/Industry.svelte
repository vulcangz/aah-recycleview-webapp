<script>
  import { onMount } from "svelte";
  import { baseURL } from "./../lib/api.js";
  import IndustryForm from "./IndustryForm.svelte";

  let industries = [];
  let prefix = "";
  let editIndustry = {
    IndustryName: "",
    Nature: "",
  };

  $: filteredIndustries = prefix
    ? industries.filter((industry) => {
        const name = `${industry.IndustryName}`;
        return name.toLowerCase().startsWith(prefix.toLowerCase());
      })
    : industries;

  onMount(async () => {
    let res = await fetch(baseURL + "/industry");
    ({ industries: industries } = await res.json());
  });

  let addIndustry = ({ detail: industry }) => {
    if (industries.find((p) => p.IndustryID === industry.IndustryID)) {
      const index = industries.findIndex(
        (p) => p.IndustryID === industry.IndustryID
      );
      let industryUpdated = industries;
      console.log(industryUpdated);
      industryUpdated.splice(index, 1, industry);
      industries = industryUpdated;
    } else {
      industries = [industry, ...industries];
    }
  };

  let deleteIndustry = async (id) => {
    if (confirm("Are You Sure?")) {
      let res = await fetch(`${baseURL}/industry/${id}`, {
        method: "DELETE",
      });
      industries = industries.filter((p) => p.IndustryID !== id);
    } else {
      alert("Your Industry is safe!!");
    }
  };

  let editIndustryDetails = async (industry) => {
    editIndustry = industry;
  };
</script>

<div class="container">
  <div class="row">
    <div class="col-8">
      {#if industries.length === 0}
        <p>Loading</p>
      {:else}
        <div class="table-responsive">
          <table class="table table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">IndustryName</th>
                <th scope="col">Nature</th>
                <th scope="col">Count</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <th scope="col" />
              <th scope="col"
                ><input placeholder="filter prefix" bind:value={prefix} /></th
              >
              <th scope="col" />
              <th scope="col" />
              <th scope="col" />
              {#each filteredIndustries as industry}
                <tr>
                  <th scope="row">{industry.IndustryID}</th>
                  <td>{industry.IndustryName}</td>
                  <td>{industry.Nature}</td>
                  <td>{industry.Count | 0}</td>
                  <td>
                    <button
                      class="btn btn-info"
                      on:click={editIndustryDetails(industry)}
                    >
                      Edit
                    </button>
                    <button
                      class="btn btn-danger"
                      on:click={deleteIndustry(industry.IndustryID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr><tr />{/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>

    <IndustryForm on:industryCreated={addIndustry} {editIndustry} />
  </div>
</div>
