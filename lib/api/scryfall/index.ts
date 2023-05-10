import { CardDetails } from "./types";

export { parseDecklist } from "./parseDecklist";
export { sortDeckByManaValue } from "./sortDeckByManaValue";

function getImageURLsFromCard(card: CardDetails) {
    if (!card || !card.cardData) {
        return [];
    }

    const { cardData } = card;
    
    if (cardData.image_uris) {
        return [cardData.image_uris.png]
    }


    if (cardData.card_faces) {
        return cardData.card_faces.map(face => face.image_uris.png);
    }
}

export { getImageURLsFromCard }