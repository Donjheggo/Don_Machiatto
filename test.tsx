{/* <View className="mt-5 flex flex-col gap-2">
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
      <Button onPress={() => setForm({ ...form, quantity: form.quantity + 1 })}>
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
</View>; */}
