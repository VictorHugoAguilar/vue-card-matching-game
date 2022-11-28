<script>
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import ManagementBar from '@/view/ManagementBar.vue'
import GameBoard from '@/view/GameBoard.vue';
import ScoreBar from '@/view/ScoreBar.vue';
import AddScore from '@/components/AddScore.vue';
import Title from '@/components/Title.vue'

export default {
  name: 'App',
  components: {
    GameBoard,
    ManagementBar,
    ScoreBar,
    Title,
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
        console.log('timeRef', time.value)
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
      time
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <Title class="title" value="Memo Halloween" />
    </div>

    <AddScore @added-score="added" v-if="showAddScore" :time="time" />

    <div class="main">

      <div class="score">
        <ScoreBar />
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  width: 100%;
}

.header {
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
  height: 70%;
}

.footer {
  display: flex;
  justify-content: center;
  width: 100%;
}

.title {
  margin-top: 20px;
  width: 80%;
}


.board {
  width: 50%;
  padding: 40px;
}

.score {
  width: 20%;
  height: 70%;
  border-radius: 40px;
  background-color: #00070B;
  border: 4px solid #FFA501;
  margin: 20px;
  padding: 20px;
}

.timing {
  width: 20%;
  height: 70%;
  border-radius: 40px;
  background-color: #00070B;
  border: 4px solid #FFA501;
  margin: 20px;
  padding: 0px 20px 20px 20px;
}
</style>
