import { CardDetails, Deck } from "./types";

async function parseDecklist(decklist: string): Promise<Deck> {
    const decklistArray = decklist.split("\n")

    // get card names + counts from decklist
    const deck = decklistArray.reduce<Deck>((cards, line) => {
        const countAndName = line.slice(0, line.indexOf(" ("));
        const count = countAndName.slice(0, countAndName.indexOf(" "));
        const name = countAndName.slice(countAndName.indexOf(" ") + 1);

        const cardDetails: CardDetails = {
            count: parseInt(count)
        }; 

        cards.set(name, cardDetails);

        return cards;
    }, new Map<string, CardDetails>());


    // chunk names into groups of 75 to satisfy scryfall API requirements
    const chunkedNames = chunkNames(deck);

    // format requests
    const allPromises = chunkedNames.map((chunk) => makeRequestForNames(chunk));

    // send requests
    const allResponses = await Promise.all(allPromises);

    // get relevant data from responses (objects with `data` property)
    const allCardObjects = allResponses.flat().flatMap((response) => response.data);

    // add response data to cardMap and return
    return mapDataToNames(deck, allCardObjects);
}


// we need chunks of 75 names for scryfall to accept the request
function chunkNames(deck: Deck) {
    const allNames = Array.from(deck.keys());
    const chunkedNames = [];

    for (let i = 0; i < allNames.length; i += 75) {
        chunkedNames.push(allNames.slice(i, i + 75));
    }

    return chunkedNames;
}

function mapDataToNames(deck: Deck, allCardObjects: any) {
    allCardObjects.forEach(cardObject => {
        const cardNames = Array.from(deck.keys());

        const cardName = cardNames.find(name => cardObject.name.includes(name));

        const cardDetails = {
            count: deck.get(cardName).count,
            cardData: cardObject
        }

        deck.set(cardName, cardDetails);
    });

    return deck;
}

async function makeRequestForNames(names: string[]) {
    const res = await fetch("https://api.scryfall.com/cards/collection", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            identifiers: names.map((name) => ({ name })),
        })
    });

    return res.json();
}

export { parseDecklist };