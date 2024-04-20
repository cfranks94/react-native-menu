import { Stack } from "expo-router";
import { useColorScheme } from '@components/useColorScheme';

export default function OrderStack() {
    return (
        <Stack>
            <Stack.Screen name="list" options={{ headerShown: false }}/>
        </Stack>
    ) 
}