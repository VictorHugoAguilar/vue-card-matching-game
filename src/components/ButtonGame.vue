<script>
import createGame from '@/features/createGame';
import createDeck from '@/features/createDeck';
import IconBase from './IconBase.vue';

export default {
  name: 'ButtonGame',
  components: {
    IconBase
  },
  setup() {
    const { cardList } = createDeck();
    const { newPlayer, startGame, restartGame, } = createGame(cardList);

    return {
      startGame,
      restartGame,
      newPlayer
    }
  }
}
</script>
<template>
  <div class="start-button">
    <button @click="startGame" class="button" v-if="newPlayer">
      <IconBase class="icon" iconName="play" width="40" height="40" />
      Start Game
    </button>
    <button @click="restartGame" class="button" v-else>
      <IconBase class="icon" iconName="restart" width="40" height="40" />
      Restart Game
    </button>
  </div>
</template>

<style scoped>
.button {
  background-color: orange;
  color: #BC2A01;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
  font-size: 1.1rem;
  border: 0;
  border-radius: 10px;
}

.button img {
  padding-right: 5px;
}

.icon {
  margin-right: 10px;
}
</style>