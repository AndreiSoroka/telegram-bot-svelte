<script lang="ts">
  import { onMount } from 'svelte';

  export let data;
  const {webApp} = data;

  onMount(async () => {
    webApp.ready();
  });

  const { user } = webApp.initDataUnsafe;
  const name = user?.first_name || user?.username || 'Dear User';

</script>

<h1>
  Hello, {name}!
</h1>
