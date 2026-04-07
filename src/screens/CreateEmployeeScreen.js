import React from 'react';
import EmployeeForm from '../components/EmployeeForm';
import { createEmployee } from '../services/api';

export default function CreateEmployeeScreen({ navigation }) {
  async function handleCreate(employee) {
    // La pantalla solo coordina el flujo: el formulario recolecta datos y el servicio habla con la API.
    await createEmployee(employee);

    // Despues de guardar, volvemos a la lista con un mensaje simple.
    navigation.navigate('Lista', {
      message: 'Empleado creado correctamente',
    });
  }

  return <EmployeeForm buttonText="Guardar empleado" onSubmit={handleCreate} />;
}
