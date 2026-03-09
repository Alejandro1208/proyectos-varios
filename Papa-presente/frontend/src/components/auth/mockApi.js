// Datos estáticos basados en tu SQL para pruebas sin backend

const USERS = [
  {
    id: 1,
    nombre: 'Test User',
    email: 'test@example.com',
    password: '123', // Contraseña simplificada para pruebas
  }
];

const HIJOS = [
  {
    id: 1,
    usuario_id: 1,
    nombre: 'Test Child',
    fecha_nacimiento: '2022-01-01'
  }
];

const CONSEJOS = [
  {
    id: 1,
    titulo: 'Fomentar la lectura',
    descripcion: 'Leer juntos todos los días ayuda a desarrollar el lenguaje y la imaginación.',
    edad_min_meses: 6,
    edad_max_meses: 36,
    categoria: 'Crianza'
  },
  {
    id: 2,
    titulo: 'Frutas y verduras',
    descripcion: 'Ofrecer una variedad de frutas y verduras de colores para asegurar una buena nutrición.',
    edad_min_meses: 12,
    edad_max_meses: 60,
    categoria: 'Alimentación'
  },
  {
    id: 3,
    titulo: 'Juego al aire libre',
    descripcion: 'El juego al aire libre es esencial para el desarrollo físico y social.',
    edad_min_meses: 18,
    edad_max_meses: 72,
    categoria: 'Juegos'
  }
];

const PLAZAS = [
  {
    id: 1,
    nombre: 'Plaza de Mayo',
    latitud: -34.6083,
    longitud: -58.3722,
    estado: 'Bueno',
    notas: 'Plaza histórica con mucho espacio para correr.'
  },
  {
    id: 2,
    nombre: 'Parque Lezama',
    latitud: -34.6274,
    longitud: -58.3703,
    estado: 'Regular',
    notas: 'Algunos juegos están en reparación.'
  }
];

// Almacenamiento temporal en memoria para hábitos
let HABITOS = [];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  login: async (email, password) => {
    await delay(500); // Simular retardo de red
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
      return { message: 'Login successful', user, token: 'mock-token-123' };
    }
    throw new Error('Credenciales inválidas');
  },

  register: async (userData) => {
    await delay(500);
    const newUser = { ...userData, id: USERS.length + 1 };
    USERS.push(newUser);
    return { message: 'User registered successfully' };
  },

  getConsejos: async (hijoId) => {
    await delay(500);
    return CONSEJOS;
  },

  getPlazas: async () => {
    await delay(500);
    return PLAZAS;
  },

  getHabitos: async (hijoId, fecha) => {
    await delay(500);
    let habito = HABITOS.find(h => h.hijo_id == hijoId && h.fecha === fecha);
    if (!habito) {
      habito = { id: Date.now(), hijo_id: hijoId, fecha, lavado_dientes: 0, limite_pantallas: 0, juego_puro: 0 };
      HABITOS.push(habito);
    }
    return habito;
  },

  updateHabito: async (id, data) => {
    await delay(500);
    const index = HABITOS.findIndex(h => h.id == id);
    if (index !== -1) {
      HABITOS[index] = { ...HABITOS[index], ...data };
      return { message: 'Habits updated successfully' };
    }
    throw new Error('Habit not found');
  }
};