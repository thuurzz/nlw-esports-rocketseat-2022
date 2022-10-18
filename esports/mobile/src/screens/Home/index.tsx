import { View, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import logoImg from "../../assets/logo-nlw-esports.png";

import { Gamecard, GameCardProps } from "../../components/Gamecard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    try {
      fetch("http://10.0.0.141:3333/games")
        .then((resp) => resp.json())
        .then((data) => setGames(data));
    } catch (error: any) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
      throw error;
    }
  }, []);

  const navigation = useNavigation();

  function handleClickGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu Duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Gamecard data={item} onPress={() => handleClickGame(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
