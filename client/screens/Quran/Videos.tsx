import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';

const videos = [
  { id: 'r1gbseLnnJg', title: 'Video 1' },
  { id: 'RICC_OufDk0', title: 'Video 2' },
  { id: 'YkPvNXFUkXk', title: 'Video 3' },
  { id: '-VtWyzNA-zI', title: 'Video 4' },
  { id: 'ncHKewujxdg', title: 'Video 5' },
  { id: 'sK6VdZtSino', title: 'Video 6' },
  { id: 'v2Dgkbud1c0', title: 'Video 7' },
];

const VideoList: React.FC = () => {
  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.videoContainer}>
      <YouTubePlayer height={200} videoId={item.id} />
    </View>
  );

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  videoContainer: {
    marginBottom: 20,
  },
});

export default VideoList;
