<script>
import createScore from '@/features/createScore';
export default {
  name: 'score-bar',

  setup() {
    const { players } = createScore();

    return {
      players
    }
  }
}
</script>

<template>
  <div class="score-board ">
    <h1>Scores</h1>
    <table class="table-score">
      <tr v-for="player in players" :key="player.position">
        <td>{{ player.position }}</td>
        <td>{{ player.name }}</td>
        <td>{{ player.time }}<span>s</span></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.score-board {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

h1 {
  font-family: monster;
  color: var(--color-primary);
  letter-spacing: 10px;
  padding-bottom: 10px;
  border-bottom: 3px solid var(--color-primary);
}

.table-score {
  font-family: monster;
  font-size: 1.2rem;
  color: var(--color-primary);
  letter-spacing: 2px;
}

tr:first-child {
  color: var(--color-first-place);
  font-size: 2.2rem;
}

tr:nth-child(2) {
  color: var(--color-second-place);
  font-size: 1.8rem;
}

tr:nth-child(3) {
  color: var(--color-third-place);
  font-size: 1.4rem;
}
</style>