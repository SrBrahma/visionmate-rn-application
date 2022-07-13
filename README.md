<!-- <img src=".logo.png" alt=visionmateHenrique/><br/> -->

<div align="center">

[![TypeScript](https://badgen.net/npm/types/env-var)](http://www.typescriptlang.org/)
</div>

# Visionmate Techinical Test - Henrique Almeida

<!-- descriptionHere -->

Technical test for Visionmate. [Specifications](https://docs.google.com/document/d/11f0WuoDrUD9YkI0mEofYt246VmZW83o7xZkCCbgCBG4/edit?usp=sharing).

Project created using my [gev](https://github.com/SrBrahma/gev) npx tool, with the `rn` flavor to create React Native projects within a single command with my commonly used configs, such as my [eslint-config](https://github.com/SrBrahma/eslint-config-gev) and directories tree.

I took advantage of this project and used React-Query v4 to learn about it, still on beta but with [important improvements from v3](https://tanstack.com/query/v4/docs/guides/migrating-to-react-query-4). [Installation](https://github.com/TanStack/query/issues/3790#issuecomment-1179431860).
<br/>

## 💿 Installation
```bash
yarn install
```

## 📖 Usage

```bash
Run instructions for iOS:
  • cd "/home/hb/Dev/TestRN" && npx react-native run-ios
  - or -
  • Open TestRN/ios/TestRN.xcodeproj in Xcode or run "xed -b ios"
  • Hit the Run button

Run instructions for Android:
  • Have an Android emulator running (quickest way to get started), or a device connected.
  • cd "/home/hb/Dev/TestRN" && npx react-native run-android
```

Also: https://reactnative.dev/docs/running-on-device

## ℹ️ Info

* Uses JSX transform so `import React from 'react'` isn't required:
https://aryan-mittal.medium.com/enable-the-new-jsx-transform-in-react-native-0-64-aea4f686a640

https://github.com/facebook/metro/issues/646#issuecomment-799174473

* Disabled automatic forced dark mode: https://stackoverflow.com/a/64339016

## 📰 [Changelog](CHANGELOG.md)