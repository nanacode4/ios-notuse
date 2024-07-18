import React, { useState } from "react";
import { View, Alert, Text } from "react-native";
import { TextInput, Button, Title, Card } from "react-native-paper";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import authService from "../../services/authService";
import theme from "../../../assets/style/theme";
import { RootStackParamList } from "../../navigation/types";

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await authService.login(username, password);
      if (response.code === 1) {
        Alert.alert("Login Successful");
        navigation.navigate("Main");
      } else {
        Alert.alert("Login Failed", response.msg);
      }
    } catch (error) {
      Alert.alert("Login Failed", "Network or server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={theme.styles.container}>
      <Card style={theme.styles.card}>
        <Card.Content>
          <Title style={theme.styles.title}>Login</Title>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={theme.styles.input}
            autoCapitalize="none"
            theme={{ colors: { text: theme.colors.text } }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={theme.styles.input}
            secureTextEntry
            theme={{ colors: { text: theme.colors.text } }}
          />
          <View style={theme.styles.linksContainer}>
            <Text
              style={theme.styles.link}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
            <Text
              style={theme.styles.link}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Forgot Password?
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            style={theme.styles.button}
          >
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default LoginScreen;
