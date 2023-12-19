import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Vibration } from 'react-native';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import React, {useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import ShowDetails from './ShowNoteDetails.js';
import EditNote from './EditNote.js';

function HomeScreen({navigation}) {
  const [savedNotes, setSavedNotes] = useState([]);
  const [editNoteVisible, setEditNoteVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState([]);
  const [noteToShow, setNoteToShow] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const showDeleteAlert = (noteTitle) => {
    Vibration.vibrate()
    Alert.alert('Wollen Sie die Notiz wirklich löschen?', null, [
    {
      text: 'Ja',
      onPress: () => deleteData(noteTitle)
    },
    {
      text: 'Nein',
    }  
    ]);
  }

  const getData = async () =>
  {
    try {
      const notes = await AsyncStorage.getItem('Note');
      setSavedNotes(JSON.parse(notes));
      console.log(`Storage: ${savedNotes}`); 
    } catch (e) {
      console.error(e);
    }
  }

  const deleteData = async (noteToDelete) =>
  {
    console.log(noteToDelete);
    try {
      const notes = await AsyncStorage.getItem('Note');
      let notesArr = JSON.parse(notes);
      console.log(notesArr)

      let newNotesArr = notesArr.filter(note => note.title !== noteToDelete);
      console.log(newNotesArr)

      await AsyncStorage.setItem('Note', JSON.stringify(newNotesArr));

      getData();

    } catch (e) {
      console.error(e);
    }
  }

  const onShowEditNote = (note) => {
    setEditNoteVisible(true);
    setNoteToEdit(note);
  }

  const onShowDetails = (note) => {
    setDetailsVisible(true);
    setNoteToShow(note);
  }

  const onCloseEditNote = () => {
    setEditNoteVisible(false);
  }

  const onCloseDetails = () => {
    setDetailsVisible(false);
  }
        
  return (
    <View style={styles.container}>
      <View style={styles.notesContainer}>
      { savedNotes != null ? (
          savedNotes.map((data, index) => (
            <TouchableOpacity key={index} style={styles.noteBox} onPress={() => onShowDetails(data)}>
            <Text style={styles.noteText}>{data.title}</Text>
            <TouchableOpacity style={styles.actionButton} onPress={() => onShowEditNote(data)}>
              <MaterialIcons name="edit" style={styles.editButton} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => {showDeleteAlert(data.title)}}>
              <MaterialIcons name="delete" style={styles.deleteButton} />
            </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text></Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Notiz erstellen')}><AntDesign name="plus" style={styles.plusIcon} /></TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Suche')}>
          <FontAwesome name="search" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.noteDetailBackground}></View>
      <View style={styles.noteDetailsSurface}></View>
      <EditNote isVisible={editNoteVisible} onClose={onCloseEditNote} note={noteToEdit} reload={getData}></EditNote>
      <ShowDetails isVisible={detailsVisible} onClose={onCloseDetails} note={noteToShow}></ShowDetails>
      <StatusBar style="auto" />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    actionButton: {
      flexDirection: 'row',
      flex: 0.125,
    },
    notesContainer: {
      width: '95%',
      //backgroundColor: '#c6c5c8',
      height: '75%',
      marginTop: '2%',
      alignItems: 'center',
      marginTop: '13%'
    },
    buttonContainer: {
      width: '95%',
      //backgroundColor: '#c6c5c8',
      height: '15%',
      marginTop: '3%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    addButton: {
      backgroundColor: '#90ed8a',
      height: '78%',
      width: '27%',
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '25%',
      shadowColor: '#0cc400',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 7,
    },
    searchButton: {
      backgroundColor: '#8ae3ed',
      height: '45%',
      width: '16%',
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#00bcd1',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.6,
      shadowRadius: 7,
    },
    deleteButton: {
      fontSize: 35,
      color: 'red',
      shadowColor: '#d10000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.6,
      shadowRadius: 5,
    },
    editButton: {
      fontSize: 35,
      color: '#ffe95c',
      shadowColor: '#d1c000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.6,
      shadowRadius: 5,
    },
    plusIcon: {
      fontSize: 90,
      color: 'white',
    },
    searchIcon: {
      fontSize: 25,
      color: 'white'
    },
    noteBox: {
      backgroundColor: 'white',
      width: '98%',
      height: '15%',
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 7,
      marginTop: '3%',
      flexDirection: 'row',
      alignItems: 'center',

    },
    noteText: {
      fontSize: 25,
      color: 'black',
      marginLeft: 10,
      flex: 0.75,
    },
});