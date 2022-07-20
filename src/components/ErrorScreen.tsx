import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../main/constsUi';


/** Returns the error.message if error isn't null. Fallbacks to `error` and then fallback=`"Error"` */
export function getErrorMessage(err: any, fallback: string = 'Error'): string {
  return ((typeof err === 'object' && err.message) ? err.message : err) || fallback;
}


export function ErrorScreen({ error, retryText = 'Try Again', onRetryPress }: {
  /** An Error object or an string. If an object, the error message will be taken from it. */
  error: any;
  retryText?: string;
  onRetryPress?: () => void;
}): JSX.Element {
  return (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons name='robot-dead-outline' style={styles.errorIcon}/>
      <Text style={styles.errorText}>{getErrorMessage(error)}</Text>
      {!!onRetryPress && <View style={styles.retryContainer}>
        <Pressable style={styles.retryPressable} onPress={onRetryPress} android_ripple={{ color: '#fff3' }}>
          <Text style={styles.retryText}>{retryText}</Text>
        </Pressable>
      </View>}
    </View>
  );
}


const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  errorIcon: {
    color: '#777',
    fontSize: 90,
  },
  errorText: {
    color: Colors.text,
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    marginTop: '10%',
    marginHorizontal: 30,
    textAlign: 'center',
  },
  retryContainer: {
    marginTop: '35%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  retryPressable: {
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  retryText: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    fontFamily: 'DMSans-Medium',
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
});