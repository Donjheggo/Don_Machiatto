import { useState } from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { ShoppingCart, Minus, Plus } from "lucide-react-native";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";
import { useCart } from "~/context/cart-context";
import { RadioGroup } from "~/components/ui/radio-group";
import { RadioGroupItemWithLabel } from "../ui/radio-group-with-label";
import type { CartItemT } from "~/context/cart-context";
import { Tables } from "~/database.types";

type ProductT = Tables<"products">;

export const OrderForm = ({ product }: { product: ProductT }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantiy] = useState<number>(1);
  const [size, setSize] = useState<"SMALL" | "MEDIUM" | "LARGE">("SMALL");

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
      product_quantity: quantity,
      product_size: size,
    });
    router.push("/(tabs)/cart");
  };

  function onLabelPress(label: "SMALL" | "MEDIUM" | "LARGE") {
    return () => {
      setSize(label);
    };
  }

  return (
    <View className="mt-5 flex flex-col gap-2">
      <View>
        <View>
          <Label nativeID="size" className="pb-1">
            Size
          </Label>
          <View className="py-4">
            <RadioGroup
              value={size}
              onValueChange={(value) => setSize(value)}
              className="flex-row justify-center gap-6"
            >
              <RadioGroupItemWithLabel
                value="SMALL"
                onLabelPress={onLabelPress("SMALL")}
              />
              <RadioGroupItemWithLabel
                value="MEDIUM"
                onLabelPress={onLabelPress("MEDIUM")}
              />
              <RadioGroupItemWithLabel
                value="LARGE"
                onLabelPress={onLabelPress("LARGE")}
              />
            </RadioGroup>
          </View>
        </View>
        <View>
          <Label nativeID="quantity" className="pb-1">
            Quantity
          </Label>
          <View className="flex flex-row justify-between gap-2">
            <Button
              onPress={() => setQuantiy((prev) => (prev < 2 ? 1 : prev - 1))}
            >
              <Minus color="#7F5539" />
            </Button>
            <Input
              className="flex-1"
              placeholder=""
              value={String(quantity)} // Ensure it's shown as a string
              onChangeText={(e) => setQuantiy(parseInt(e, 10) || 0)}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
              keyboardType="numeric"
            />
            <Button onPress={() => setQuantiy((prev) => prev + 1)}>
              <Plus color="#7F5539" />
            </Button>
          </View>
        </View>
        <Button
          onPress={handleAddToCart}
          size="lg"
          className="mt-5 flex flex-row"
        >
          <Text style={{ fontSize: 20 }}>Add to Cart</Text>
          <ShoppingCart color="#7F5539" style={{ marginLeft: 10 }} />
        </Button>
      </View>
    </View>
  );
};

export const sizes = ["SMALL", "MEDIUM", "LARGE"];
export type OrderFormT = {
  products: CartItemT[];
  name: string;
  payment_method: "GCASH" | "CASH";
};
