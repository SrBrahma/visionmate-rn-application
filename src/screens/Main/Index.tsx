import { useCallback } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { useUsersQuery } from '../../main/users';
import { getRandomInt } from '../../main/utils/utils';
import type { ScreenProps_Root } from './Root';



function Button({ onPress, text }: {
  text: string;
  onPress: () => void;
}): JSX.Element {
  return <Pressable onPress={onPress}>
    <Text>{text}</Text>
  </Pressable>;
}

export function Screen_Index({ navigation }: ScreenProps_Root<'Index'>): JSX.Element {

  const usersQuery = useUsersQuery();

  const navigateToRandomUser = useCallback(() => {
    const users = usersQuery.data;
    if (!users?.length) {
      Alert.alert('Error', 'There are no available users.');
      return;
    }

    const userIndex = getRandomInt(0, users.length - 1);

    const user = users[userIndex]!;

    navigation.navigate('User', { uid: user.login.uuid });
  }, [navigation, usersQuery.data]);

  return (<ScrollView>
    <Button text='List Users' onPress={() => navigation.navigate('Users')}/>
    <Button text='Randomize User' onPress={navigateToRandomUser}/>
  </ScrollView>);
}


const styles = StyleSheet.create({
  container: {
  },
});