import { supabase } from "../supabase";
import { Alert } from "react-native";
import type { OrderFormT } from "~/components/order/order-form";

export async function CreateOrder(form: OrderFormT) {
  // Step 1: Fetch products ////////////////////////////////////////
  const ordered_products = form.products;
  const product_ids = ordered_products.map((item) => item.product_id);
  const { data: products, error: products_error } = await supabase
    .from("products")
    .select("*")
    .in("id", product_ids);

  if (products_error) {
    Alert.alert("Error fetching products: ", products_error.message);
    return false;
  }

  // Step 2: Calculate total price ////////////////////////////////////////
  let total_price = 0;
  ordered_products.forEach((ordered_item) => {
    const product = products.find(
      (product) => product.id === ordered_item.product_id
    );
    if (product) {
      total_price += product.price * ordered_item.product_quantity;
    }
  });

  // Step 3: Create Order ////////////////////////////////////////
  const { error: create_order_error, data: order_data } = await supabase
    .from("orders")
    .insert({
      name: form.name,
      total_price: total_price,
      payment_method: form.payment_method,
    })
    .select();
  if (create_order_error) {
    Alert.alert(create_order_error.message);
    return false;
  }

  // Step 4: Insert order items ////////////////////////////////////////
  const order_id = order_data[0].id;
  const order_items = ordered_products.map((ordered_item) => {
    const product = products.find(
      (product) => product.id === ordered_item.product_id
    );
    return {
      order_id: order_id,
      product_id: ordered_item.product_id,
      price: product.price,
      quantity: ordered_item.product_quantity,
      size: ordered_item.product_size,
    };
  });

  const { error: order_items_error } = await supabase
    .from("order_items")
    .insert(order_items);

  if (order_items_error) {
    Alert.alert("Error inserting order items: ", order_items_error.message);
    return false;
  }

  // Step 5: Update Product Quantities
  for (const ordered_product of ordered_products) {
    const product = products.find(
      (product) => product.id === ordered_product.product_id
    );
    const new_quantity = product?.quantity - ordered_product.product_quantity;

    const { error: update_product_error } = await supabase
      .from("products")
      .update({ quantity: new_quantity })
      .eq("id", ordered_product.product_id);

    if (update_product_error) {
      Alert.alert(
        "Error updating product quantity: ",
        update_product_error.message
      );
    }
  }

  // Step 6: Return Order Number To Customer ////////////////////////////
  return order_data[0].order_number;
}
