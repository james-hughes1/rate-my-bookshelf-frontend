import React, { createContext, useContext, useState } from 'react';
import type { Analysis } from '../services/types';

type Mode = 'home' | 'library';

interface BookshelfContextValue {
    file: File | null;
    setFile: (f: File) => void;
    result: Analysis | null;
    setResult: (r: Analysis) => void;
    mode: Mode;
    setMode: (m: Mode) => void;
    description: string;
    setDescription: (d: string) => void;
}

const BookshelfContext = createContext<BookshelfContextValue | undefined>(undefined);

export const BookshelfProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<Analysis | null>(null);
    const [mode, setMode] = useState<Mode>('home');
    const [description, setDescription] = useState<string>('');

    return (
        <BookshelfContext.Provider value={{ file, setFile, result, setResult, mode, setMode, description, setDescription }}>
            {children}
        </BookshelfContext.Provider>
    );
};

export const useBookshelf = () => {
    const ctx = useContext(BookshelfContext);
    if (!ctx) throw new Error('useBookshelf must be used inside a BookshelfProvider');
    return ctx;
};
