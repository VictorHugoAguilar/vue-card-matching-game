<script>
import { computed } from 'vue'
import { useStore } from 'vuex';
import GameBoard from '@/view/GameBoard.vue';
import Title from '@/components/Title.vue'
import createTime from '@/features/createTime'

export default {
  name: 'App',
  components: {
    Title,
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
  <div class="container">
    <div class="header">
      <Title class="title" value="Peek-a-Vue" />
    </div>

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

    <div class="footer">
      <section class="description">
        <p>A card matching game powered by Vue.js 3!</p>
        <p>Adapted whith ❤️ by Victor Hugo </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  border: thin solid yellow;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column
}

.header {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: thin solid orange;
}

.main {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  border: thin solid blue;
}

.title {
  margin-top: 20px;
  width: 50%;
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
