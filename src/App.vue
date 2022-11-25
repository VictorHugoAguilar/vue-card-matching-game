<script>
import { computed } from 'vue'
import GameBoard from './view/GameBoard.vue';
import { useStore } from 'vuex';
import createTime from '@/features/createTime'

export default {
  name: 'App',
  components: {
    GameBoard
  },
  setup() {
    const store = useStore();
    const { time } = createTime();

    return {
      time,
      status: computed(() => store.getters.getStatus)
    }

  }
}
</script>

<template>
  <h1 class="sr-only">Peek-a-Vue</h1>
  <img class="title" src="@/assets/images/peek-a-vue-title.png" alt="peek-a-vue" />
  <section class="description">
    <p>Welcome to Peek-a-Vue!</p>
    <p>A card matching game powered by Vue.js 3!</p>
  </section>

  <div class="main">
    <div class="board">
      <GameBoard />
    </div>
    <div class="score">
      <h2>Time - {{ status }}</h2>
      <p>{{ time }}</p>
      <h2>Score</h2>
    </div>

  </div>

</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #00070c;
  background-image: url('@/assets/images/page-bg.png');
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  color: #fff;
}

h1 {
  margin-top: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.title {
  width: 30%;
  padding-bottom: 20px;
  margin-top: 20px;
}


.main {
  display: flex;
  flex-direction: row;
}

.board {
  width: 70%;
  border: thin solid red;
}

.score {
  width: 30%;
  border: thin solid greenyellow;
}
</style>
