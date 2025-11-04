import type { BookshelfAnalysis } from './types';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bookshelf-app-backend-457537281629.europe-west1.run.app';

/**
 * Ping the backend to check connectivity.
 */
export const pingBackend = async (): Promise<boolean> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/ping`);
        return res.status === 200;
    } catch {
        return false;
    }
};

/**
 * Mock function that simulates the backend /process endpoint.
 * Returns the same JSON structure as your real backend.
 */
export const mockAnalyzeBookshelf = async (): Promise<BookshelfAnalysis> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                books: [
                    {
                        idx: 0,
                        title: "1984",
                        author: "George Orwell",
                        confidence: 0.98,
                    },
                    {
                        idx: 1,
                        title: "Pride and Prejudice",
                        author: "Author Unknown",
                        confidence: 0.7,
                    }
                ],
                recommendation: {
                    recommended_book: "Brave New World",
                    explanation: "Because your bookshelf suggests a love of classic dystopian literature."
                },
                three_words: {
                    word_one: "Adventurous",
                    word_two: "Classic",
                    word_three: "Thoughtful"
                },
                scores: {
                    age: 0.5,
                    intensity: 0.2,
                    mood: -0.3,
                    popularity: 0.7,
                    focus: 0.1,
                    realism: -0.1
                }
            });
        }, 1000); // simulate network delay
    });
};
