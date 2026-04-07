import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import EmployeeForm from '../components/EmployeeForm';
import { getEmployeeById, updateEmployee } from '../services/api';

export default function EditEmployeeScreen({ navigation, route }) {
  const { employeeId, employee: employeeFromList } = route.params;
  // Si ya venimos desde la lista con un empleado cargado, evitamos una consulta inicial extra.
  const [employee, setEmployee] = useState(employeeFromList || null);
  const [loading, setLoading] = useState(!employeeFromList);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadEmployeeDetail() {
      if (employeeFromList) {
        return;
      }

      try {
        // Si no tenemos el detalle completo, lo pedimos a la API por id.
        const data = await getEmployeeById(employeeId);

        if (isMounted) {
          setEmployee(data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEmployeeDetail();

    return () => {
      // Esta bandera evita intentar actualizar el estado si la pantalla ya no existe.
      isMounted = false;
    };
  }, [employeeFromList, employeeId]);

  async function handleUpdate(updatedEmployee) {
    // Enviamos solo los datos editables; el id viaja por separado en la URL.
    await updateEmployee(employeeId, updatedEmployee);

    navigation.navigate('Lista', {
      message: 'Empleado actualizado correctamente',
    });
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.text}>Cargando datos del empleado...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <EmployeeForm
      initialValues={employee}
      buttonText="Actualizar empleado"
      onSubmit={handleUpdate}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    marginTop: 12,
    color: '#4B5563',
  },
  errorText: {
    color: '#991B1B',
    textAlign: 'center',
    fontWeight: '600',
  },
});
