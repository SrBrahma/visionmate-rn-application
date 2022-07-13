import type { StackScreenProps } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Screen_Index } from './Index';
import { Screen_User } from './User';
import { Screen_Users } from './Users';



export type ParamList_Root = {
  Index: undefined;
  Users: undefined;
  User: { uid: string };
};

export type ScreenProps_Root<S extends keyof ParamList_Root = keyof ParamList_Root> = StackScreenProps<ParamList_Root, S>;

const Stack = createStackNavigator<ParamList_Root>();

export function Root_Navigator(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName='Index'
      screenOptions={{
        headerShown: true,
      }}
      detachInactiveScreens={false}
    >
      <Stack.Screen name='Index' component={Screen_Index}/>
      <Stack.Screen name='Users' component={Screen_Users}/>
      <Stack.Screen name='User' component={Screen_User}/>
    </Stack.Navigator>

  );
}