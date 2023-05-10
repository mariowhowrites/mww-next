export interface CardDetails {
    count: number,
    cardData?: CardData
}

export interface CardData {
    name: string,
    cmc: number,
    image_uris?: ImageURIs,
    card_faces?: {
        image_uris: ImageURIs
    }[]
}

export type Deck = Map<string, CardDetails>;

export interface ImageURIs {
    normal: string
    png: string
}