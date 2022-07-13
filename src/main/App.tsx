import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { Root_Navigator } from '../screens/Main/Root';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {

      staleTime: Infinity,
    },
  },
});

export function App(): JSX.Element {
  // return (

  //   <View style={{ flex: 1, backgroundColor: 'red' }}/>
  // );
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>

        <NavigationContainer>

          <SafeAreaView style={{ flex: 1 }}>
            {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
            <Root_Navigator/>
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
