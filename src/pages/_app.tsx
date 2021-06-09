import NextNprogress from 'nextjs-progressbar';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@shopify/polaris/dist/styles.css';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import { theme } from '@app/theme';
import { EnvService } from '@app/services/env.service';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: EnvService.isProd(),
      refetchIntervalInBackground: EnvService.isProd(),
      refetchOnWindowFocus: EnvService.isProd(),
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider theme={theme} i18n={enTranslations}>
        <Component {...pageProps} />
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <NextNprogress
        color="#64943E"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={{ showSpinner: false }}
      />
    </QueryClientProvider>
  );
}

export default MyApp;
