import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity, View, Image, FlatList, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { Duocard, DuoProps } from "../../components/Duocard";
import { useEffect, useState } from "react";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
  const [duos, setDuos] = useState<DuoProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>("");

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    try {
      fetch(`http://10.0.0.141:3333/ads/${adsId}/discord`)
        .then((resp) => resp.json())
        .then((data) => setDiscordDuoSelected(data.discord));
    } catch (error: any) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
      throw error;
    }
  }

  useEffect(() => {
    try {
      fetch(`http://10.0.0.141:3333/games/${game.id}/ads`)
        .then((resp) => resp.json())
        .then((data) => setDuos(data));
    } catch (error: any) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
      throw error;
    }
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Duocard
              data={item}
              onConect={() => {
                getDiscordUser(item.id);
              }}
            />
          )}
          horizontal
          contentContainerStyle={styles.contentList}
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>

      <DuoMatch
        visible={discordDuoSelected.length > 0}
        discord={discordDuoSelected}
        onClose={() => setDiscordDuoSelected("")}
      />
    </Background>
  );
}
