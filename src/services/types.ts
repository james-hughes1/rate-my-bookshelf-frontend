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

export interface LibraryRaw {
    recommended_book: string;
    explanation: string;
    chosen_mask_idx: number;
}

interface BaseAnalysis { }

export interface HomeAnalysis extends BaseAnalysis {
    type: "home";
    books: BookInfo[];
    recommendation: Recommendation;
    three_words: Threewords;
    scores: Scores;
}

export interface LibraryAnalysis extends BaseAnalysis {
    type: "library";
    recommended_book: string;
    explanation: string;
    highlighted_image: string;
}

export type Analysis = HomeAnalysis | LibraryAnalysis;