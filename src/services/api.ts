import type { Analysis, HomeAnalysis, LibraryAnalysis, LibraryRaw } from './types';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://bookshelf-app-backend-457537281629.europe-west1.run.app';

console.log(API_BASE_URL)

/**
 * Ping the backend to check connectivity.
 */
export const pingBackend = async (): Promise<boolean> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/ping`);
        console.log('Ping response:', res.status);
        return res.status === 200;
    } catch (err) {
        console.error('Ping failed', err);
        return false;
    }
};


export const analyzeBookshelf = async (
    file: File,
    description?: string
): Promise<Analysis> => {

    // ---------- FORM DATA FOR FIRST CALL ----------
    const formData = new FormData();
    formData.append("file", file);
    if (description) {
        formData.append("description", description);
    }

    // Choose endpoint
    const endpoint = description ? "/library" : "/mybookshelf";

    try {
        // ---------- STEP 1: ANALYZE ----------
        const response = await axios.post<Analysis>(
            `${API_BASE_URL}${endpoint}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        const data = response.data;
        const libraryData = data as unknown as LibraryRaw;

        // ---------- IF NO DESCRIPTION: DONE ----------
        if (!description) return {
            ...data,
            type: "home"
        } as HomeAnalysis

        // ---------- STEP 2: HIGHLIGHT (library mode only) ----------
        const highlightForm = new FormData();
        highlightForm.append("file", file);
        highlightForm.append("segment", JSON.stringify(libraryData.chosen_segment));

        const highlightResponse = await axios.post(
            `${API_BASE_URL}/highlight`,
            highlightForm,
            { responseType: "blob" }
        );

        // Convert to object URL for <img src />
        const highlightedUrl = URL.createObjectURL(highlightResponse.data);

        // ---------- RETURN MERGED RESULT ----------
        return {
            ...data,
            highlighted_image: highlightedUrl,
            type: "library"
        } as LibraryAnalysis;

    } catch (err) {
        console.error("Error analyzing bookshelf:", err);
        throw err;
    }
};


/**
 * Optional: keep a mock for testing without backend.
 */
export const mockAnalyzeBookshelf = async (): Promise<Analysis> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                books: [
                    { idx: 0, title: "1984", author: "George Orwell", confidence: 0.98 },
                    { idx: 1, title: "Pride and Prejudice", author: "Author Unknown", confidence: 0.7 }
                ],
                recommendation: {
                    recommended_book: "Brave New World",
                    explanation: "Because your bookshelf suggests a love of classic dystopian literature."
                },
                three_words: {
                    word_one: "Terrible",
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
                },
                type: "home"
            });
        }, 1000);
    });
};
