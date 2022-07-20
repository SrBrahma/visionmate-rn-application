import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Header } from '../../components/Header';
import { Screen_Index } from './Index';
import { Screen_User } from './User';
import { Screen_Users, usersSearchPlaceholder } from './Users';



export type ParamList_Root = {
  Index: undefined;
  Users: undefined;
  User: {
    uid?: string;
    getRandom?: boolean;
  };
};

export type ScreenProps_Root<S extends keyof ParamList_Root = keyof ParamList_Root> = StackScreenProps<ParamList_Root, S>;

const Stack = createStackNavigator<ParamList_Root>();

export function Root_Navigator(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName='Index'
      screenOptions={{
        headerShown: true,
        header: (p) => <Header {...p}/>,
      }}
      detachInactiveScreens={false}
    >
      <Stack.Screen name='Index' component={Screen_Index} options={{ headerShown: false }}/>
      <Stack.Screen name='Users' component={Screen_Users} options={{
        headerTitle: 'Users List',
        // We set this here (without onChangeText) so it is rendered also on the first render, before the useEffect sets it.
        header: (p) => <Header {...p} showSearchBar searchTextInputProps={{
          placeholder: usersSearchPlaceholder,
        }}/>,
      }}/>
      <Stack.Screen name='User' component={Screen_User}/>
    </Stack.Navigator>
  );
}