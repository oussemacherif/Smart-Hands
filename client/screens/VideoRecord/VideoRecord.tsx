import React, {useState} from 'react';
import {Button, View, StyleSheet, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Video} from 'expo-av';

const VideoPicker = () => {
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const pickVideo = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to your photo library to pick a video.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri); // Set the video URI to display
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a Video" onPress={pickVideo} />
      {videoUri && (
        <Video
          source={{uri: videoUri}}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  video: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
});

export default VideoPicker;
