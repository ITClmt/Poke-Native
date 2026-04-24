import { View, ViewStyle, type ViewProps } from "react-native";

type Props = ViewProps & {
  gap?: number;
};

export default function Row({ style, gap, ...rest }: Props) {
  return (
    <View style={[rowStyle, gap ? { gap } : undefined, style]} {...rest} />
  );
}

const rowStyle = {
  flex: 0,
  flexDirection: "row",
  alignItems: "center",
} satisfies ViewStyle;
