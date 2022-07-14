import type { TextInputProps } from 'react-native';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type { StackHeaderProps } from '@react-navigation/stack';
import { Colors } from '../main/constsUi';




type HeaderProps = StackHeaderProps & {
  headerBackProps?: Partial<HeaderBackButton>;
  showSearchBar?: boolean;
  searchTextInputProps?: TextInputProps;
};

export function Header({
  headerBackProps,
  showSearchBar,
  searchTextInputProps,
  ...props
}: HeaderProps): JSX.Element | null {
  const hasRtn = !props.options.headerLeft;

  let title = props.options.headerTitle || props.options.title || props.route.name || '';

  // Don't care.
  if (typeof title !== 'string')
    title = '';

  // But: this way, we won't set StatusBarProvider. Maybe move this conditional to inside the StatusBar?
  if (!props.options.headerShown)
    return null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Just to cancel the TextInput focus when pressing outside. */}
      <ScrollView>
        <View style={styles.row}>
          {hasRtn && <HeaderBackButton onPress={() => props.navigation.goBack()} {...headerBackProps} color={Colors.text}/>}
          {/* pointerEvents so the title doesn't uselessly steals the press event of the rtn button. */}
          <View pointerEvents='none'>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>{title}</Text>
          </View>
        </View>
        {showSearchBar && <View style={styles.searchRow}>
          <View pointerEvents='none'>
            <MaterialCommunityIcons name='magnify' style={styles.searchIcon}/>
          </View>
          <TextInput
            numberOfLines={1}
            style={styles.textInput}
            selectionColor='#666'
            placeholderTextColor={Colors.placeholder}
            {...searchTextInputProps}
          />
        </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    elevation: 5,
  },
  row: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: Colors.text,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.4,
    fontSize: 22,
    marginLeft: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginLeft: 2,
    marginRight: 1, // Just a bit else the right border line gets clipped
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 3,
    borderColor: Colors.primary,
    overflow: 'hidden',
  },
  textInput: {
    color: Colors.text,
    letterSpacing: 0.2,
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 14,
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    includeFontPadding: false,
    flexGrow: 1,
  },
  searchIcon: {
    color: '#fff',
    fontSize: 31,
    alignSelf: 'stretch',
    paddingTop: 6,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 6,
    backgroundColor: Colors.primary,
    includeFontPadding: false,
  },
});


type HeaderBackButton = {
  onPress: () => void;
  color: string;
};

export const headerIconSize = 26;

export function HeaderBackButton({ onPress, color }: HeaderBackButton): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={30}
      android_ripple={{ color: '#0000001a', borderless: true }}
    >
      <MaterialCommunityIcons name='chevron-left' size={headerIconSize} color={color}/>
    </Pressable>
  );
}