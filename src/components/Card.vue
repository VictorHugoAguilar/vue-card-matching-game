<template>
  <div class="card" @click="selectCard"  >
    <div v-if="visible" class="card-face is-front">
      {{ value }}
    </div>
    <div v-else class="card-face is-back">
      Back
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-component',
  props: {
    position: {
      type: Number, required: true
    },
    value: {
      type: Number, required: true
    },
    visible: {
      type: Boolean, default: false
    }
  },
  setup(props, context){

    const selectCard = () => {
      console.log('select card')
      context.emit('select-card', {
        position: props.position
      })
    }

    return {
      selectCard
    }
  }
}
</script>

<style>
.card {
  border: 5px solid #ccc;
  position: relative;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;

}

.card-face.is-front {
  background-color: red;
  color: white;
}

.card-face.is-back {
  background-color: blue;
  color: white;
}




</style>