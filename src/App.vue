<script>
import Title from '@/components/Title.vue'
import GameBoard from '@/view/GameBoard.vue';
import ManagementBar from '@/view/ManagementBar.vue'

export default {
  name: 'App',
  components: {
    GameBoard,
    ManagementBar,
    Title,
  },
  setup() {
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <Title class="title" value="Memo Halloween" />
    </div>

    <div class="main">

      <div class="score">

      </div>
      <div class="board">
        <GameBoard />
      </div>

      <div class="timing">
        <ManagementBar />
      </div>

    </div>

    <div class="footer">
      <section class="description">
        <p>A card matching game powered by Vue.js 3!</p>
        <p>Adapted with ❤️ by Victor Hugo </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.container {
  align-content: center;
  align-items: center;
  border: thin solid yellow;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  width: 100%;
}

.header {
  align-items: center;
  border: thin solid orange;
  display: flex;
  flex-direction: column;
  height: 150px;
  width: 100%;
}

.main {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.footer {
  border: thin solid blue;
  display: flex;
  justify-content: center;
  width: 100%;
}

.title {
  margin-top: 20px;
  width: 80%;
}


.board {
  border: thin solid red;
  width: 50%;
  padding: 40px;
}

.score {
  border: thin solid greenyellow;
  width: 25%;
}

.timing{
  width: 25%;
  border: thin solid greenyellow;
}
</style>
