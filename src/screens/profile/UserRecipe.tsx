// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { FlatList, View } from 'react-native';
// import { List, Button, Text, Avatar, Card, Snackbar } from 'react-native-paper';
// import theme from '../../../assets/style/theme';
// import recipeService, { Recipe } from '../../services/recipeService';

// interface UserRecipesProps {
//   recipes: Recipe[];
//   setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
// }

// const UserRecipes: React.FC<UserRecipesProps> = ({ recipes, setRecipes }) => {
//   const navigation = useNavigation();
//   const [error, setError] = React.useState<string | null>(null);

//   const handleEdit = (id: number) => {
//     navigation.navigate('RecipeEdit', { id });
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await recipeService.deleteRecipe(id);
//       setRecipes(recipes.filter(recipe => recipe.id !== id));
//     } catch (error) {
//       console.error('Error deleting recipe:', error);
//       setError('Error deleting recipe');
//     }
//   };

//   return (
//     <View style={theme.styles.container}>
//       {error && (
//         <Snackbar
//           visible={true}
//           onDismiss={() => setError(null)}
//           duration={Snackbar.DURATION_SHORT}
//         >
//           {error}
//         </Snackbar>
//       )}
//       <Text style={theme.styles.title}>My Recipes</Text>
//       <FlatList
//         data={recipes}
//         keyExtractor={(recipe) => recipe.id.toString()}
//         renderItem={({ item: recipe }) => (
//           <Card style={theme.styles.card}>
//             <Card.Title title={recipe.title} />
//             <Card.Actions style={{ justifyContent: 'flex-end' }}>
//               <Button
//                 mode="contained"
//                 onPress={() => navigation.navigate('RecipeDetails', { id: recipe.id })}
//                 style={{ marginRight: 8 }}
//               >
//                 View
//               </Button>
//               <Button
//                 mode="contained"
//                 onPress={() => handleEdit(recipe.id)}
//                 style={{ marginRight: 8 }}
//               >
//                 Edit
//               </Button>
//               <Button
//                 mode="contained"
//                 onPress={() => handleDelete(recipe.id)}
//                 color="red"
//               >
//                 Delete
//               </Button>
//             </Card.Actions>
//           </Card>
//         )}
//       />
//     </View>
//   );
// };

// export default UserRecipes;
