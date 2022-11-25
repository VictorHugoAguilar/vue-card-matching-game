<script>
import GameBoard from './view/GameBoard.vue';

export default {
  name: 'App',
  components: {
    GameBoard
  },
  setup() {
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
      <h2>Time</h2> 
      <h2>Score</h2>
    </div>

  </div>

</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

h1 {
  margin-top: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #00070c;
  background-image: url('@/assets/images/page-bg.png');
  height: 100vh;
  color: #fff;
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
