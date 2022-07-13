import { ScrollView, Text } from 'react-native';
import { useUsersQuery } from '../../main/users';
import type { ScreenProps_Root } from './Root';



export function Screen_User({ route }: ScreenProps_Root<'User'>): JSX.Element {

  const usersQuery = useUsersQuery();

  const user = usersQuery.data?.find((user) => user.login.uuid === route.params.uid);

  if (!user)
    return <Text>{'An error occurred while loading the user.'}</Text>;

  return (
    <ScrollView>
      <Text>{user.email}</Text>
    </ScrollView>
  );
}
