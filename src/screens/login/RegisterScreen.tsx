import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '../../../assets/style/theme';
import authService from '../../services/authService';
import { RootStackParamList } from '../../navigation/types';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await authService.register(username, email, password);
      if (response.code === 1) {
        Alert.alert('Registration Successful', 'You can now log in.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Registration Failed', response.msg);
      }
    } catch (error) {
      Alert.alert('Registration Failed', 'Network or server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={theme.styles.container}>
      <Card style={theme.styles.card}>
        <Card.Content>
          <Title style={theme.styles.title}>Register</Title>
          
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={[theme.styles.input, { backgroundColor: '#f5f5f5' }]}
            autoCapitalize="none"
            theme={{ colors: { text: theme.colors.text } }} // 设置文本颜色
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={theme.styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
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
          <Button
            mode="contained"
            onPress={handleRegister}
            loading={isLoading}
            style={theme.styles.button}
          >
            Register
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}
