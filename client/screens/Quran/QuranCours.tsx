import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import VideoList from './Videos';

const QuranCours: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <VideoList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default QuranCours;
