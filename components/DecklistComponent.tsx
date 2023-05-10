import { useEffect, useState } from "react"
import { getImageURLsFromCard, parseDecklist, sortDeckByManaValue } from "../lib/api/scryfall"
import { CardDetails, Deck } from "../lib/api/scryfall/types"
import { Else } from "../something/else"

type DecklistComponentProps = {
    decklist: string
}

type SortedDeck = Map<number, CardDetails[]>

export default function DecklistComponent({ decklist }: DecklistComponentProps) {
    const [deck, setDeck] = useState<Deck>()
    const [sortedDeck, setSortedDeck] = useState<SortedDeck>();
    const [selectedCard, setSelectedCard] = useState<CardDetails>();

    useEffect(() => {
        async function fetchCards() {
            const cards = await parseDecklist(decklist);

            setDeck(cards);
        }

        fetchCards()

    }, [])

    useEffect(() => {
        if (!deck || deck.size === 0) {
            return;
        }

        setSortedDeck(sortDeckByManaValue(deck));
    }, [deck])

    return <section className="text-white max-h-96 flex">
        <Else />
        <div className="flex-1 bg-pink-800 overflow-scroll">
            {sortedDeck && [...sortedDeck.keys()].sort().map((key) => {
                return <div key={key}>
                    <h3>{key}</h3>
                    <ul>
                        {sortedDeck.get(key).map((card) => {
                            return <li onMouseOver={() => setSelectedCard(card)} key={card.cardData.name}>{card.cardData.name}</li>
                        })}
                    </ul>
                </div>
            })
            }
        </div>
        <div className="flex-1 flex justify-end items-center">
            {selectedCard?.cardData && <img className="object-contain max-h-full" src={getImageURLsFromCard(selectedCard)[0]} />}
        </div>
    </section>
}