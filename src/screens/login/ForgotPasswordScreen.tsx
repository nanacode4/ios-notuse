// screens/ForgotPasswordScreen.tsx
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';
import theme from '../../../assets/style/theme';
import authService from '../../services/authService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

type Props = {
  navigation: ForgotPasswordScreenNavigationProp;
};

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async () => {
    setIsLoading(true);
    try {
      const response = await authService.requestPasswordReset(email);
      if (response.code === 1) {
        Alert.alert('Request Successful', 'Please check your email for the reset link.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Request Failed', response.msg);
      }
    } catch (error) {
      Alert.alert('Request Failed', 'Network or server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={theme.styles.container}>
      <Card style={theme.styles.card}>
        <Card.Content>
          <Title style={theme.styles.title}>Request Password Reset</Title>
          
          <TextInput
            label="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={theme.styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            theme={{ colors: { text: theme.colors.text } }} 
          />
          <Button
            mode="contained"
            onPress={handlePasswordReset}
            loading={isLoading}
            style={theme.styles.button}
          >
            SEND RESET LINK
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}
