import React, { useState, useEffect } from 'react';
import { Modal, View, Alert, FlatList, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Product from './Produto';

export default function StorageComponent() {
  const [records, setRecords] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const fetchRecords = async () => {
    try {
      const storedRecords = await AsyncStorage.getItem('records');
      setRecords(storedRecords ? JSON.parse(storedRecords) : []);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const saveToAsyncStorage = async (quantity, productName, price) => {
    try {
      const record = { quantity, productName, price };
      const existingRecords = await AsyncStorage.getItem('records');
      const records = existingRecords ? JSON.parse(existingRecords) : [];
      records.push(record);
      await AsyncStorage.setItem('records', JSON.stringify(records));
      fetchRecords();
      Alert.alert('Sucesso', 'Produto Salvo!');
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('records');
      setRecords([]);
      setConfirmModalVisible(false);
      Alert.alert('Sucesso', 'Todos os registros excluídos.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir os registros.');
    }
  };

  return (
    <View style={styles.container}>
      <Product onSaveData={saveToAsyncStorage} />
      <Button title="Ver Produtos Salvos" onPress={() => setModalVisible(true)} color="blue" />
      
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Produtos Salvos:</Text>
          {records.length === 0 ? (
            <Text style={styles.noRecords}>Sem produtos cadastrados</Text>
          ) : (
            <FlatList
              data={records}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text>Quantidade: {item.quantity}</Text>
                  <Text>Produto: {item.productName}</Text>
                  <Text>Preço: {item.price}</Text>
                </View>
              )}
            />
          )}
          <View style={styles.modalButtons}>
            <Button title="Fechar" onPress={() => setModalVisible(false)} color="red" />
            <Button title="Excluir Registros" onPress={() => setConfirmModalVisible(true)} color="orange" />
          </View>
        </View>
      </Modal>

      <Modal visible={confirmModalVisible} animationType="fade" transparent>
        <View style={styles.confirmModalView}>
          <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
          <Text>Tem certeza de que deseja excluir todos os registros?</Text>
          <View style={styles.modalButtons}>
            <Button title="Sim" onPress={clearStorage} color="red" />
            <Button title="Não" onPress={() => setConfirmModalVisible(false)} color="gray" />            
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModalView: {
    backgroundColor: 'white',
    padding: 20,
    margin: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  noRecords: {
    textAlign: 'center',
    color: 'gray',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});
