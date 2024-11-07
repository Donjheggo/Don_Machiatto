import {
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "~/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import type { ProductsT } from "../products";
import { GetProductById } from "~/lib/actions/products";
import { Image } from "expo-image";
import { blurhash } from "~/lib/utils";
import { OrderForm } from "~/components/order/order-form";
import BackButton from "~/components/back-button";

export default function Screen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<ProductsT>();

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await GetProductById(id as string);
      setProduct(product);
    };
    fetchProduct();
  }, [id]);

  return (
    <SafeAreaView
      className="h-full bg-secondary"
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView>
          <View className="p-5">
            <View className="py-5">
              <BackButton />
            </View>
            {product?.image && (
              <Image
                placeholder={{ blurhash }}
                source={product?.image}
                style={{ borderRadius: 10, height: 800 }}
                contentFit="cover"
                transition={1000}
              />
            )}
            <View
              className="mt-2"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text className="text-2xl" style={{ fontWeight: "semibold" }}>
                  {product?.name}
                </Text>
                <Text className="text-lg text-muted-foreground">
                 Flavor: {product?.flavor}
                </Text>
              </View>
              <View>
                <Text className="text-3xl font-semibold">
                  ₱{product?.price.toLocaleString()}
                </Text>
              </View>
            </View>
            <OrderForm product_id={id as string} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
