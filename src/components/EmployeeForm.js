import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MessageBox from './MessageBox';

export default function EmployeeForm({
  initialValues = {
    name: '',
    position: '',
    office: '',
    salary: '',
  },
  buttonText,
  onSubmit,
}) {
  // Cada useState guarda un campo del formulario para que sea facil de entender.
  const [name, setName] = useState(initialValues.name || '');
  const [position, setPosition] = useState(initialValues.position || '');
  const [office, setOffice] = useState(initialValues.office || '');
  const [salary, setSalary] = useState(
    initialValues.salary !== undefined && initialValues.salary !== null
      ? String(initialValues.salary)
      : ''
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  async function handleSave() {
    // Validacion minima para evitar enviar formularios incompletos.
    if (!name.trim() || !position.trim() || !office.trim() || !salary.trim()) {
      setMessageType('error');
      setMessage('Todos los campos son obligatorios');
      return;
    }

    // salary llega como texto desde el input; por eso lo convertimos a numero antes de enviarlo.
    const numericSalary = Number(salary);

    if (Number.isNaN(numericSalary)) {
      setMessageType('error');
      setMessage('El salario debe ser un numero valido');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // onSubmit viene desde la pantalla padre y puede apuntar a crear o actualizar.
      await onSubmit({
        name: name.trim(),
        position: position.trim(),
        office: office.trim(),
        salary: numericSalary,
      });

      setMessageType('success');
      setMessage('Proceso realizado correctamente');
    } catch (error) {
      setMessageType('error');
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.card}>
      <MessageBox type={messageType} message={message} />

      {/* Cada TextInput queda conectado a su estado para mantener un formulario controlado. */}
      <Text style={styles.label}>Nombre del empleado</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Ejemplo: Ana Gomez"
        style={styles.input}
      />

      <Text style={styles.label}>Cargo</Text>
      <TextInput
        value={position}
        onChangeText={setPosition}
        placeholder="Ejemplo: Desarrolladora"
        style={styles.input}
      />

      <Text style={styles.label}>Oficina</Text>
      <TextInput
        value={office}
        onChangeText={setOffice}
        placeholder="Ejemplo: Bogota"
        style={styles.input}
      />

      <Text style={styles.label}>Salario</Text>
      <TextInput
        value={salary}
        onChangeText={setSalary}
        placeholder="Ejemplo: 4200"
        keyboardType="numeric"
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>{buttonText}</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    margin: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
