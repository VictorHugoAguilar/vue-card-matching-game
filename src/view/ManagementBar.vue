<script>
import { computed } from 'vue'
import { useStore } from 'vuex';
import ButtonGame from '@/components/ButtonGame.vue';
import createTime from '@/features/createTime'
import createDeck from '@/features/createDeck';
import createGame from '@/features/createGame';

export default {
  name: 'management-bar',
  components: {
    ButtonGame
  },
  setup() {
    const store = useStore();
    const { time } = createTime();
    const { cardList } = createDeck();
    const { status: remainingPairs } = createGame(cardList);

    return {
      time,
      remainingPairs,
      status: computed(() => store.getters.getStatus)
    }
  }
}
</script>

<template>
  <div class="grain">
    <div class="management-bar-container">
      <h1>Times</h1>
      <p>{{ time }}</p>
      <ButtonGame class="btn-game" />
      <h2>{{ remainingPairs }}</h2>
    </div>
  </div>
</template>

<style scoped>
.management-bar-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  font-family: monster;
  font-size: 3rem;
  color: var(--color-primary);
  letter-spacing: 10px;
}

h2 {
  font-family: monster;
  font-size: x-large;
  margin: 0px 0px 20px 0px;
  color: var(--color-primary);
  letter-spacing: 2px;
}

p {
  font-family: monster;
  font-size: 3rem;
  color: var(--color-secundary);
  padding: 0;
  margin: 0;
}

.btn-game {
  z-index: 99 !important;
}
</style>