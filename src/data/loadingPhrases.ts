export const loadingPhrases = [
    "Cooking the books...",
    "Dotting the I's and crossing the T's...",
    "Sweeping the shelves...",
    "Assessing the vibes...",
    "Organizing your literary aura...",
    "Summoning the spirit of Virginia Woolf...",
    "Dusting off the paperbacks...",
    "Finding Waldo in your collection...",
    "Applying the Dewey Decimal System...",
    "Jesting infinitely...",
    "Whacking the kettle on...",
    "Folding the page corners...",
    "Lighting a candle...",
    "Putting on reading glasses...",
    "Explaining to Watson...",
    ""
];

// Shuffle function to randomize the order
export const getRandomizedPhrases = (): string[] => {
    const shuffled = [...loadingPhrases];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
