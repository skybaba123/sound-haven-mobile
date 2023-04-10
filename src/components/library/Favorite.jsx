import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Sound from "../Sound";
import { allSounds } from "../../utils/allSounds";
import { SoundContext } from "../../store/soundFunc";
import { AuthContext } from "../../store/auth";
import GenLoadingAnimation from "../lottie/GenLoadingAnimation";
import { getUser } from "../../utils/api";
import NoDataAnimation from "../lottie/NoDataAnimation";
import { useFocusEffect } from "@react-navigation/native";

const Favorite = () => {
  const soundCtx = useContext(SoundContext);
  const authCtx = useContext(AuthContext);
  const favorites = allSounds.filter((sound) =>
    authCtx.favoriteSounds.includes(sound.id)
  );
  const [loading, setLoading] = useState(false);
  const noData = favorites.length <= 0;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     const data = await getUser();
  //     authCtx.setFavoriteSounds(data.favoriteSounds);
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        const data = await getUser();
        authCtx.setFavoriteSounds(data.favoriteSounds);
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
