import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import userService, { UserProfile } from "../services/userService";
import recipeService, { Recipe } from "../services/recipeService";
import theme from "../../assets/style/theme";
import UserProfileComponent from "./profile/UserProfileComponent";

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfileAndRecipes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        const profileData = await userService.getUserProfile();
        setProfile(profileData);

        const recipesData = await recipeService.getUserRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching profile or recipes:", error);
        setError("Error fetching profile or recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndRecipes();
  }, []);

  // const handleLoginNavigation = () => {
  //   navigation.navigate("Login");
  // };

  if (loading) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  // if (!isLoggedIn) {
  //   return (
  //     <View style={theme.styles.container}>
  //       <Text style={theme.styles.link}>
  //         Users need to be logged in to view profiles.
  //       </Text>
  //       <TouchableOpacity onPress={handleLoginNavigation} style={styles.button}>
  //         <Text style={styles.buttonText}>Login</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <View style={theme.styles.container}>
      {error && <Text style={theme.styles.errorText}>{error}</Text>}
      {profile && (
        <UserProfileComponent profile={profile} setProfile={setProfile} />
      )}
      
    </View>
  );
};



export default ProfileScreen;
