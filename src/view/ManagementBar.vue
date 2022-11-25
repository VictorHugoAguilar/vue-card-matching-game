<script>
import { computed } from 'vue'
import { useStore } from 'vuex';
import ButtonGame from '@/components/ButtonGame.vue';
import createTime from '@/features/createTime'

export default {
  name: 'management-bar',
  components: {
    ButtonGame
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
  <div class="management-bar-container">

    <h2>Time - {{ status }}</h2>
    <p>{{ time }}</p>
    <h2>Score</h2>

    <ButtonGame />
  </div>

</template>

<style scoped>
.management-bar-container {
  display: flex;
  flex-direction: column;
}
</style>