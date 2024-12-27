import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const GifExample = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://s4.ezgif.com/tmp/ezgif-4-5c78c16475.gif' }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: 200,
    height: 200,
    backgroundColor: 'transparent',
  },
});

export default GifExample;
