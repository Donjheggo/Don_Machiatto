import { supabase } from "../supabase";
import { Alert } from "react-native";
import type { OrderFormT } from "~/components/order/order-form";

export async function CreateOrder(form: OrderFormT) {
  try {
    const { error } = await supabase
      .from("orders")
      .insert({
        product_id: form.product_id,
        name: form.name,
        size: form.size,
        quantity: form.quantity,
      })
      .select();

    if (error) {
      Alert.alert(error.message);
      return false;
    }
    Alert.alert("Order created.");
    return true;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
      return false;
    }
  }
}
