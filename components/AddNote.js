import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

function AddNote({navigation}) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const saveNote = async () =>
  {
    try {
      const storedNotes = await AsyncStorage.getItem('Note');
      const notes = JSON.parse(storedNotes);

      notes.push({ title: title, text: text });

      await AsyncStorage.setItem('Note', JSON.stringify(notes));
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () =>
  {
    try {
      const notes = await AsyncStorage.getItem('Note');
      console.log(`Storage: ${notes}`); 
    } catch (e) {
      console.error(e);
    }
  }


  useEffect(() => {
    getData();

  }, []);

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>Titel</Text>
          </View>
          <TextInput style={styles.titleInput} onChangeText={titleInput => setTitle(titleInput)} value={title}></TextInput>
          <View style={styles.textBox}>
            <Text style={styles.titleText}>Text</Text>
          </View>
          <TextInput style={styles.textInput} multiline onChangeText={textInput => setText(textInput)} value={text}></TextInput>
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity style={styles.createButton} onPress={async () => {await saveNote(); navigation.navigate('Deine Notizen');}}><Text style={styles.createButtonText}>Erstellen</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Deine Notizen")}>
              <Ionicons name="arrow-back-circle-sharp" style={styles.closeButton} />
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    );
}

export default AddNote;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    titleText: {
      color: "black",
      fontSize: 30,
      fontWeight: 'bold',
    },
    titleBox: {
      backgroundColor: 'white',
      width: '30%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '15%',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 7,
    },
    textBox: {
      backgroundColor: 'white',
      width: '30%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '10%',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 7,
    },
    createButton: {
      backgroundColor: '#07d100',
      height: '100%',
      width: '38%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#005210',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 7,
      marginLeft: '23%',
      marginRight: '8%'
    },
    createButtonText: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
    },
    titleInput: {
      color: 'black',
      width: '90%',
      height: '5%',
      borderWidth: 2,
      borderRadius: 10,
      marginTop: '3%',
      fontSize: 20,
      padding: 4
    },
    textInput: {
      color: 'black',
      width: '90%',
      height: '30%',
      borderWidth: 2,
      borderRadius: 10,
      marginTop: '3%',
      fontSize: 20,
      padding: 4
    },
    actionButtonContainer: {
      width: '100%',
      height: '8%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: '50%',
    },
    closeButton: {
      color: 'red',
      fontSize: 60,
    },
  });