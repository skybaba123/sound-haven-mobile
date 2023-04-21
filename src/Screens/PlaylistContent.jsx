import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { allSounds } from "../utils/allSounds";
import { SoundContext } from "../store/soundFunc";
import Sound from "../components/Sound";

const PlaylistContent = ({ route }) => {
  const soundCtx = useContext(SoundContext);

  const playlist = soundCtx.allSounds.filter((sound) =>
    route.params.playlist.includes(sound.id)
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={playlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Sound
            onPress={soundCtx.soundPlayHandler.bind(
              this,
              index,
              item.id,
              playlist
            )}
            soundName={item.soundName}
            owner={item.owner}
            image={item.image}
            url={item.url}
            id={item.id}
            index={index}
            currentArray={playlist}
          />
        )}
      />
    </View>
  );
};

export default PlaylistContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "20%",
    paddingHorizontal: "5%",
  },
});
