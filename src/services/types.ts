interface Scores {
    [metric: string]: number; // e.g., "classic_to_modern": 0.8
}
interface Recommendation {
    title: string;
    author: string;
    cover_url: string;
    link: string; // link to buy or explore
    description?: string;
}

interface BookshelfResult {
    taste_words: string[];   // e.g., ["adventurous", "classic", "philosophical"]
    scores: Scores;
    recommendation: Recommendation;
}

export type { BookshelfResult, Scores, Recommendation };