<!-- <img src=".logo.png" alt=visionmateHenrique/><br/> -->

<div align="center">

[![TypeScript](https://badgen.net/npm/types/env-var)](http://www.typescriptlang.org/)
</div>

# Visionmate Techinical Test - Henrique Almeida

<!-- descriptionHere -->

Technical test for Visionmate made in 2 days. [Specifications](https://docs.google.com/document/d/11f0WuoDrUD9YkI0mEofYt246VmZW83o7xZkCCbgCBG4/edit?usp=sharing).

When I was thinking about its color pallete and its UI, I remembered Visionmate has a website and I decided to not only follow its color scheme but to also add its hero video, the diagonal pattern present above the video and its logo.

Project created using my [gev](https://github.com/SrBrahma/gev) npx tool, with the `rn` flavor to create React Native projects within a single command with my commonly used configs, such as my [eslint-config](https://github.com/SrBrahma/eslint-config-gev) and directories tree.

I took advantage of this project and used React-Query v4 to learn about it, still on beta but with [relevant improvements](https://tanstack.com/query/v4/docs/guides/migrating-to-react-query-4). [Installation](https://github.com/TanStack/query/issues/3790#issuecomment-1179431860).

I tried to balance the quality and not overdoing it. Some further improvements could be done, such as:

* Use https://github.com/Flipkart/recyclerlistview in the Users List for improved list performance

* The search bar could be on the Navigation's Header, but for time saving and just proof-of-concept I decided to leave it on the top of the Users List.

<br/>

## 💿 Installation
```bash
yarn install
```

### iOS
* Run `npx pod-install`.
* https://github.com/oblador/react-native-vector-icons#ios - Only `MaterialCommunityIcons.ttf` is required
* https://github.com/react-native-video/react-native-video/blob/master/API.md#ios-installation - May be required

## 📖 Usage

```bash
Start Metro with
  • yarn start

Run instructions for iOS:
  • yarn ios
  - or -
  • Open TestRN/ios/TestRN.xcodeproj in Xcode or run "xed -b ios"
  • Hit the Run button

Run instructions for Android:
  • Have an Android emulator running (quickest way to get started), or a device connected.
  • yarn android
```

Also: https://reactnative.dev/docs/running-on-device

## ℹ️ Info

* Uses JSX transform so `import React from 'react'` isn't required:
https://aryan-mittal.medium.com/enable-the-new-jsx-transform-in-react-native-0-64-aea4f686a640

https://github.com/facebook/metro/issues/646#issuecomment-799174473

* [Do use `npx react-native-asset` for adding fonts to react-native@>0.69](https://github.com/facebook/react-native/issues/34095#issuecomment-1174864177)

* Disabled automatic forced dark mode: https://stackoverflow.com/a/64339016

* We use react-native-video@next (v6) since v5 is broken.

* We use [Fuse.js](https://github.com/krisk/Fuse) as the fuzzy-search library.

* I haven't tested it on iOS as at the moment I don't have access to XCode and my (MacInCloud)[https://www.macincloud.com/] subscription isn't active.