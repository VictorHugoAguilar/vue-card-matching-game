import { computed, ref } from "vue";

const cardList = ref([]);

const initDeck = (deckData) => {
  deckData.forEach((item) => {
    cardList.value.push({
      value: item,
      variant: 1,
      visible: true,
      position: null,
      matched: false,
    });
    cardList.value.push({
      value: item,
      variant: 2,
      visible: false,
      position: null,
      matched: false,
    });
  });
};

const updateCardPosition = () => {
  cardList.value = cardList.value.map((card, item) => {
    return {
      ...card,
      position: item,
    };
  });
};

export default function createDeck(deckData) {
  initDeck(deckData);
  updateCardPosition();
  return { cardList };
}
