import { Tabs } from "expo-router";
import { Armchair } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarStyle: { display: "none" },
        tabBarActiveTintColor: "#7F5539",
        tabBarInactiveTintColor: "#B08968",
        headerShown: false,
        headerTitleStyle: {
          fontSize: 20,
          color: "#9C6644",
        },
        tabBarStyle:{
          backgroundColor: "#F0E5CF"
        }
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => <Armchair size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => <Armchair size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
