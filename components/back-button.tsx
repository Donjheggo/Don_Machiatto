import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "./ui/text";

export default function BackButton() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("../")}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <ChevronLeft color="#B08968" size={30} />
      <Text className="text-lg">Back</Text>
    </Pressable>
  );
}
