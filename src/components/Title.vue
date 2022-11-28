<script>
export default {
  name: 'TitleComponent',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup() {

  },
}
</script>

<template>
  <div class="content">
    <h2>{{ value }}</h2>
    <h2>{{ value }}</h2>
  </div>
</template>


<style scoped>
* {
  box-sizing: border-box;
  font-family: monster;
}

.content {
  position: relative;
  height: 100%;
  width: 100%;
}

h2 {
  margin: 0;
  width: 100%;
}

.content h2 {
  color: var(--color-light);
  font-size: 8em;
  position: absolute;
}

.content h2:nth-child(1) {
  color: transparent;
  -webkit-text-stroke: 5px var(--color-primary);
}

.content h2:nth-child(2) {
  color: var(--color-secundary);
  animation: animate 4s ease-in-out infinite;
}

@keyframes animate {

  0%,
  100% {
    clip-path: polygon(0% 45%,
        16% 44%,
        33% 50%,
        54% 60%,
        70% 61%,
        84% 59%,
        100% 52%,
        100% 100%,
        0% 100%);
  }

  50% {
    clip-path: polygon(0% 60%,
        15% 65%,
        34% 66%,
        51% 62%,
        67% 50%,
        84% 45%,
        100% 46%,
        100% 100%,
        0% 100%);
  }
}
</style>