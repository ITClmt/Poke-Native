import { Image, StyleSheet, TextInput } from "react-native";
import useThemeColors from "../hooks/useThemeColors";
import Row from "./Row";

type Props = {
  value: string;
  onChange: (s: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const colors = useThemeColors();
  return (
    <Row
      gap={8}
      style={[styles.wrapper, { backgroundColor: colors.grayLight }]}
    >
      <Image
        source={require("@/assets/images/search.png")}
        width={16}
        height={16}
      />
      <TextInput
        onChangeText={onChange}
        value={value}
        placeholder="Search by name"
        style={styles.input}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 16,
    fontSize: 10,
    lineHeight: 16,
  },
});
