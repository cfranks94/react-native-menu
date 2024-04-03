import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text } from "react-native";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen options={{ title: 'Details: ' + id }} />

      <Text style={{ fontSize: 20 }}>Product Details Screen for id: {id}</Text>
    </View>
  )
}

export default ProductDetailsScreen;