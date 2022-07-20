import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useFocusEffect } from '@react-navigation/native';
import { ErrorScreen } from '../../components/ErrorScreen';
import { LoadingScreen } from '../../components/LoadingScreen';
import { Colors } from '../../main/constsUi';
import { useUsersQuery } from '../../main/users';
import { getRandomInt } from '../../main/utils/utils';
import type { ScreenProps_Root } from './Root';



function Row({ header, value }: {header: string; value: string | number}) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.row}>
        <Text style={styles.infoHeader}>{header}</Text>
        <Text lineBreakMode='head' style={styles.info}>{value}</Text>
      </View>
    </View>
  );
}

export function Screen_User({ route }: ScreenProps_Root<'User'>): JSX.Element {

  const usersQuery = useUsersQuery();
  const users = usersQuery.data;

  const [uid, setUid] = useState<string | null>(() => {
    return route.params.uid ?? null;
  });

  // With useFocusEffect, it's only called after each render if the screen is focused.
  // https://reactnavigation.org/docs/use-focus-effect/
  useFocusEffect(useCallback(() => {
    if (users && route.params.getRandom) {
      const userIndex = getRandomInt(0, users.length - 1);
      const uid = users[userIndex]!.login.uuid;
      setUid(uid);
    }
  }, [route.params.getRandom, users]));

  const refetch = useCallback(() => {
    void usersQuery.refetch();
  }, [usersQuery]);

  if (usersQuery.isFetching)
    return <LoadingScreen/>;

  if (usersQuery.error)
    return <ErrorScreen error={usersQuery.error} onRetryPress={refetch}/>;

  if (!users)
    return <ErrorScreen error='There are no available users.'/>;

  const user = users.find((user) => user.login.uuid === uid);

  if (!user)
    return <ErrorScreen error='An error occurred while loading this user.'/>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Using FastImage as it may be cached if used .large in Users List. */}
      <FastImage source={{ uri: user.picture.large }} style={styles.image}/>
      <View style={styles.separator}/>
      <View style={styles.rows}>
        <Row header='Name' value={`${user.name.first} ${user.name.last}`}/>
        <Row header='Username' value={user.login.username}/>
        <Row header='Country' value={user.location.country}/>
        <Row header='State' value={user.location.state}/>
        <Row header='City' value={user.location.city}/>
        <Row header='Street' value={`${user.location.street.name}, ${user.location.street.name}`}/>
        <Row header='Postcode' value={user.location.postcode}/>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: '15%',
  },
  image: {
    height: 240,
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: '#eee',
  },
  separator: {
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: '#e2e2e2',
    marginTop: '15%',
    width: '90%',
  },
  rows: {
    marginTop: '15%',
  },
  row: {
    marginTop: 7,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  infoHeader: {
    fontFamily: 'DMSans-Medium',
    color: Colors.text,
    fontSize: 17,
    paddingRight: 50,
    alignSelf: 'center',
  },
  info: {
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    textAlign: 'right',
    color: Colors.text,
    flexShrink: 1, // Break line if needed
  },
});