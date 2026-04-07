import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MessageBox({ type = 'success', message }) {
  if (!message) {
    // Si no hay mensaje, no renderizamos nada.
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        type === 'error' ? styles.errorContainer : styles.successContainer,
      ]}
    >
      <Text
        style={[
          styles.text,
          type === 'error' ? styles.errorText : styles.successText,
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  successContainer: {
    backgroundColor: '#DCFCE7',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  successText: {
    color: '#166534',
  },
  errorText: {
    color: '#991B1B',
  },
});
