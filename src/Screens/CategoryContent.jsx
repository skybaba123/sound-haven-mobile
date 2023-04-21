import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SoundContext } from "../store/soundFunc";
import Sound from "../components/Sound";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";
import { fetchSounds } from "../utils/api";
import GenLoadingAnimation from "../components/lottie/GenLoadingAnimation";

const PlaylistContent = ({ route }) => {
  const soundCtx = useContext(SoundContext);
  const colorIndex = useContext(ThemeContext).colorIndex;
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedSounds = await fetchSounds();
      setCategoryList(() =>
        fetchedSounds.filter((sound) =>
          sound.category.includes(route.params.title)
        )
      );
      setLoading(false);
    };
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const fetchedSounds = await fetchSounds();
    setCategoryList(() =>
      fetchedSounds.filter((sound) =>
        sound.category.includes(route.params.title)
      )
    );
    setRefreshing(false);
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={route.params.cover}>
      <View style={styles.container}>
        <View style={{ marginBottom: "5%" }}>
          <Text style={[styles.text, { color: theme[`pT-${colorIndex}`] }]}>
            {route.params.title}
          </Text>
        </View>

        {loading && <GenLoadingAnimation width={100} height={100} />}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={categoryList}
          initialNumToRender={5}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
    </ImageBackground>
  );
};

export default PlaylistContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    paddingHorizontal: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.90)",
  },

  text: {
    fontFamily: "satisfy",
    fontSize: 30,
    textAlign: "center",
  },
});
