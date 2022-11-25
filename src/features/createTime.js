import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

export default function createGame() {
  const store = useStore();
  const time = ref(0);

  let idTime;
  const startTime = () => {
    time.value = 0;

    if (idTime) {
      stopTime();
    }

    idTime = setInterval(() => {
      time.value++;
    }, 1000);
  };

  const stopTime = () => clearInterval(idTime);

  watchEffect(() => {
    const status = store.getters.getStatus;
    if (status === "stoped") return;
    if (status.includes("gaming")) startTime();
    if (status === "finished") stopTime();
  });

  return {
    time,
  };
}
