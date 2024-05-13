import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useInsertProduct, useProduct, useUpdateProduct } from '@/api/products';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0]);

    const isUpdating = !!id;

    const { data: updatingProduct } = useProduct(id);
    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();

    const router = useRouter();

    const resetFields = () => {
        setName('')
        setPrice('')
    }

    const validateInput = () => {
        setErrors('')
        if (!name) {
            setErrors('Name is required')
            return false;
        }
        if (!price) {
            setErrors('Price is required')
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price is not a number')
            return false;
        }
        return true;
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        insertProduct({ name, price: parseFloat(price), image }, {
            onSuccess: () => {
                resetFields();
                router.back();
            }
        });
    }

    const onUpdate= () => {
        if (!validateInput()) {
            return;
        }

        updateProduct({ id, name, price: parseFloat(price), image }, {
            onSuccess: () => {
                resetFields();
                router.back();
            }
        });
    }

    const onSubmit = () => {
        if (isUpdating) {
            onUpdate()
        } else {
            onCreate()
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    const onDelete = () => {

    }

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this dish?", [
            {
                text: 'Cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete
            }
        ])
    }

    useEffect(() => {
        if (updatingProduct) {
            setName(updatingProduct.name);
            setPrice(updatingProduct.price.toString());
            setImage(updatingProduct.image);
        }
    }, [updatingProduct])

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? 'Update Dish' : 'Create Dish' }} />

            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput keyboardType='numeric' placeholder="9.99" style={styles.input} value={price} onChangeText={setPrice} />

            <Text style={{color: 'red'}}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    },
    label: {
        color: 'gray',
        fontSize: 16
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10
    }
})

export default CreateProductScreen;