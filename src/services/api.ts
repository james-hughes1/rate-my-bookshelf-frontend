import type { BookshelfResult } from './types';
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
export const mockAnalyzeBookshelf = async (): Promise<BookshelfResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                books: [
                    {
                        title: "1984",
                        author: "George Orwell",
                        cover_url: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
                        link: "https://www.goodreads.com/book/show/5470.1984",
                        description: "A dystopian novel about totalitarianism."
                    },
                    {
                        title: "Pride and Prejudice",
                        author: "Jane Austen",
                        cover_url: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
                        link: "https://www.goodreads.com/book/show/1885.Pride_and_Prejudice",
                        description: "Classic romance and social commentary."
                    }
                ],
                recommendation: {
                    book: {
                        title: "Brave New World",
                        author: "Aldous Huxley",
                        cover_url: "https://covers.openlibrary.org/b/id/8776111-L.jpg",
                        link: "https://www.goodreads.com/book/show/5129.Brave_New_World",
                        description: "A futuristic dystopian novel about society and control."
                    },
                    explanation: "Because your bookshelf suggests a love of classic dystopian literature."
                },
                three_words: {
                    word_one: "adventurous",
                    word_two: "classic",
                    word_three: "thoughtful"
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
