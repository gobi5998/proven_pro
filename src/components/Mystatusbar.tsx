import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  StatusBarProps,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MyStatusBarProps extends StatusBarProps {
  backgroundColor: string;
}

const MyStatusBar: React.FC<MyStatusBarProps> = ({ backgroundColor, ...props }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.statusBar, { backgroundColor, height: insets.top }]}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        barStyle={'light-content'}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    zIndex: 1000,
  },
});

export default MyStatusBar;
