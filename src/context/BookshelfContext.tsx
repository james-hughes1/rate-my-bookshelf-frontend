import React, { createContext, useContext, useState } from 'react';
import type { BookshelfAnalysis } from '../services/types';

interface BookshelfContextType {
    result: BookshelfAnalysis | null;
    setResult: (res: BookshelfAnalysis) => void;
}

const BookshelfContext = createContext<BookshelfContextType | undefined>(undefined);

export const BookshelfProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [result, setResult] = useState<BookshelfAnalysis | null>(null);
    return (
        <BookshelfContext.Provider value={{ result, setResult }}>
            {children}
        </BookshelfContext.Provider>
    );
};

export const useBookshelf = (): BookshelfContextType => {
    const context = useContext(BookshelfContext);
    if (!context) throw new Error('useBookshelf must be used inside BookshelfProvider');
    return context;
};
