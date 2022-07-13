import { useCallback } from 'react';
import { FlatList, Pressable } from 'react-native';
import type { User } from '../../main/users';
import { useUsersQuery } from '../../main/users';
import type { ScreenProps_Root } from './Root';


/** Each user item for the FlatList. */
function UserItem({ user, onPress }: {
  user: User;
  onPress: (user: User) => void;
}): JSX.Element {
  return <Pressable onPress={() => onPress(user)}>

  </Pressable>;
}


export function Screen_Users({ navigation }: ScreenProps_Root<'Users'>): JSX.Element {

  const usersQuery = useUsersQuery();

  const onUserItemPress = useCallback((user: User) => {
    navigation.navigate('User', { uid: user.login.uuid });
  }, [navigation]);

  return (
    <FlatList
      data={usersQuery.data}
      renderItem={({ item }) => <UserItem user={item} onPress={onUserItemPress}/>}
    />
  );
}
