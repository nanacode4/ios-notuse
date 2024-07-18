import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Avatar } from 'react-native-paper';
import userService, { UserProfile } from '../../services/userService';
import theme from '../../../assets/style/theme';

interface UserProfileProps {
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const UserProfileComponent: React.FC<UserProfileProps> = ({ profile, setProfile }) => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (profile) {
      try {
        const updatedProfile = await userService.updateUserProfile(profile);
        setProfile(updatedProfile);
        setEditMode(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        setError('Error updating profile');
      }
    }
  };

  return (
    <View style={theme.styles.card}>
      {error && <Text style={theme.styles.errorText}>{error}</Text>}
      {profile && (
        <>
          <Text style={theme.styles.title}>User Profile</Text>
          <View style={styles.centeredContainer}>
            {profile.avatar ? (
              <Avatar.Image
                source={{ uri: profile.avatar }}
                size={150}
                style={styles.avatar}
              />
            ) : (
              <Avatar.Image
                source={require("../../../assets/image/avatar.jpeg")}
                size={150}
                style={styles.avatar}
              />
            )}
          </View>
          <View style={theme.styles.field}>
            <Text style={theme.styles.label}>Username: </Text>
            {editMode ? (
              <TextInput
                style={theme.styles.input}
                value={profile.username}
                onChangeText={(text) => setProfile({ ...profile, username: text })}
              />
            ) : (
              <Text style={theme.styles.value}>{profile.username}</Text>
            )}
          </View>
          <View style={theme.styles.field}>
            <Text style={theme.styles.label}>Password: </Text>
            {editMode ? (
              <TextInput
                style={theme.styles.input}
                value={profile.password}
                secureTextEntry
                onChangeText={(text) => setProfile({ ...profile, password: text })}
              />
            ) : (
              <Text style={theme.styles.value}>********</Text>
            )}
          </View>
          <View style={theme.styles.field}>
            <Text style={theme.styles.label}>Email: </Text>
            {editMode ? (
              <TextInput
                style={theme.styles.input}
                value={profile.email}
                onChangeText={(text) => setProfile({ ...profile, email: text })}
              />
            ) : (
              <Text style={theme.styles.value}>{profile.email}</Text>
            )}
          </View>
          {profile.createTime && (
            <View style={theme.styles.field}>
              <Text style={theme.styles.label}>Account Created: </Text>
              <Text style={theme.styles.value}>{profile.createTime}</Text>
            </View>
          )}
          {editMode ? (
            <Button mode="contained" onPress={handleSave} style={theme.styles.button}>
              Save
            </Button>
          ) : (
            <Button mode="contained" onPress={() => setEditMode(true)} style={theme.styles.button}>
              Edit
            </Button>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 20,
  },
});

export default UserProfileComponent;
