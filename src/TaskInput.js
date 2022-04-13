import { child, getDatabase, push, ref, set } from 'firebase/database';
import React from 'react';
import { TextInput } from 'react-native';
import { taskRef, timeRef } from '../firebase/firebase';
import styles from './styles';
import initFire from '../firebase/firebase'
import {uid} from 'uid'

export default class TaskInput extends React.Component {
  state = { text: '' };
  handleSubmit = () => {
const db = getDatabase();
const uuid = uid()
      const newPostKey = child(ref(db), 'Market List/' + uuid);
      const newTask = {
      text: this.state.text.trim(),
      checked: false,
      starred: false,
      key: uuid,
    };
    if (newTask.text.length) {
      set(newPostKey, newTask);
      this.setState({ text: '' });
    }
  };

  handleChangeText = text => {
    this.setState({ text });
  };

  render() {
    return (
      <TextInput
        placeholder="Add a new task..."
        placeholderTextColor="#FFF"
        underlineColorAndroid="transparent"
        style={styles.TaskInput}
        value={this.state.text}
        onChangeText={this.handleChangeText}
        onSubmitEditing={this.handleSubmit}
      />
    );
  }
}