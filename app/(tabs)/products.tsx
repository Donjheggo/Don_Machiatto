import SearchBar from "~/components/products/search-bar";
import { View, SafeAreaView, ScrollView, Platform, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { Tables } from "~/database.types";
import { SearchProducts } from "~/lib/actions/products";
import { useLocalSearchParams } from "expo-router";
import ProductCard from "~/components/products/product-card";

export default function Screen() {
  const { query } = useLocalSearchParams();
  const [products, setProducts] = useState<ProductsT[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await SearchProducts(query as string);
      setProducts(data ?? []);
    };
    fetchProducts();
  }, [query]);

  return (
    <SafeAreaView
      className="h-full bg-secondary"
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView>
        <View className="p-5">
          <SearchBar />
          <View
            className="gap-2"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 15,
            }}
          >
            {products?.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export type ProductsT = Tables<"products">;
