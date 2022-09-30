import { View } from "react-native";
import { DuoInfo } from "../DuoInfo";

import { styles } from "./styles";

export interface DuoProps {
  hourEnd: string;
  hourStart: string;
  id: string;
  name: string;
  useVoiceChannel: true;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoProps;
}

export function Duocard({ data }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />
      <DuoInfo label="Tempo de jogo" value={`${data.yearsPlaying} anos`} />
      <DuoInfo label="Disponibilidade" value={`${data.weekDays.length} dias`} />
      <DuoInfo
        label="Chamada de áudio?"
        value={`${data.hourEnd}h`}
        colorValue="red"
      />
    </View>
  );
}
