import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface ErrorPopupProps {
  message: string;
}

const ErrorPopupComponent: React.FC<ErrorPopupProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const animationId = useRef(0); 

  useEffect(() => {


    const currentId = Date.now();
    animationId.current = currentId;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      if (animationId.current === currentId) 
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
    }, 3000);

  }, [message]);

  if (!message) return null;

  return (
    <Animated.View style={[styles.popup, { opacity }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    zIndex: 9999,
    alignSelf: 'center',
    maxWidth: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width:'90%'
  },
  
  text: {
    color: 'white',
    fontSize: 13,
    flexWrap: 'wrap',
    width:'90%'

  },
});

export default ErrorPopupComponent;
