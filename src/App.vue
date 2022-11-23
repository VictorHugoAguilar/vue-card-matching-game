<template>
  <h1 class="sr-only">Peek-a-Vue</h1>
  <img class="title" src="/images/peek-a-vue-title.png" alt="peek-a-vue" />
  <section class="game-board">
    <Card
      v-for="(card, index) in cardList"
      :key="`card-${index}`"
      :position="card.position"
      :value="card.value"
      :visible="card.visible"
      :matched="card.matched"
      @select-card="flipCard"
      />
  </section>
  <h1>
    {{ userSelection }}
  </h1>
  <h1>
    {{ status  }}
  </h1>
  <p>
    Remaining Pairs: {{ remainingPairs }}
  </p>
  <button @click="restartGame" class="button" >
    <img src="/images/restart.svg" alt="button restart"/>
    Restart Game
  </button>
</template>

<script>
import { computed, ref, watch  } from 'vue';
import Card from '@/components/Card.vue';
import _ from 'lodash';

export default {
  name: 'App',
  components: {
    Card
  },
  setup(){
    const cardList = ref([])
    const userSelection = ref([])

    const status = computed( () => {
      if(remainingPairs.value === 0){
        return 'Player wins'
      }else{
        return `Remaining Pairs: ${ remainingPairs.value }`
      }
    })

    const remainingPairs = computed(() => {
      const remainingCards = cardList.value.filter(card => card.matched === false).length
      return remainingCards / 2
    })

    const shuffleCards = () => {
      cardList.value = _.shuffle(cardList.value)
    }

    const restartGame = () => {
      shuffleCards()
      cardList.value = cardList.value.map( (card, index) => {
        return {
          ...card,
          position: index,
          matched: false,
          visible: false
        }
      })
    }

    const cardItems = [ 'bat', 'candy', 'cauldron', 'cupcake', 'ghost', 'moon', 'pumpkin', 'witch-hat'  ]

    cardItems.forEach(item => {
      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false
      })
      cardList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false
      })
    })

    cardList.value = cardList.value.map( (card, item) => {
      return {
        ...card,
        position: item
      }
    } )

    const flipCard = (payload) => {
      cardList.value[payload.position].visible  = true
      if(userSelection.value[0]){
        if(userSelection.value[0].position === payload.position
          && userSelection.value[0].faceValue === payload.faceValue)
        {
          return
        }else{
          userSelection.value[1]= payload
        }
      }else{
        userSelection.value[0] = payload
      }
    }
    watch(userSelection, currentValue => {

      if(currentValue.length === 2){
        const cardOne = currentValue[0]
        const cardTwo = currentValue[1]

        if(cardOne.faceValue === cardTwo.faceValue){
          cardList.value[cardOne.position].matched = true
          cardList.value[cardTwo.position].matched = true
        }else{
          setTimeout( () => {
            cardList.value[cardOne.position].visible = false
            cardList.value[cardTwo.position].visible = false
          }, 1000 )
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
      shuffleCards,
      restartGame
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
h1{
  margin-top: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  background-color: #00070c;
  background-image: url('@/assets/images/page-bg.png');
  height: 100vh;
  color: #fff;
  padding-top: 60px;
}
.game-board{
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-template-rows: repeat(4, 120px);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  justify-content: center;
}
.sr-only{
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
.title{
  padding-bottom: 30px;
margin-top: 30px;
}
.button{
 background-color: orange;
 color: white;
 padding: 0.75rem 0.5rem;
 display: flex;
 align-items: center;
 justify-content: center;
 margin: 0 auto;
 font-weight: bold;
}
.button img {
  padding-right: 5px;
}
</style>
