interface BookInfo {
    idx: number;
    title: string;
    author: string;
    confidence: number;
}

interface Recommendation {
    recommended_book: string;
    explanation: string;
}

interface Scores {
    age: number;
    intensity: number;
    mood: number;
    popularity: number;
    focus: number;
    realism: number;
}

interface Threewords {
    word_one: string;
    word_two: string;
    word_three: string;
}

interface BookshelfAnalysis {
    books: BookInfo[];
    recommendation: Recommendation;
    three_words: Threewords;
    scores: Scores;
}

export type { BookshelfAnalysis, Scores, Recommendation, Threewords };