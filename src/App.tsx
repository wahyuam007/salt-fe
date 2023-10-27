import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from './router';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {
            army: [
              '#FFF5F5',
              '#FFE3E3',
              '#FFC9C9',
              '#FFA8A8',
              '#FF8787',
              '#FF6B6B',
              '#7879F1',
              '#F03E3E',
              '#E03131',
              '#C92A2A',
            ],
          },
          primaryColor: 'army',
        }}
      >
        <ModalsProvider>
          <NotificationsProvider position="bottom-left" style={{ minWidth: 700 }}>
            <Router />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
