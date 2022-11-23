import { ref } from "vue";

const cardList = ref([]);

const cardItems = ["bat", "candy", "cauldron", "cupcake", "ghost", "moon", "pumpkin", "witch-hat"];

const initDeck = (deckData) => {
  deckData.forEach((item) => {
    cardList.value.push({
      value: item,
      variant: 1,
      visible: false,
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

export default function createDeck() {
  initDeck(cardItems);
  updateCardPosition();
  return { cardList };
}
