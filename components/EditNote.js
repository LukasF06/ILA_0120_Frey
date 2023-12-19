import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from 'react-native';

function EditNote({isVisible, onClose, note, reload}) {
  const [changedTitle, setChangedTitle] = useState(note.title);
  const [changedText, setChangedText] = useState(note.text);

  useEffect(() => {
    setChangedTitle(note.title);
    setChangedText(note.text);
  }, [note]);

  const editData = async () =>
  {
    try {
      const notes = await AsyncStorage.getItem('Note');
      let notesArr = JSON.parse(notes);

      let updatedNotesArr = notesArr.map((noteToEdit) => {
        if (noteToEdit.title === note.title) {
          return { ...noteToEdit, title: changedTitle, text: changedText };
        }
        return noteToEdit;
      });

      await AsyncStorage.setItem('Note', JSON.stringify(updatedNotesArr));

      reload();

    } catch (e) {
      console.error(e);
    }
  }

    return (
      <Modal supportedOrientations={["portrait", "landscape"]} transparent={true} visible={isVisible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.titleBox}>
              <Text style={styles.titleText}>Titel</Text>
            </View>
            <TextInput style={styles.titleInput} value={changedTitle} onChangeText={(titleInput) => setChangedTitle(titleInput)}></TextInput>
            <View style={styles.textBox}>
              <Text style={styles.titleText}>Text</Text>
            </View>
            <TextInput style={styles.textInput} multiline value={changedText} onChangeText={(textInput) => setChangedText(textInput)}></TextInput>
            <View style={styles.actionButtonContainer}>
              <TouchableOpacity style={styles.createButtonEditMode} onPress={() => {editData(); onClose();}}><Text style={styles.createButtonText}>Speichern</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => onClose()}>
                <Ionicons name="arrow-back-circle-sharp" style={styles.closeButton} />
              </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
          </View>
        </TouchableWithoutFeedback>      
      </Modal>
    );
}

export default EditNote

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
    createButtonEditMode: {
      backgroundColor: '#ffe95c',
      height: '100%',
      width: '38%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#d4b700',
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