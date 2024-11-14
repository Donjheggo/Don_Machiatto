import { View } from "react-native";
import { Text } from "../ui/text";
import { Image } from "expo-image";
import { blurhash } from "~/lib/utils";
import type { CartItemT } from "~/context/cart-context";

export default function CartCard({ item }: { item: CartItemT }) {
  return (
    <View className="flex-row items-center justify-between p-4 border-b border-secondary">
      <View className="flex-row items-center flex-1">
        <Image
          source={item.product_image}
          placeholder={blurhash}
          contentFit="contain"
          style={{ width: 100, height: 100, borderRadius: 8 }}
          transition={1000}
        />
        <View className="ml-4 flex-1">
          <View className="flex-row items-center mt-2">
            <Text className="text-3xl font-bold">{item.product_name}</Text>
          </View>
          <View>
            <Text className="text-3xl">x{item.product_quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
