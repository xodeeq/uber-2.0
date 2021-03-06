import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import Map from "../components/ride/Map";
import NavigateCard from "../components/ride/NavigateCard";
import RideOptionsCard from "../components/ride/RideOptionsCard";
import { setDestination, setLocations } from "../slices/navSlice";
import EatsScreen from "./EatsScreen";

const MapScreen = ({
	route: {
		params: { service },
	},
}) => {
	const Stack = createNativeStackNavigator();
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useFocusEffect(
		useCallback(() => {
			StatusBar.setBarStyle("dark-content");
			Platform.OS === "android" &&
				StatusBar.setTranslucent(true) &&
				StatusBar.setBackgroundColor("transparent");
		}, [])
	);

	return (
		<KeyboardAvoidingView behavior='height'>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("Home");
					dispatch(setDestination(null));
					dispatch(setLocations([]));
				}}
				style={tw`absolute bg-gray-100 top-10 left-4 z-30 p-2 rounded-full shadow-lg`}
			>
				<Icon name='chevron-left' />
			</TouchableOpacity>

			<View style={tw`h-2/5`}>
				<Map />
			</View>

			<View style={tw`h-3/5`}>
				<Stack.Navigator
					initialRouteName={service == "ride" ? "NavigateCard" : "EatsScreen"}
				>
					<Stack.Screen
						name='NavigateCard'
						component={NavigateCard}
						options={{ headerShown: false }}
					/>

					<Stack.Screen
						name='RideOptionsCard'
						component={RideOptionsCard}
						options={{ headerShown: false }}
					/>

					<Stack.Screen
						name='EatsScreen'
						component={EatsScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</View>
		</KeyboardAvoidingView>
	);
};

export default MapScreen;

const styles = StyleSheet.create({});
