import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const intervalRef = useRef(null);
  const lastUpdateRef = useRef(0);

  const startStopwatch = () => {
    setIsRunning(true);
    lastUpdateRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const diff = now - lastUpdateRef.current;
      setElapsedTime(prev => prev + diff);
      lastUpdateRef.current = now;
    }, 10);
  };

  const stopStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(prevTime => prevTime + elapsedTime);
    setElapsedTime(0);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setElapsedTime(0);
  };

  const formatTime = (timeInMilliseconds) => {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time + elapsedTime)}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={isRunning ? stopStopwatch : startStopwatch}>
          <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    padding: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Stopwatch;
