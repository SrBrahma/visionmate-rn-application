import { useCallback } from 'react';
import { Linking, StyleProp, ViewStyle } from 'react-native';
import { Alert, Dimensions, Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import { Colors } from '../../main/constsUi';
import { useUsersQuery } from '../../main/users';
import { getRandomInt } from '../../main/utils/utils';
import type { ScreenProps_Root } from './Root';



function Button({ onPress, text, containerStyle, iconName }: {
  text: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  iconName: string;
}): JSX.Element {
  return (
    <View style={[stylesButton.container, containerStyle]}>
      <Pressable
        android_ripple={{ color: '#00000017' }}
        style={stylesButton.content}
        onPress={onPress}
      >
        <MaterialCommunityIcons name={iconName} style={stylesButton.icon}/>
        <Text style={stylesButton.text}>{text}</Text>
        {/* To keep the first button's text, which is smaller, centered. */}
        <View style={stylesButton.rightSpace}/>
      </Pressable>
    </View>
  );
}

const stylesButton = StyleSheet.create({
  container: {
    borderRadius: 999, // To contain Android's ripple
    overflow: 'hidden',
  },
  icon: {
    color: Colors.primary,
    fontSize: 22,
    marginLeft: 26,
    marginRight: 13,
  },
  rightSpace: {
    width: 44,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  text: {
    fontFamily: 'DMSans-Medium',
    textAlign: 'center',
    includeFontPadding: false, // Else it messes vertical centering
    color: Colors.primary,
    fontSize: 18,
    letterSpacing: 0.8,
  },
});

export function Screen_Index({ navigation }: ScreenProps_Root<'Index'>): JSX.Element {

  const usersQuery = useUsersQuery();

  const navigateToRandomUser = useCallback(() => {
    const users = usersQuery.data;
    if (!users?.length) {
      Alert.alert('Error', 'There are no available users.');
      return;
    }
    const userIndex = getRandomInt(0, users.length - 1);
    navigation.navigate('User', { uid: users[userIndex]!.login.uuid });
  }, [navigation, usersQuery.data]);

  return (<View style={styles.container}>
    {/* Hides Android's StatusBar so Video is fullscreen */}
    <StatusBar backgroundColor='#0000' translucent/>
    <Video
      source={require('../../../assets/visionmate-video.mp4')}
      style={styles.backgroundVideo}
      muted={true}
      repeat={true}
      resizeMode='cover'
    />
    {/* I noticed that on the website there is a pattern above the video, so I also got it and added it here */}
    <Image source={require('../../../assets/bgpattern.png')} style={styles.bgPattern} resizeMode='repeat'/>
    <Image source={require('../../../assets/visionmate-logo.png')} style={styles.logo}/>
    <View style={{ alignSelf: 'center', alignItems: 'stretch' }}>
      <Button text='List Users' iconName='format-list-text' onPress={() => navigation.navigate('Users')}/>
      <Button text='Randomize User' iconName='dice-multiple-outline' onPress={navigateToRandomUser} containerStyle={{ marginTop: 26 }}/>
      <Text
      style={styles.about}

      onPress={() => Linking.openURL('https://github.com/SrBrahma/visionmate-rn-application')}
    >
      {'About'}
    </Text>
    </View>

  </View>);
}


const videoHeight = Dimensions.get('window').height + (StatusBar.currentHeight ?? 0);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '45%',
    paddingBottom: '12%',
  },
  bgPattern: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    transform: [{ scale: 2.5 }], // We resize it a bit else it wouldn't be kinda visible as images uses pixels sizings instead of DP
  },
  backgroundVideo: {
    height: videoHeight,
    alignItems: 'stretch',
    ...StyleSheet.absoluteFillObject,
  },
  logo: {
    alignSelf: 'center',
    width: '80%',
    // To keep aspect ration, height must explicitly be undefined or 'auto' - https://stackoverflow.com/a/53482563
    height: 'auto',
    aspectRatio: 775 / 533,
  },
  about: {
    marginTop: 32,
    fontSize: 18,
    textAlign: 'center',
    color: '#fffd',
    textDecorationLine: 'underline'
  }
});