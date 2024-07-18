import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import recipeService from '../services/recipeService';
import theme from '../../assets/style/theme';

export default function NewScreen() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState('');
  const [link, setLink] = useState('');
  const [source, setSource] = useState('');
  const [ner, setNer] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePublish = async () => {
    const recipeData = {
      title,
      ingredients: ingredients.split(','),
      directions: directions.split('.'),
      link,
      source,
      ner: ner.split(','),
    };

    try {
      const newRecipe = await recipeService.publishRecipe(recipeData);
      setSuccess('Recipe published successfully!');
      setTitle('');
      setIngredients('');
      setDirections('');
      setLink('');
      setSource('');
      setNer('');
    } catch (error) {
      console.error('Error publishing recipe:', error);
      setError('Error publishing recipe');
    }
  };

  return (
    <ScrollView contentContainerStyle={theme.styles.container}>
      <Text style={theme.styles.title}>New Recipe</Text>
      {error && (
        <Snackbar
          visible={true}
          onDismiss={() => setError(null)}
          duration={Snackbar.DURATION_SHORT}
        >
          {error}
        </Snackbar>
      )}
      {success && (
        <Snackbar
          visible={true}
          onDismiss={() => setSuccess(null)}
          duration={Snackbar.DURATION_SHORT}
        >
          {success}
        </Snackbar>
      )}
      <View style={theme.styles.field}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={theme.styles.input}
        />
      </View>
      <View style={theme.styles.field}>
        <TextInput
          label="Ingredients (comma separated)"
          value={ingredients}
          onChangeText={setIngredients}
          style={theme.styles.input}
        />
      </View>
      <View style={theme.styles.field}>
        <TextInput
          label="Directions (period separated)"
          value={directions}
          onChangeText={setDirections}
          style={theme.styles.input}
        />
      </View>
      <View style={theme.styles.field}>
        <TextInput
          label="Link"
          value={link}
          onChangeText={setLink}
          style={theme.styles.input}
        />
      </View>
      <View style={theme.styles.field}>
        <TextInput
          label="Source"
          value={source}
          onChangeText={setSource}
          style={theme.styles.input}
        />
      </View>
      <View style={theme.styles.field}>
        <TextInput
          label="NER (comma separated)"
          value={ner}
          onChangeText={setNer}
          style={theme.styles.input}
        />
      </View>
      <Button
        mode="contained"
        onPress={handlePublish}
        style={theme.styles.button}
      >
        Publish Recipe
      </Button>
    </ScrollView>
  );
}


