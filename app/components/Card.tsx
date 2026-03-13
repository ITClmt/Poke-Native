import { View, type ViewProps, type ViewStyle } from "react-native";
import { Shadows } from "../constants/Shadows";
import useThemeColors from "../hooks/useThemeColors";

type CardProps = ViewProps

export default function Card({style, ...rest}: CardProps) {
    const colors = useThemeColors();
    return (
        <View style= {[style, styles, {backgroundColor: colors.grayWhite}]} {...rest} />
    );
}

const styles = {
    borderRadius: 8,
    ...Shadows.dp2,
} satisfies ViewStyle