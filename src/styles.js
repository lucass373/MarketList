import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: '#EEE',
    paddingTop: 22,
    paddingLeft: 10,
    paddingRight: 10,
    width : '100%',
  },
  Button: {
    paddingHorizontal: 10
  },
  TaskInput: {
    backgroundColor: '#612F74',
    height: 50,
    paddingLeft: 10,
    alignItems: 'center',
    marginVertical: 20,
    color: '#FFF',
    fontSize: 18,
  },
  TaskList_Empty:{
    justifyContent: 'center',
    marginBottom: 100,
  },
  TaskList_EmptyText: {
    fontSize: 24,
    color: '#DDD',
  },
  TaskListItem: {
    marginLeft: 10, 
    borderColor: '#612F74',
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: '#fff',
    marginBottom: 10,
    flexDirection: 'row',
    height: 45,
    width : '95%',
    paddingVertical: 10,
  },
  TaskListItem_TextContainer: {
    flex: 1,
  },
  TaskListItem_Text: {
    color: '#4A4A4A',
    fontSize: 16
  },
  TaskListItem_Checked: {
    color: '#9B9B9B',
    textDecorationLine: 'line-through'
  }
});

export default styles;