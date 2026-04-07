import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function EmployeeItem({ employee, onEdit, onDelete }) {
  function confirmDelete() {
    // Antes de eliminar, pedimos confirmacion para evitar acciones accidentales.
    Alert.alert(
      'Eliminar empleado',
      'Deseas eliminar este registro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => onDelete(employee._id) },
      ]
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.textArea}>
        {/* Mostramos los campos mas importantes del empleado en formato de tarjeta. */}
        <Text style={styles.name}>{employee.name}</Text>
        <Text style={styles.detail}>Cargo: {employee.position}</Text>
        <Text style={styles.detail}>Oficina: {employee.office}</Text>
        <Text style={styles.detail}>Salario: ${employee.salary}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={[styles.button, styles.editButton]} onPress={() => onEdit(employee)}>
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.deleteButton]} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  textArea: {
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  detail: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2563EB',
  },
  deleteButton: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
