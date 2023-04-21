import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Sound from "../Sound";
import { SoundContext } from "../../store/soundFunc";
import { AuthContext } from "../../store/auth";
import GenLoadingAnimation from "../lottie/GenLoadingAnimation";
import { fetchSounds, getUser } from "../../utils/api";
import NoDataAnimation from "../lottie/NoDataAnimation";
import { useFocusEffect } from "@react-navigation/native";

const Favorite = () => {
  const soundCtx = useContext(SoundContext);
  const authCtx = useContext(AuthContext);

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const noData = favorites.length <= 0;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        const user = await getUser();
        const fetchedSounds = await fetchSounds();
        setFavorites(() =>
          fetchedSounds.filter((sound) =>
            user.favoriteSounds.includes(sound.id)
          )
        );
        setLoading(false);
      };
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading && <GenLoadingAnimation width={100} height={100} />}

      {!loading && (
        <>
          {noData && <NoDataAnimation width={300} height={300} />}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favorites}
            initialNumToRender={5}
            renderItem={({ item, index }) => (
              <Sound
                onPress={soundCtx.soundPlayHandler.bind(
                  this,
                  index,
                  item.id,
                  favorites
                )}
                soundName={item.soundName}
                owner={item.owner}
                image={item.image}
                url={item.url}
                id={item.id}
                index={index}
                currentArray={favorites}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
