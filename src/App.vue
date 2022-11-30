<script>
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import ManagementBar from '@/view/ManagementBar.vue'
import GameBoard from '@/view/GameBoard.vue';
import ScoreBar from '@/view/ScoreBar.vue';
import AddScore from '@/components/AddScore.vue';
import HeaderBoard from './view/HeaderBoard.vue';

export default {
  name: 'App',
  components: {
    HeaderBoard,
    GameBoard,
    ManagementBar,
    ScoreBar,
    AddScore
  },
  setup() {
    const store = useStore();
    const showAddScore = ref(false);
    const time = ref(0)
    watchEffect(() => {
      const status = store.getters.getStatus;
      if (status === 'finished') {
        showAddScore.value = true;
        time.value = store.getters.getTime;
      }
    })
    const added = ({ added = false }) => {
      if (added) {
        showAddScore.value = false;
      }
    }

    return {
      added,
      showAddScore,
      time,
    }
  }
}
</script>

<template>
  <div class="base effect">
    <div class="container">
      <AddScore class="modal-add-score" @added-score="added" v-if="showAddScore" :time="time" />
      <div class="cinema grain ">
        <div class="header">
          <HeaderBoard />
        </div>
        <div class="main">

          <div class="score">
            <ScoreBar />
          </div>

          <div class="board">
            <GameBoard class="game-board" />
          </div>

          <div class="timing">
            <ManagementBar class="management-bar" />
          </div>

        </div>
      </div>
      <div class="footer">
        <section class="description">
          <p>A card matching game powered by Vue.js 3!</p>
          <p>Adapted with ❤️ by Victor Hugo </p>
        </section>
      </div>
    </div>
    <div class="nosferatu monster"></div>
  </div>
</template>

<style scoped>
.base {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color-primary);
  perspective: 100vmin;
}

game-board,
management-bar {
  z-index: 89 !important;
}

.container {
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 0 20vmin 0vmin var(--background-color-primary) inset,
    0 0 3vmin 0.25vmin var(--background-color-primary) inset,
    0 0 1vmin 1vmin var(--background-color-primary);
}

.header {
  z-index: 199 !important;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 170px;
  width: 100%;
}

.main {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80%;
}

.footer {
  z-index: 99;
  display: flex;
  justify-content: center;
  width: 100%;
}

.board {
  z-index: 900 !important;
  width: 50%;
  padding: 40px;
}

.score {
  z-index: 99 !important;
  width: 20%;
  height: 70%;
  border-radius: 40px;
  background-color: var(--background-color-primary);
  border: 4px solid var(--color-primary);
  margin: 20px;
  padding: 20px;
}

.timing {
  z-index: 99 !important;
  width: 20%;
  height: 70%;
  border-radius: 40px;
  background-color: var(--background-color-primary);
  border: 4px solid var(--color-primary);
  margin: 20px;
  padding: 0px 20px 20px 20px;
}

.modal-add-score {
  z-index: 999;
}

.monster {
  position: absolute
}
</style>

