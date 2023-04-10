import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { allSounds } from "../utils/allSounds";
import { SoundContext } from "../store/soundFunc";
import Sound from "../components/Sound";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";

const PlaylistContent = ({ route }) => {
  const soundCtx = useContext(SoundContext);
  const colorIndex = useContext(ThemeContext).colorIndex;
  const categoryList = allSounds.filter((sounds) =>
    sounds.category.includes(route.params.title)
  );

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: "5%" }}>
        <Text style={[styles.text, { color: theme[`pT-${colorIndex}`] }]}>
          {route.params.title}
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={categoryList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Sound
            onPress={soundCtx.soundPlayHandler.bind(
              this,
              index,
              item.id,
              categoryList
            )}
            soundName={item.soundName}
            owner={item.owner}
            image={item.image}
            url={item.url}
            id={item.id}
            index={index}
            currentArray={categoryList}
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
    paddingTop: "10%",
    paddingHorizontal: "5%",
  },

  text: {
    fontFamily: "satisfy",
    fontSize: 30,
    textAlign: "center",
  },
});
