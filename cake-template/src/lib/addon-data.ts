export interface AddonProduct {
    id: string;
    name: string;
    price: string;
    image: string;
    category: "Popular" | "Candles" | "Balloons" | "Party Props";
}

export const addonProducts: AddonProduct[] = [
    {
        id: "a1",
        name: "Number 1 Gold Candle",
        price: "$2.00",
        image: "/assets/candle-1.png",
        category: "Candles"
    },
    {
        id: "a2",
        name: "Magic Relighting Candles",
        price: "$3.50",
        image: "/assets/magic-candles.png",
        category: "Candles"
    },
    {
        id: "a3",
        name: "Lotus Rotating Candle",
        price: "$5.00",
        image: "/assets/lotus-candle.png",
        category: "Candles"
    },
    {
        id: "a4",
        name: "Pink Polka Dot Cap",
        price: "$1.50",
        image: "/assets/party-cap-pink.png",
        category: "Party Props"
    },
    {
        id: "a5",
        name: "Blue Polka Dot Cap",
        price: "$1.50",
        image: "/assets/party-cap-blue.png",
        category: "Party Props"
    },
    {
        id: "a6",
        name: "Pastel Balloon Set",
        price: "$4.00",
        image: "/assets/balloons-pastel.png",
        category: "Balloons"
    },
    {
        id: "a7",
        name: "Happy Birthday Banner",
        price: "$3.00",
        image: "/assets/balloons-pastel.png", // Reuse image due to quota
        category: "Party Props"
    },
    {
        id: "a8",
        name: "Party Popper (Gold)",
        price: "$2.50",
        image: "/assets/party-cap-pink.png", // Reuse image due to quota
        category: "Party Props"
    }
];
