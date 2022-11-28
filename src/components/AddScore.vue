<template>
  <div class="container-add-score">
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
    return {
      times,
      add
    }
  }
}
</script>

<style scoped>
.container-add-score {
  background-color: #FFA501;
  border-radius: 40px;
  width: 400px;
  height: 400px;
  position: absolute;
  margin-top: 300px;
  z-index: 99;
  box-shadow: 5px 5px 5px #BC2A01;

}

.add-score {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-family: 'monster';
  font-size: 3rem;
  margin: 0px;
  margin-top: 20px;
  color: #BC2A01;
}

.form {
  padding: 20px;
  width: 80%;
}

.label-score {
  margin: 20px 0px;
  font-family: 'monster';
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px #BC2A01;
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
  background-color: transparent;
  border: thin solid transparent;
  border-radius: 20px;
  box-shadow: 4px 4px 6px #BC2A01;
  color: #BC2A01;
  font-size: x-large;
  text-align: center;
}

.input-score-time {
  height: 30px;
  background-color: transparent;
  border: thin solid transparent;
  color: #BC2A01;
  font-family: 'monster';
  font-weight: bolder;
  font-size: x-large;
  text-align: center;
  text-shadow: 2px 2px white;
}

.btn-add {
  width: 80%;
  height: 40px;
  border: none;
  border-radius: 20px;
  margin: 20px 0px;
  color: #BC2A01;
  font-weight: bolder;
  text-transform: uppercase;
}

.btn-add:hover {
  box-shadow: 4px 4px 6px #BC2A01;
}
</style>