import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@react-app/i18n'

// PrimeReact imports (theme loaded dynamically via index.html)
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './primereact-overrides.css'

import App from './App'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useToastStore } from '@react-app/stores';

const MINUTE = 60 * 1000;

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      useToastStore.getState().addToast(
        `Failed to fetch data: ${error.message}`,
        'error'
      );
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      useToastStore.getState().addToast(
        `Operation failed: ${error.message}`,
        'error'
      );
    },
    onSuccess: () => {
      useToastStore.getState().addToast(
        'Operation completed successfully',
        'success'
      );
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: MINUTE * 5,
      gcTime: MINUTE * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
