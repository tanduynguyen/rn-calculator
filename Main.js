import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { connect, Connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from './Button';
import { pressNum, enter, operation, clear, swap, toggleNegative } from './modules';

const baseNumber = {
  backgroundColor: '#424242',
  textAlign: 'right',
  padding: 10,
  fontSize: 30,
  fontWeight: 'bold',
  borderBottomWidth: 1,
  borderColor: '#fafafa',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingTop: Platform.OS === 'ios' ? 32 : 20,
  },
  bottom: {
    backgroundColor: 'red',
    flex: 1,
  },
  number: {
    ...baseNumber
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'pink',
    borderWidth: 1,
    borderColor: '#fafafa',
  },
  append: {
    color: '#fff',
    ...baseNumber
  },
  replace: {
    color: '#2E71E5',
    ...baseNumber
  },
  push: {
    color: '#9bc23c',
    ...baseNumber
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: '#fafafa',
  }
});

const App = ({ calculatorState: { stack, inputState }, pressNumWithDispatch, enterAction, operationAction, clearAction, swapAction, toggleNegativeAction }) => (
    <View style={styles.container}>
      <View style={styles.top}>
      <TouchableOpacity onPress={() => toggleNegativeAction(2)} style={styles.bottomBorder}>
        <Text style={styles.append}>{stack[2] || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleNegativeAction(1)} style={styles.bottomBorder}>
        <Text style={styles.append}>{stack[1] || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleNegativeAction(0)} style={styles.bottomBorder}>
        <Text style={styles[inputState]}>{stack[0] || 0}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <View style={styles.row}>
          <Button text="clear" onPress={clearAction} />
          <Button text="pow" onPress={operationAction} />
          <Button text="swap" onPress={swapAction} />
          <Button text="/" onPress={operationAction} />
        </View>
        <View style={styles.row}>
          <Button text="9" onPress={pressNumWithDispatch} />
          <Button text="8" onPress={pressNumWithDispatch} />
          <Button text="7" onPress={pressNumWithDispatch} />
          <Button text="X" onPress={operationAction} />
        </View>
        <View style={styles.row}>
          <Button text="6" onPress={pressNumWithDispatch} />
          <Button text="5" onPress={pressNumWithDispatch} />
          <Button text="4" onPress={pressNumWithDispatch} />
          <Button text="-" onPress={operationAction} />
        </View>
        <View style={styles.row}>
          <Button text="3" onPress={pressNumWithDispatch} />
          <Button text="2" onPress={pressNumWithDispatch} />
          <Button text="1" onPress={pressNumWithDispatch} />
          <Button text="+" onPress={operationAction} />
        </View>
        <View style={styles.row}>
          <Button text="0" onPress={pressNumWithDispatch} />
          <Button text="." onPress={operationAction} />
          <Button text="Enter" special onPress={enterAction} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
);

export default connect(
  state => ({calculatorState: state}),
  dispatch => bindActionCreators({
    pressNumWithDispatch: pressNum,
    enterAction: enter,
    operationAction: operation,
    clearAction: clear,
    swapAction: swap,
    toggleNegativeAction: toggleNegative
  }, dispatch),
)(App);
