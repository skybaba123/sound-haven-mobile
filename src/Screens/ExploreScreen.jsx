import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import HeadText from "../UI/HeadText";
import { ThemeContext } from "../store/theme";
import { theme } from "../utils/colors";
import Sound from "../components/Sound";
import { catData } from "../utils/allSounds";
import { SoundContext } from "../store/soundFunc";
import { useNavigation } from "@react-navigation/native";
import { fetchSounds } from "../utils/api";

const Category = ({ cover, title, id }) => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  const categoryNavHandler = () => {
    // navigation.navigate("SingleScreen", {
    //   screen: "categoryContent",
    //   params: { id, cover, title },
    // });
    navigation.navigate("categoryContent", { id, cover, title });
  };

  return (
    <ImageBackground
      imageStyle={{ borderRadius: 10 }}
      source={cover}
      style={{
        width: width > 411 ? 300 : 250,
        height: width > 411 ? 250 : 200,
        marginRight: 10,
      }}
    >
      <Pressable
        onPress={categoryNavHandler}
        android_ripple={{ color: theme[`sBg-${colorIndex}`] }}
        style={styles.imageBackground}
      >
        <Text style={[styles.text, { color: theme[`pT-${colorIndex}`] }]}>
          {title}
        </Text>
      </Pressable>
    </ImageBackground>
  );
};

const Header = () => {
  const colorIndex = useContext(ThemeContext).colorIndex;
  return (
    <View>
      <HeadText text="Explore" style={{ textAlign: "left" }} />

      <View style={{ marginTop: 20, marginBottom: 30 }}>
        <Text
          style={[styles.categoryText, { color: theme[`pT-${colorIndex}`] }]}
        >
          Category
        </Text>

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={catData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Category title={item.title} cover={item.cover} id={item.id} />
          )}
        />
      </View>

      <Text
        style={[
          styles.categoryText,
          { color: theme[`pT-${colorIndex}`], marginBottom: 15 },
        ]}
      >
        New Sounds
      </Text>
    </View>
  );
};

const ExploreScreen = () => {
  const soundCtx = useContext(SoundContext);
  const [newSounds, setNewSounds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const fetchedSounds = await fetchSounds();
    setNewSounds(() =>
      fetchedSounds.filter((sound) => sound.createdAt + 259200000 > Date.now())
    );
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={newSounds}
        initialNumToRender={5}
        renderItem={({ item, index }) => (
          <Sound
            onPress={soundCtx.soundPlayHandler.bind(
              this,
              index,
              item.id,
              newSounds
            )}
            soundName={item.soundName}
            owner={item.owner}
            image={item.image}
            url={item.url}
            id={item.id}
            index={index}
            currentArray={newSounds}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={Header}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: "5%",
  },

  imageBackground: {
    width: "100%",
    height: "100%",
    paddingTop: 15,
    paddingLeft: 5,
    resizeMode: "cover",
  },

  categoryText: {
    fontFamily: "montserrat-bold",
    fontSize: 17,
    marginBottom: 10,
  },

  text: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
  },
});
