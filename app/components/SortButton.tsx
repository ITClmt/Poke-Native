import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Shadows } from "../constants/Shadows";
import useThemeColors from "../hooks/useThemeColors";
import Card from "./Card";
import Radio from "./Radio";
import Row from "./Row";
import ThemedText from "./ThemedText";

type Props = {
  value: "id" | "name";
  onChange: (s: "id" | "name") => void;
};

const options = [
  { label: "Number", value: "id" },
  { label: "Name", value: "name" },
] as const;

export default function SortButton({ value, onChange }: Props) {
  const buttonRef = useRef<View>(null);
  const colors = useThemeColors();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [position, setPosition] = useState<null | {
    top: number;
    right: number;
  }>(null);

  const onButtonPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height,
        right: Dimensions.get("window").width - x - width,
      });
    });
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View
          ref={buttonRef}
          style={[styles.button, { backgroundColor: colors.grayLight }]}
        >
          <Image
            source={
              value === "id"
                ? require("@/assets/images/sort.png")
                : require("@/assets/images/text_format.png")
            }
            width={16}
            height={16}
          />
        </View>
      </Pressable>
      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onRequestClose={onClose}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View
          style={[styles.popup, { backgroundColor: colors.tint, ...position }]}
        >
          <ThemedText
            style={styles.title}
            variant="subtitle2"
            color="grayWhite"
          >
            Sort by :
          </ThemedText>
          <Card style={styles.card}>
            {options.map((o) => (
              <Pressable key={o.value} onPress={() => onChange(o.value)}>
                <Row gap={8}>
                  <Radio checked={value === o.value} />
                  <ThemedText>{o.label}</ThemedText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 32,
    width: 32,
    borderRadius: 32,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  popup: {
    position: "absolute",
    width: 113,
    padding: 4,
    borderRadius: 12,
    paddingTop: 16,
    gap: 16,
    ...Shadows.dp2,
  },
  title: {
    paddingLeft: 20,
  },
  card: {
    padding: 16,
    marginHorizontal: 2,
    gap: 16,
    justifyContent: "center",
  },
});
