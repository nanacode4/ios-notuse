
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, TextInput, Button, Card, Snackbar, ActivityIndicator } from 'react-native-paper';
import recipeService, { Recipe } from '../services/recipeService';
import theme from '../../assets/style/theme';

const searchScreen: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await recipeService.searchRecipes(keyword);
      setRecipes(result.records);
      setError(null);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setError('Error searching recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={theme.styles.container}>
      <Text style={theme.styles.title}>Search Recipes</Text>
      {error && (
        <Snackbar
          visible={true}
          onDismiss={() => setError(null)}
          duration={Snackbar.DURATION_SHORT}
        >
          {error}
        </Snackbar>
      )}
      <View style={theme.styles.field}>
        <TextInput
          label="Search"
          value={keyword}
          onChangeText={setKeyword}
          style={theme.styles.input}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleSearch}
        style={theme.styles.button}
      >
        Search
      </Button>
      {loading && <ActivityIndicator animating={true} style={styles.loading} />}
      <View style={styles.recipeContainer}>
        {recipes.map((recipe) => (
          <Card key={recipe.id} style={styles.recipeCard}>
            <Card.Cover source={recipe.link ? { uri: recipe.link } : require('../../assets/image/background.png')} />
            <Card.Content>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginVertical: 20,
  },
  recipeContainer: {
    marginTop: 20,
  },
  recipeCard: {
    marginBottom: 20,
  },
  recipeTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default searchScreen;
