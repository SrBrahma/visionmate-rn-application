import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlashList } from '@shopify/flash-list';
import Fuse from 'fuse.js';
import { ErrorScreen } from '../../components/ErrorScreen';
import { Header } from '../../components/Header';
import { LoadingScreen } from '../../components/LoadingScreen';
import { Colors } from '../../main/constsUi';
import type { User } from '../../main/users';
import { useUsersQuery } from '../../main/users';
import type { ScreenProps_Root } from './Root';



export const usersSearchPlaceholder = 'First name or city';

function Row({ value, iconName }: {
  value: string;
  iconName: string;
}): JSX.Element {
  return (
    // Text instead of View to better align the icon and text
    // numberOfLines={1} & adjustsFontSizeToFit & flexShrink to respect Orange Button space.
    <Text numberOfLines={1} adjustsFontSizeToFit style={stylesItem.row}>
      <MaterialCommunityIcons name={iconName} style={stylesItem.rowIcon}/>
      <Text style={stylesItem.rowText}>{' ' + value}</Text>
    </Text>
  );
}

function UserItemNoMemo({ user, onPress, isOrange, onOrangePress }: {
  user: User;
  onPress: (user: User) => void;
  isOrange: boolean;
  onOrangePress: (user: User) => void;
}) {
  return <Pressable
    style={[stylesItem.container, isOrange && stylesItem.containerIsOrange]}
    onPress={() => onPress(user)}
    android_ripple={{ color: '#00000017' }}
  >
    <View style={stylesItem.leftColumn}>
      {/* .medium is slower than the .thumbnail but it's prettier. */}
      <FastImage source={{ uri: user.picture.medium }} style={stylesItem.image}/>
      <View style={{ flexDirection: 'row', flexShrink: 1 }}>
        <View>
          <Row iconName='account' value={`${user.name.first} ${user.name.last}`}/>
          <Row iconName='city' value={user.location.city}/>
          <Row iconName='email' value={user.email}/>
        </View>
      </View>
    </View>
    <View style={stylesItem.orangeButtonContainer}>
      <Pressable
        android_ripple={{ color: '#fff3' }}
        style={stylesItem.orangeButton}
        onPress={() => onOrangePress(user)}
      >
        <MaterialCommunityIcons name='fruit-pineapple' style={stylesItem.orangeButtonIcon}/>
      </Pressable>
    </View>
  </Pressable>;
}

// Improve the performance by shallow comparing the props.
const UserItem = React.memo(UserItemNoMemo);


const stylesItem = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerIsOrange: {
    backgroundColor: 'orange',
  },
  leftColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  row: {
    flexDirection: 'row',
    flexShrink: 1,
    paddingRight: 15, // Stay a bit away from the orange button
  },
  rowIcon: {
    color: Colors.text,
  },
  rowText: {
    fontFamily: 'Inter-Regular',

    flexDirection: 'row',
    color: Colors.text,
  },
  orangeButtonContainer: {
    borderRadius: 10, // Limit the ripple
    overflow: 'hidden',
  },
  orangeButton: {
    width: 40,
    height: 40,
    backgroundColor: 'hsl(27, 95%, 52%)',
    borderLeftColor: 'hsl(23, 95%, 75%)', // Just to give it a simple 3d-like
    borderTopColor: 'hsl(23, 95%, 75%)',
    borderRightColor: 'hsl(23, 85%, 54%)',
    borderBottomColor: 'hsl(23, 85%, 54%)',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeButtonIcon: {
    color: '#fff',
    fontSize: 25,
  },
});



export function Screen_Users({ navigation }: ScreenProps_Root<'Users'>): JSX.Element {

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    navigation.setOptions({
      // We set this again so we can set the onChangeText prop.
      header: (p) => <Header
        {...p}
        showSearchBar
        searchTextInputProps={{
          placeholder: usersSearchPlaceholder,
          onChangeText: setSearchText,
          // value: searchText, // Not using this as it would cause some bugs when erasing the input (duplicating what was deleted)
        }}
      />,
    });
  }, [navigation]);

  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  const usersQuery = useUsersQuery();
  const sortedData = useMemo(() => usersQuery.data?.sort((a, b) => a.name.first.localeCompare(b.name.first)), [usersQuery.data]);

  const fuse = useMemo(() => new Fuse(sortedData ?? [], {
    keys: ['name.first', 'location.city'],
    // Changed those empirically to filter out very different results - https://fusejs.io/api/options.html
    threshold: 0.3,
    distance: 10,
  }), [sortedData]);

  const filteredData = useMemo(() => (searchText ? fuse.search(searchText).map((e) => e.item) : sortedData), [fuse, searchText, sortedData]);

  const onUserItemPress = useCallback((user: User) => {
    navigation.navigate('User', { uid: user.login.uuid });
  }, [navigation]);

  const onOrangePress = useCallback((user: User) => {
    // Reset if already selected
    if (user.login.uuid === selectedUid)
      setSelectedUid(null);
    else
      setSelectedUid(user.login.uuid);
  }, [selectedUid]);

  const renderItem = useCallback(({ item: user, extraData: selectedUid }: {item: User; extraData?: string | null}) => {
    return <UserItem user={user} onPress={onUserItemPress} isOrange={!!selectedUid && user.login.uuid !== selectedUid} onOrangePress={onOrangePress}/>;
  }, [onOrangePress, onUserItemPress]);

  const refetch = useCallback(() => {
    void usersQuery.refetch();
  }, [usersQuery]);

  if (usersQuery.isFetching)
    return <LoadingScreen/>;

  if (usersQuery.error)
    return <ErrorScreen error={usersQuery.error} onRetryPress={refetch}/>;

  return (
    <FlashList
      extraData={selectedUid}
      estimatedItemSize={90}
      refreshControl={<RefreshControl
        colors={[Colors.primary]}
        refreshing={usersQuery.isRefetching}
        onRefresh={refetch}
      />}
      keyboardShouldPersistTaps='never'
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(user) => user.login.uuid}
      ItemSeparatorComponent={() => <View style={styles.separator}/>}
    />
  );
}


const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: '#2222',
    // Using a full width instead of eg 85% as if the items change the color to orange, there would be white lines on both ends, as they aren't orange-painted.
    width: '85%',
    alignSelf: 'center',
  },
});
