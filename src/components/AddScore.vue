<script>
import { toRefs } from 'vue'
import createScore from '@/features/createScore';

export default {
  name: 'add-score',
  props: {
    time: {
      type: Number,
      required: true,
    }
  },
  setup(props, context) {
    const { addScore } = createScore();
    const { time: times } = toRefs(props)
    const add = ({ target: { name } }) => {
      if (!name.value || name.value.length === 0) return;
      if (times <= 0) return;
      const score = {
        name: name.value,
        time: times.value
      }
      addScore(score);
      setTimeout(() => { console.log('saved...') }, 1000);
      name.value = '';
      context.emit('added-score', { added: true })
    }
    const closeModal = () => {
      context.emit('added-score', { added: true })
    }
    return {
      closeModal,
      times,
      add
    }
  }
}
</script>

<template>
  <div class="container-add-score ">
    <div class="close" @click="closeModal">[ <span>X</span> ]</div>
    <div class="add-score">
      <h1>Add Score</h1>
      <form class="form" @submit.prevent="add">
        <div class="form-control">
          <label class="label-score">Your name: </label>
          <input class="input-score-name" type="text" id="name" name="name">
        </div>
        <div class="form-control">
          <label class="label-score">Your time has been: </label>
          <div class="input-score-time">{{ times }} seg.</div>
        </div>
        <button class="btn-add">Add Score</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container-add-score {
  background-color: var(--background-color-secondary);
  background-image: url("@/assets/images/page-bg.png");
  border-radius: 40px;
  width: 400px;
  height: 450px;
  position: absolute;
  margin-top: 300px;
  z-index: 99;
  box-shadow: 0px 0px 20px var(--color-secundary);
}

.add-score {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close {
  color: var(--color-secundary);
  font-size: large;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 0px 0px;
}

div.close span {
  font-weight: bold;
}

h1 {
  font-family: 'monster';
  font-size: 4rem;
  margin: 0px;
  margin-top: 10px;
  letter-spacing: 2px;
  color: var(--color-secundary);
  text-shadow: 2px 2px var(--color-primary);

}

.form {
  padding: 20px;
  width: 80%;
}

.label-score {
  margin: 20px 0px;
  font-family: 'monster';
  font-size: 2rem;
  color: var(--color-primary);
  text-shadow: 2px 2px var(--color-secundary);
}

.form-control {
  width: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
  flex-direction: column;
}

.input-score-name {
  height: 30px;
  background-color: var(--background-color-secondary);
  border: thin solid var(--color-secundary);
  border-radius: 20px;
  box-shadow: 4px 4px 6px var(--color-secundary);
  color: var(--color-primary);
  font-weight: bolder;
  font-size: x-large;
  text-align: center;
}

.input-score-time {
  height: 30px;
  background-color: transparent;
  border: thin solid transparent;
  color: var(--color-secundary);
  font-family: 'monster';
  font-weight: bolder;
  font-size: x-large;
  text-align: center;
  text-shadow: 2px 2px var(--color-primary);
}

.btn-add {
  width: 80%;
  height: 40px;
  border: none;
  border-radius: 20px;
  margin: 20px 0px;
  background-color: var(--color-primary);
  color: var(--color-secundary);
  font-family: monster;
  font-size: x-large;
  font-weight: bolder;
  text-transform: uppercase;
}

.btn-add:hover {
  box-shadow: 0px 0px 10px var(--color-secundary);
}
</style>