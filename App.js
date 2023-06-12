import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';

const RecipeListScreen = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');

  const handleAddRecipe = async () => {
    const newRecipe = {
      recipeName,
      cookingTime,
      ingredients,
      cost,
      description,
    };
  
    try {
      const response = await fetch('http://34.64.52.44/save_recipe.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
  
      if (response.ok) {
        setRecipeList([...recipeList, newRecipe]);
        setRecipeName('');
        setCookingTime('');
        setIngredients('');
        setCost('');
        setDescription('');
        setShowAddRecipeForm(false);
      } else {
        console.log('레시피 저장 오류');
      }
    } catch (error) {
      console.log('레시피 저장 오류:', error);
    }
  };

  const handleRecipePress = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const handleAddRecipePress = () => {
    setShowAddRecipeForm(true);
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeCard} onPress={() => handleRecipePress(item)}>
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName}>{item.recipeName}</Text>
        <Text style={styles.recipeTime}>{item.cookingTime} 분</Text>
        <Text style={styles.recipeTime}>{item.cost}</Text>
        <Text style={styles.recipeTime}>{item.ingredients}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>배달말고요리</Text>

      <FlatList
        data={recipeList}
        renderItem={renderRecipeItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.recipeList}
      />

      {!showAddRecipeForm && (
        <Button title="레시피 추가" onPress={handleAddRecipePress} color="purple" />
      )}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>레시피 정보</Text>

          {selectedRecipe && (
            <View>
              <Image source={selectedRecipe.image} style={styles.modalImage} />
              <Text style={styles.modalName}>{selectedRecipe.recipeName}</Text>
              <Text style={styles.modalTime}>{selectedRecipe.cookingTime} 분</Text>
              <Text style={styles.modalIngredients}>{selectedRecipe.ingredients}</Text>
              <Text style={styles.modalCost}>금액: {selectedRecipe.cost}</Text>
              <Text style={styles.modalDescription}>{selectedRecipe.description}</Text>
            </View>
          )}

          <Button title="닫기" onPress={() => setModalVisible(false)} color="purple" />
        </View>
      </Modal>

      <Modal visible={showAddRecipeForm} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>레시피 추가</Text>

          <TextInput
            placeholder="레시피 이름"
            value={recipeName}
            onChangeText={setRecipeName}
            style={styles.textInput}
          />
          <TextInput
            placeholder="소요 시간"
            value={cookingTime}
            onChangeText={setCookingTime}
            style={styles.textInput}
          />
          <TextInput
            placeholder="재료"
            value={ingredients}
            onChangeText={setIngredients}
            style={styles.textInput}
          />
          <TextInput
            placeholder="금액"
            value={cost}
            onChangeText={setCost}
            style={styles.textInput}
          />
          <TextInput
            placeholder="설명"
            value={description}
            onChangeText={setDescription}
            style={styles.textInput}
          />

          <Button title="추가" onPress={handleAddRecipe} color="purple" />
          <Button title="취소" onPress={() => setShowAddRecipeForm(false)} color="purple" />
        </View>
      </Modal>
    </View>
  );
};

const App = () => {
  return <RecipeListScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'purple',
  },
  recipeList: {
    paddingBottom: 20,
  },
  recipeCard: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  recipeInfo: {
    padding: 10,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeTime: {
    fontSize: 16,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'purple',
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalTime: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  modalIngredients: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalCost: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    borderColor: 'purple',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default App;
