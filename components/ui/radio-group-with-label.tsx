import { RadioGroupItem } from "~/components/ui/radio-group";
import { View } from "react-native";
import { Label } from "./label";
import { Text } from "./text";

export function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: "SMALL" | "MEDIUM" | "LARGE";
  onLabelPress: () => void;
}) {
  return (
    <View className={"flex-row gap-2 items-center"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {value}
      </Label>
    </View>
  );
}
