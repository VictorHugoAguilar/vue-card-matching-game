<script>
import { ref, watch } from 'vue';
import createDeck from '@/features/createDeck';
import createGame from '@/features/createGame';
import createTime from '@/features/createTime';
import { launchConfetti } from '@/utilities/confetti.js'
import Card from '@/components/Card.vue';
import { useStore } from 'vuex';


export default {
  name: 'GameBoard',
  components: {
    Card
  },
  setup() {
    const { cardList, init } = createDeck();
    init();

    const audioFinishGame = new Audio('audio/risa.mp3');

    const { remainingPairs } = createGame(cardList);
    const { time } = createTime();
    const store = useStore();

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
        store.commit('setTime', time.value)
        audioFinishGame.play()
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
          }, 800)
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
    }
  }
}
</script>

<template>
  <transition-group tag="section" name="shuffle-card" class="game-board">
    <Card v-for="card in cardList" :key="`card-${card.value}-${card.variant}`" :position="card.position"
      :value="card.value" :visible="card.visible" :matched="card.matched" @select-card="flipCard" class="card" />
  </transition-group>
</template>

<style scoped>
.game-board {
  z-index: 98 !important;
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  justify-content: center;
}

.card {
  z-index: 99 !important;
}

.shuffle-card-move {
  transition: transform 0.6s ease-in;
}
</style> 
