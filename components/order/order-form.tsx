import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState } from "react";
import { View, Alert } from "react-native";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { Coffee } from "lucide-react-native";
import { Button } from "~/components/ui/button";

type OrderFormT = {
  product_id: string;
  name: string;
  size: "SMALL" | "MEDIUM" | "LARGE" | null;
  quantity: number;
};

export const OrderForm = ({ product_id }: { product_id: string }) => {
  const [form, setForm] = useState<OrderFormT>({
    product_id: product_id,
    name: "",
    size: null,
    quantity: 0,
  });

  const handleSubmit = () => {
    Alert.alert(String(form));
  };

  return (
    <View className="mt-5">
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
        <Select
          defaultValue={{ value: "", label: "Select" }}
          onValueChange={(value) =>
            setForm({
              ...form,
              size: value?.value as "SMALL" | "MEDIUM" | "LARGE" | null,
            })
          }
        >
          <SelectTrigger>
            <SelectValue
              className="text-foreground dark:text-white text-sm native:text-lg"
              placeholder="Select"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sizes.map((item, index) => (
                <SelectItem key={index} label={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </View>
      <View>
        <Label nativeID="quantity" className="pb-1">
          Quantity
        </Label>
        <Input
          placeholder=""
          value={String(form.quantity)} // Ensure it's shown as a string
          onChangeText={(e) =>
            setForm({ ...form, quantity: parseInt(e, 10) || 0 })
          }
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
          keyboardType="numeric"
        />
      </View>
      <View>
        <Button
          onPress={() => Alert.alert("Add to cart")}
          size="lg"
          className="mt-5 flex flex-row"
        >
          <Text className="text-white" style={{ fontSize: 20 }}>
            Order Now
          </Text>
          <Coffee color="#fff" style={{ marginLeft: 10 }} />
        </Button>
      </View>
    </View>
  );
};

export const sizes = ["SMALL", "MEDIUM", "LARGE"];
