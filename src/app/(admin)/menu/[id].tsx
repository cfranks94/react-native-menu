import { useLocalSearchParams, Stack, useRouter, Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useProduct } from "@/api/products";

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
          options={{ 
            title: 'Menu',
            headerRight: () => (
              <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
      <Stack.Screen options={{ title: product.name}} />

      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} />

      <Text style={styles.price}>${product.price}</Text>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default ProductDetailsScreen;