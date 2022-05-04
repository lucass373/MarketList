import { child, getDatabase, push, ref, update } from 'firebase/database';
import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import styles from './styles';


const db = getDatabase();
const itemRef = ref(db, 'Market List/')
const newPostKey = push(child(ref(db), 'Market List')).key;


export default class TaskListItem extends React.Component {
    toggleChecked = () => {
      const {key, checked} = this.props.task;
      const updates ={};
      updates['/Market List/' + newPostKey ] = ({
        checked : !checked});
        console.log(newPostKey)
      return update(ref(db),updates)};
  
    toggleStarred = () => {
      const { key, starred } = this.props.task;
      taskRef.child(key).update({ starred: !starred });
      console.log(newPostKey);
    };
  
    deleteItem = () => {
      const { key } = this.props.task;
      taskRef.child(key).remove();
    };
  
    render() {
      const { task } = this.props;
      const checkedText = task.checked ? styles.TaskListItem_Checked  : '';
  
      let buttonRight;
      if (task.checked) {
        buttonRight = (
          <Button onPress={this.deleteItem} name="delete" color="#d0011b" />
        );
      } else if (task.starred) {
        buttonRight = (
          <Button onPress={this.toggleStarred} name="star" color="#f8e81c" />
        );
      } else {
        buttonRight = (
          <Button
            onPress={this.toggleStarred}
            name="star-border"
            color="#9b9b9b"
          />
        );
      }
      return (  
        <View style={styles.TaskListItem}>
          <Button
            onPress={this.toggleChecked}
            name={task.checked ? 'check-box' : 'check-box-outline-blank'}
            color="#9612F7"
          />  
          <View style={styles.TaskListItem_TextContainer}>
            <Text style={[styles.TaskListItem_Text, checkedText]}>
              {task.text}
            </Text>
          </View>
  
          {buttonRight}
        </View>
      );
    }
  }
  