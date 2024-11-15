import { TouchableOpacity, View } from "react-native";
import { Text } from "../ui/text";
import type { ProductsT } from "~/app/(tabs)/products";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { blurhash } from "~/lib/utils";

export default function ProductCard({ item }: { item: ProductsT }) {
  return (
    <View style={{ width: "49%" }}>
      <Link
        href={{ pathname: "/(tabs)/product/[id]", params: { id: item.id } }}
        asChild
      >
        <TouchableOpacity disabled={item.quantity === 0}>
          <Image
            source={item.image}
            placeholder={{ blurhash }}
            contentFit="cover"
            style={{ height: 400, borderRadius: 10 }}
            transition={1000}
          />
          {item.quantity === 0 && (
            <View className="absolute inset-0 bg-black/50 flex justify-center items-center">
              <Text className="text-white text-lg font-bold">SOLD OUT</Text>
            </View>
          )}

          <Text className="text-4xl" style={{ fontWeight: "bold" }}>
            ₱{item.price.toLocaleString()}
          </Text>
          <Text className="text-4xl">{item.name}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
