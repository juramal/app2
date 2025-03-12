import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function Produto ({ onSaveData }) {
  const [quantity, setQuantity] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (quantity && productName && price) {
      onSaveData(quantity, productName, price);
      clearFields();
    } else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  const clearFields = () => {
    setQuantity('');
    setProductName('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Quantidade:</Text>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          style={[styles.input, { width: '25%' }]}
          placeholder="1"
          maxLength={6}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Produto:</Text>
        <TextInput
          value={productName}
          onChangeText={setProductName}
          style={styles.input}
          placeholder="Nome do Produto"
          maxLength={20}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Preço:</Text>
        <TextInputMask
          type={'money'}
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          placeholder="Preço do Produto"
          maxLength={10}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputRow}>
        <Button title="Limpar" onPress={clearFields} />        
      </View>
      <View style={styles.inputRow}>        
        <Button title="Salvar" onPress={handleSave} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 25,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: -10,
    marginLeft: 5,
    borderRadius: 5,
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    padding: 10,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
});
