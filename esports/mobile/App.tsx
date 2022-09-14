import { Background } from "./src/components/Background";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </Background>
  );
}
