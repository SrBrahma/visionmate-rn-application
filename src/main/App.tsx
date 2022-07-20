import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { Theme } from '@react-navigation/native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Root_Navigator } from '../screens/Main/Root';



const queryClient = new QueryClient({
  // Mute errors logs https://github.com/TanStack/query/issues/125
  logger: {
    log: () => {},
    warn: () => {},
    error: () => {},
  },
  defaultOptions: {
    queries: {
      retry: false, // Just for better error and loading demonstration.
    },
  },
});

// Sets the app's background color https://reactnavigation.org/docs/themes/#basic-usage
const navTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};


export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar barStyle='light-content' backgroundColor='#fff'/>
          <Root_Navigator/>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}