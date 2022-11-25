<script>
import { ref, watch } from 'vue';
import createDeck from '@/features/createDeck';
import createGame from '@/features/createGame';
import { launchConfetti } from '@/utilities/confetti.js'
import Card from '@/components/Card.vue';


export default {
  name: 'GameBoard',
  components: {
    Card
  },
  setup() {
    const { cardList, init } = createDeck();
    init();

    console.log('LISTA-> ', cardList.value)

    const { status, remainingPairs } = createGame(cardList);

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
      remainingPairs,
      status,
      userSelection
    }
  }
}
</script>

<template>
  <transition-group tag="section" name="shuffle-card" class="game-board">
    <Card v-for="card in cardList" :key="`card-${card.value}-${card.variant}`" :position="card.position"
      :value="card.value" :visible="card.visible" :matched="card.matched" @select-card="flipCard" />
  </transition-group>
  <h1 class="status">
    {{ status }}
  </h1>
</template>

<style scoped>
.start-button {
  margin: 30px 0px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  justify-content: center;
}

.status {
  margin-top: 30px;
  font-family: 'Titillium Web', sans-serif;
}

.shuffle-card-move {
  transition: transform 0.6s ease-in;
}
</style> 
