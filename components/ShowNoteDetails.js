import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as React from 'react';
import { Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function ShowDetails({isVisible, onClose, note}) {
 
    return (
      <Modal supportedOrientations={["portrait", "landscape"]} transparent={true} visible={isVisible}>
        <View style={styles.container}>
          <View style={styles.noteDetailBackground}></View>
          <View style={styles.noteDetailsSurface}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteText}>{note.text}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back-circle-sharp" style={styles.closeButton} />
            </TouchableOpacity>    
          </View>
        <StatusBar style="auto" />
        </View>
      </Modal>   
    );
}

export default ShowDetails

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    noteDetailBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    noteDetailsSurface: {
      height: '70%',
      width: '90%',
      marginTop: '30%',
      backgroundColor: 'white',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'flex-start',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.7,
      shadowRadius: 40,
      position: 'absolute',
      padding: 10
    },
    noteTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black'
    },
    noteText: {
      fontSize: 20,
      color: 'black',
      alignSelf: 'flex-start',
      marginTop: '7%'
    },
    closeButton: {
      color: 'red',
      fontSize: 60,
      position: 'absolute',
      marginTop: '138%',
      marginLeft: '36%'
    },
  });