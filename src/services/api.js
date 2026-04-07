// Servicio sencillo para centralizar la URL y las funciones que consumen la API.
// La idea es que el estudiante pueda ubicar en un solo lugar toda la comunicacion con el servidor.

export const BASE_URL = 'https://nodejs-test-tfzg.onrender.com/api/empleados';

async function request(url, options = {}) {
  try {
    // Esta funcion base evita repetir fetch, headers y manejo de errores en cada peticion.
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const message =
        data?.message || data?.error || 'Ocurrio un error al consumir la API';
      throw new Error(message);
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error de conexion');
  }
}

function normalizeListResponse(data) {
  // Algunas APIs responden con un arreglo directo y otras con { data: [...] }.
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function normalizeEmployeeResponse(data) {
  // Para un solo registro aplicamos la misma idea de normalizacion.
  if (data?.data && !Array.isArray(data.data)) {
    return data.data;
  }

  return data;
}

export async function getEmployees() {
  // Consulta todo el listado de empleados.
  const data = await request(BASE_URL);
  return normalizeListResponse(data);
}

export async function getEmployeeById(id) {
  // Consulta un empleado especifico usando su identificador.
  const data = await request(`${BASE_URL}/${id}`);
  return normalizeEmployeeResponse(data);
}

export async function createEmployee(employee) {
  // Crea un nuevo empleado enviando los datos en formato JSON.
  const data = await request(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(employee),
  });

  return normalizeEmployeeResponse(data);
}

export async function updateEmployee(id, employee) {
  // Actualiza un empleado existente.
  const data = await request(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(employee),
  });

  return normalizeEmployeeResponse(data);
}

export async function deleteEmployee(id) {
  // Elimina un empleado por id.
  return request(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
}
