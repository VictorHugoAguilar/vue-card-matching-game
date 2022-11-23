<template>
  <div class="card">
    {{ value }}
  </div>
</template>

<script>
export default {
name: 'card-component',
  props: {
    value: {
      type: Number, required: true
    }
  }
}
</script>

<style>

</style>
