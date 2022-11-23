<script>
import { ref, watch } from 'vue';
import createDeck from './features/createDeck';
import createGame from './features/createGame';
import { launchConfetti } from '@/utilities/confetti.js'
import Card from '@/components/Card.vue';
import halloweenDeck from './data/halloweenDeck.json'

export default {
  name: 'App',
  components: {
    Card
  },
  setup() {
    const { cardList } = createDeck(halloweenDeck);
    const { newPlayer, startGame, restartGame, status,
      remainingPairs } = createGame(cardList);

    const userSelection = ref([])

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true
      if (userSelection.value[0]) {
        if (userSelection.value[0].position === payload.position
          && userSelection.value[0].faceValue === payload.faceValue) {
          return
        } else {
          userSelection.value[1] = payload
        }
      } else {
        userSelection.value[0] = payload
      }
    }

    watch(remainingPairs, currentValue => {
      if (currentValue === 0) {
        launchConfetti()
      }
    })

    watch(userSelection, currentValue => {
      if (currentValue.length === 2) {
        const cardOne = currentValue[0]
        const cardTwo = currentValue[1]

        if (cardOne.faceValue === cardTwo.faceValue) {
          cardList.value[cardOne.position].matched = true
          cardList.value[cardTwo.position].matched = true
        } else {
          setTimeout(() => {
            cardList.value[cardOne.position].visible = false
            cardList.value[cardTwo.position].visible = false
          }, 1000)
        }
        userSelection.value.length = 0
      }
    }, {
      deep: true
    })

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      remainingPairs,
      startGame,
      restartGame,
      newPlayer
    }
  }
}
</script>

<template>
  <h1 class="sr-only">Peek-a-Vue</h1>
  <img class="title" src="/images/peek-a-vue-title.png" alt="peek-a-vue" />
  <section class="description">
    <p>Welcome to Peek-a-Vue!</p>
    <p>A card matching game powered by Vue.js 3!</p>
  </section>
  <div class="start-button">
    <button @click="startGame" class="button" v-if="newPlayer">
      <img src="/images/play.svg" alt="button play game" />
      Start Game
    </button>
    <button @click="restartGame" class="button" v-else>
      <img src="/images/restart.svg" alt="button restart" />
      Restart Game
    </button>
  </div>
  <transition-group tag="section" name="shuffle-card" class="game-board">
    <Card v-for="card in cardList" :key="`card-${card.value}-${card.variant}`" :position="card.position"
      :value="card.value" :visible="card.visible" :matched="card.matched" @select-card="flipCard" />
  </transition-group>
  <h1 class="status">
    {{ status }}
  </h1>

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

.description {
  font-family: 'Titillium Web', sans-serif;
}

.description p {
  margin: 0;
  font-size: 1.2rem;
}

.description p:last-child {
  margin-bottom: 30px;
}

.start-button {
  margin: 30px 0px;
}

.game-board {
  display: grid;
  grid-template-columns: 20% 20% 20% 20%;
  grid-auto-rows: 180px;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  justify-content: center;
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
  width: 40%;
  padding-bottom: 30px;
  margin-top: 30px;
}

.status {
  margin-top: 30px;
  font-family: 'Titillium Web', sans-serif;
}

.button {
  background-color: orange;
  color: white;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
  font-size: 1.1rem;
  border: 0;
  border-radius: 10px;
}

.button img {
  padding-right: 5px;
}

.shuffle-card-move {
  transition: transform 0.6s ease-in;
}
</style>
