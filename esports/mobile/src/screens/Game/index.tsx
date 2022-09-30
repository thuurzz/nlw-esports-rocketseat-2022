import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";

import { styles } from "./styles";

export function Game() {
  const route = useRoute();
  console.log(route.params);
  return (
    <Background>
      <SafeAreaView style={styles.container}></SafeAreaView>
    </Background>
  );
}
