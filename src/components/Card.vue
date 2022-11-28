<script>
import { computed } from 'vue';

export default {
  name: 'card-component',
  props: {
    matched: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number, required: true
    },
    value: {
      type: String, required: true
    },
    visible: {
      type: Boolean, default: false
    }
  },
  setup(props, context) {

    const flippedStyles = computed(() => {
      if (props.visible) {
        return 'is-flipped'
      }
      return ''
    })

    const selectCard = () => {
      context.emit('select-card', {
        position: props.position,
        faceValue: props.value
      })
    }

    return {
      flippedStyles,
      selectCard,
      urlImage: computed(() => `images/${props.value}.png`)
    }
  }
}
</script>

<template>
  <div class="card" @click="selectCard" :class="flippedStyles">
    <div class="card-face is-front">
      <img :src="urlImage" :alt="value" />
      <img v-if="matched" src="@/assets/images/checkmark.svg" class="icon-checkmark" />
    </div>
    <div class="card-face is-back"></div>
  </div>
</template>

<style>
.card {
  z-index: 99 !important;
  position: relative;
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}

.card-face.is-front {
  background-color: var(--color-back-card);
  background-image: url('@/assets/images/card-bg.png');
  color: var(--color-light);
  transform: rotateY(180deg);
}

.card-face.is-back {
  background-color: var(--color-back-card);
  background-image: url('@/assets/images/card-bg-empty.png');
  color: var(--color-light);
}

.icon-checkmark {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
