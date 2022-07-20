import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../main/constsUi';


/** A simple screen with a loading indicator. */
export function LoadingScreen(): JSX.Element {
  return <View style={styles.container}>
    <ActivityIndicator size={60} color={Colors.primary}/>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '15%', // Put it a little to the top
  },
});