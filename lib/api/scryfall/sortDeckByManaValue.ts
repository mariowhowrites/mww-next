import { CardDetails, Deck } from "./types";

type MapTuple = [string, CardDetails];

function sortDeckByManaValue(deck: Deck): Map<number, CardDetails[]> {
    // return map of { [manaValue: number]: [card1, card2, ...] }

    const result = [...deck].reduce<Map<number, CardDetails[]>>((cardsByManaValue, tuple: MapTuple) => {
        const [cardName, cardDetails] = tuple;

        const cmc = cardDetails.cardData.cmc;

        const newMap = cardsByManaValue.set(cmc, [...(cardsByManaValue.get(cmc) || []), cardDetails]);

        return newMap;
    }, new Map());

    return result;
}

export { sortDeckByManaValue }