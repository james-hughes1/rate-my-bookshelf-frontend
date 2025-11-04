export const loadingPhrases = [
    "Cooking the books...",
    "Dotting the I's and crossing the T's...",
    "Sweeping the shelves...",
    "Assessing the vibes...",
    "Maximising your aura points...",
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
    "Sharpening quills...",
    "Stacking invisible books...",
    "Herding cats...",
    "Polishing the bookmarks...",
    "Translating Valyrian...",
    "Tuning the typewriter...",
    "Counting plot twists...",
    "Eating alphabet soup...",
    "Following the white rabbit...",
    "Opening the wardrobe...",
    "Consulting the Oracle...",
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
