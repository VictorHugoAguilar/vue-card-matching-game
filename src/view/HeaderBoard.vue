<template>
  <div class="container-header">

    <Title class="title no-select" value="Memo Halloween" />

    <div class="container-button-sound">
      <div class="music-player">
        <audio ref="audio" src="/audio/bg-music.mp3" preload loop id="audio" autoplay> </audio>
        <div @click="toggleSound()" class="toggle-sound">
          <IconSound :status="playSound" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import Title from '@/components/Title.vue'
import IconSound from '@/components/IconSound.vue'

export default {
  name: 'header-board',
  components: {
    Title,
    IconSound
  },
  setup() {
    const audio = ref(null)
    const playSound = ref(true)

    const toggleSound = () => {

      if (
        audio.value.paused &&
        document.querySelector(".toggle-sound").classList.contains("paused")
      ) {
        console.log("play it")
        audio.value.play();
        playSound.value = true
        document.querySelector(".toggle-sound").classList.remove("paused");
      } else {
        console.log("pause it")
        audio.value.pause();
        playSound.value = false
        document.querySelector(".toggle-sound").classList.add("paused");
      }
    }

    return {
      playSound,
      toggleSound,
      audio
    }
  }

}
</script>

<style scoped>
.container-header {
  z-index: 199 !important;
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.container-button-sound {
  position: absolute;
  right: 20px;
  top: 100px;
}

.title {
  margin-top: 20px;
}
</style>