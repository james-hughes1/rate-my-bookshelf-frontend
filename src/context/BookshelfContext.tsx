import React, { createContext, useContext, useState } from 'react';
import type { BookshelfAnalysis } from '../services/types';

interface BookshelfContextValue {
    file: File | null;
    setFile: (f: File) => void;
    result: BookshelfAnalysis | null;
    setResult: (r: BookshelfAnalysis) => void;
}

const BookshelfContext = createContext<BookshelfContextValue | undefined>(undefined);

export const BookshelfProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<BookshelfAnalysis | null>(null);

    return (
        <BookshelfContext.Provider value={{ file, setFile, result, setResult }}>
            {children}
        </BookshelfContext.Provider>
    );
};

export const useBookshelf = () => {
    const ctx = useContext(BookshelfContext);
    if (!ctx) throw new Error('useBookshelf must be used inside a BookshelfProvider');
    return ctx;
};