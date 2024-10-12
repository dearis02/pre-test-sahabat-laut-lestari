'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

interface QueryProviderProps {
    children: ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 1000 * 60,
            },
        }
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;
