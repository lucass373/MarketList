import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import orderBy from 'lodash/orderBy';
import TaskListItem from './TaskListItem';
import styles from './styles';
import { child, getDatabase, onValue, orderByKey, push, ref } from 'firebase/database';
import { initFire, taskRef } from '../firebase/firebase';

export default class TaskList extends React.Component {
    
  state = {
    Item: [],
    tasksLoading: true
  };

  componentDidMount() {
    const db = getDatabase();
    const itemRef = ref(db, 'marketList/')  
  

    onValue(itemRef, (snap) => {
      const task = [];
      snap.forEach((childSnap) => {
        task.push({...childSnap.val(), key: childSnap.key });
      });
      this.setState({ task, tasksLoading: false });
    });
  }

  renderItem = ({ item }) => {
    return <TaskListItem task={item} />;
  };

  render() {
    const { task, tasksLoading } = this.state;
    const orderedTasks = orderBy(
      task,
      ['checked', 'starred'],
    );

    let taskList;
    if (tasksLoading) {
      taskList = (
        <View style={styles.TaskList_Empty}>
          <Text style={styles.TaskList_EmptyText}>Loading...</Text>
        </View>
      );
    } else if (task.lenght){
      taskList = <FlatList data={item} renderItem={this.renderItem}/>;
    } else {
      taskList = (
        <View style={styles.TaskList_Empty}>
          <FlatList data={orderedTasks} renderItem={this.renderItem}/>
        </View>
      );
      }

    return taskList;
  }
}