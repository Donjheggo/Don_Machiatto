import { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { Coffee, Minus, Plus } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { CreateOrder } from "~/lib/actions/orders";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { RadioGroup } from "~/components/ui/radio-group";
import { RadioGroupItemWithLabel } from "../ui/radio-group-with-label";

export const OrderForm = ({ product_id }: { product_id: string }) => {
  const router = useRouter();
  const [form, setForm] = useState<OrderFormT>({
    product_id: product_id,
    name: "",
    size: "SMALL",
    quantity: 1,
  });

  const handleSubmit = async () => {
    const order_number = await CreateOrder(form);
    if (order_number) {
      Alert.alert("Order Created", `Your Order Number is: ${order_number}`, [
        {
          text: "OK",
          onPress: () => {
            // Navigate to another route after the alert is closed
            router.push("/(tabs)/products");
          },
        },
      ]);
    }
  };

  function onLabelPress(label: "SMALL" | "MEDIUM" | "LARGE") {
    return () => {
      setForm({ ...form, size: label });
    };
  }

  return (
    <View className="mt-5 flex flex-col gap-2">
      <View>
        <Label nativeID="name" className="pb-1">
          Customer name
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
        <Label nativeID="size" className="pb-1">
          Size
        </Label>
        <View className="py-4">
          <RadioGroup
            value={form.size}
            onValueChange={(value) => setForm({ ...form, size: value })}
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
            onPress={() =>
              setForm({
                ...form,
                quantity: form.quantity > 1 ? form.quantity - 1 : 1,
              })
            }
          >
            <Minus color="#7F5539" />
          </Button>
          <Input
            className="flex-1"
            placeholder=""
            value={String(form.quantity)} // Ensure it's shown as a string
            onChangeText={(e) =>
              setForm({ ...form, quantity: parseInt(e, 10) || 0 })
            }
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            keyboardType="numeric"
          />
          <Button
            onPress={() => setForm({ ...form, quantity: form.quantity + 1 })}
          >
            <Plus color="#7F5539" />
          </Button>
        </View>
      </View>
      <View>
        <Button onPress={handleSubmit} size="lg" className="mt-5 flex flex-row">
          <Text style={{ fontSize: 20 }}>Order Now</Text>
          <Coffee color="#7F5539" style={{ marginLeft: 10 }} />
        </Button>
      </View>
    </View>
  );
};

export const sizes = ["SMALL", "MEDIUM", "LARGE"];
export type OrderFormT = {
  product_id: string;
  name: string;
  size: "SMALL" | "MEDIUM" | "LARGE";
  quantity: number;
};
