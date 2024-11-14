import { useState } from "react";
import { View, Alert, Dimensions } from "react-native";
import { Text } from "~/components/ui/text";
import { Coffee } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";
import type { CartItemT } from "~/context/cart-context";
import { CreateOrder } from "~/lib/actions/orders";
import { useCart } from "~/context/cart-context";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "~/components/ui/radio-group";
import { RadioGroupItemWithLabel } from "../ui/radio-group-with-label";
import { Image } from "expo-image";

export const CheckoutForm = () => {
  const { cartItems, clearCartItems } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<OrderFormT>({
    products: cartItems,
    name: "",
    payment_method: "CASH",
  });

  const screenWidth = Dimensions.get("window").width;
  const isTablet = screenWidth >= 768;

  const handleCheckOut = async () => {
    if (!form.name) {
      Alert.alert("Please input your name:");
      return;
    }
    const response = await CreateOrder(form);
    if (response) {
      Alert.alert("Order Created", `Your Order Number is: ${response}`, [
        {
          text: "OK",
          onPress: () => {
            router.push("/(tabs)/products");
          },
        },
      ]);
      clearCartItems();
    }
  };

  function onLabelPress(label: "CASH" | "GCASH") {
    return () => {
      setForm({ ...form, payment_method: label });
    };
  }

  return (
    <View>
      <View>
        <Label nativeID="name" className="pb-1">
          Full name
        </Label>
        <Input
          placeholder=""
          value={form.name}
          onChangeText={(e) => setForm({ ...form, name: e })}
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
          keyboardType="default"
        />
      </View>
      <View>
        <Label nativeID="payment_method" className="pb-1">
          Payment Method
        </Label>
        <View className="py-4">
          <RadioGroup
            value={form.payment_method}
            onValueChange={(value) =>
              setForm({ ...form, payment_method: value })
            }
            className="flex-row justify-center gap-6"
          >
            <RadioGroupItemWithLabel
              value="CASH"
              onLabelPress={onLabelPress("CASH")}
            />
            <RadioGroupItemWithLabel
              value="GCASH"
              onLabelPress={onLabelPress("GCASH")}
            />
          </RadioGroup>
        </View>
      </View>
      {form.payment_method === "GCASH" && (
        <View className="flex items-center">
          <Image
            source={require("../../assets/images/qr-code.png")}
            style={{
              width: isTablet ? 800 : 600, // Larger width for tablets
              height: isTablet ? 350 : 250, // Larger height for tablets
              resizeMode: "contain",
            }}
          />
        </View>
      )}
      <View>
        <Button
          onPress={handleCheckOut}
          size="lg"
          className="mt-5 flex flex-row"
        >
          <Text style={{ fontSize: 20 }}>Checkout</Text>
          <Coffee color="#7F5539" style={{ marginLeft: 10 }} />
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
