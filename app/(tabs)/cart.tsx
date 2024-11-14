import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useCart } from "~/context/cart-context";
import CartCard from "~/components/cart/cart-card";
import { CheckoutForm } from "~/components/cart/checkout-form";
import { Text } from "~/components/ui/text";

export default function Screen() {
  const { cartItems } = useCart();

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
          {cartItems.length > 0 ? (
            <View className="p-5">
              {cartItems.map((item, index) => (
                <View key={index}>
                  <CartCard item={item} />
                </View>
              ))}
              <CheckoutForm />
            </View>
          ) : (
            <View className="flex items-center justify-center h-[500px]">
              <Text className="text-4xl">No items in cart.</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
