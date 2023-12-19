import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Vibration, TouchableWithoutFeedback, Keyboard, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import ShowDetails from './ShowNoteDetails.js';
import EditNote from './EditNote.js';

function SearchNote() {
  const [savedNotes, setSavedNotes] = useState([]);
  const [searchedNote, setSearchedNote] = useState('');
  const [searchedNoteResults, setSearchedNoteResults] = useState([]);
  const [editNoteVisible, setEditNoteVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState([]);
  const [noteToShow, setNoteToShow] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    getSearchedData();
  }, [searchedNote, savedNotes])

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

  const getSearchedData = async () => {
    let results = [];

    if(searchedNote !== '') {
      savedNotes.forEach((note) => {
        if(note.title.toLowerCase().includes(searchedNote.toLowerCase())) {
          results.push(note);
        }
      });
      setSearchedNoteResults(results);
    } else {
      setSearchedNoteResults([]);
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

  const renderSearchResults = (note, index) => {
    return (
      <TouchableOpacity key={index} style={styles.noteBox} onPress={() => onShowDetails(note)}>
        <Text style={styles.noteText}>{note.title}</Text>
        <TouchableOpacity style={styles.actionButton} onPress={() => onShowEditNote(note)}>
          <MaterialIcons name="edit" style={styles.editButton} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => {showDeleteAlert(note.title)}}>
          <MaterialIcons name="delete" style={styles.deleteButton} />
        </TouchableOpacity>
      </TouchableOpacity>
      
    );
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
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <TextInput style={styles.searchInput} placeholder='Suchen Sie nach einer Notiz...' value={searchedNote} onChangeText={(userInput) => {setSearchedNote(userInput)}}></TextInput>
          <ScrollView style={styles.notesContainer} contentContainerStyle={{alignItems: 'center'}}>
            {
              searchedNoteResults.length > 0 ? searchedNoteResults.map((note, index) => renderSearchResults(note, index))
              : <Text></Text>
            }
          </ScrollView>
          <EditNote isVisible={editNoteVisible} onClose={onCloseEditNote} note={noteToEdit} reload={getData}></EditNote>
          <ShowDetails isVisible={detailsVisible} onClose={onCloseDetails} note={noteToShow}></ShowDetails>
          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    );
}

export default SearchNote;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    searchInput: {
      color: 'black',
      width: '95%',
      height: '5%',
      borderWidth: 1.5,
      borderRadius: 10,
      marginTop: '15%',
      fontSize: 20,
      padding: 5
    },
    actionButton: {
      flexDirection: 'row',
      flex: 0.125,
    },
    notesContainer: {
      width: '95%',
      //backgroundColor: '#c6c5c8',
      height: '82%',
      marginTop: '5%'
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
    noteBox: {
      backgroundColor: 'white',
      width: '98%',
      height: 100,
      borderRadius: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 7,
      marginTop: '5%',
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