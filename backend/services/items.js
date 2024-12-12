const db = require('./db'); // Conexión a la base de datos
const helper = require('../helper'); // Helper para manejar datos vacíos o nulos
const config = require('../config'); // Configuraciones adicionales si es necesario

// Función para insertar datos en la base de datos
async function insertData(req, res) {
  const { nombre, marca, tipo, precio } = req.body; // Los datos vienen del cuerpo de la solicitud (req.body)

  // Asegúrate de que los datos no estén vacíos
  if (!nombre || !marca || !tipo || !precio) {
    return res.status(400).json({ message: 'Faltan datos para insertar el item.' });
  }

  // Realizamos la consulta para insertar los datos en la base de datos
  try {
    const result = await db.query(
      'INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)',
      [nombre, marca, tipo, precio]  // Parámetros a insertar
    );

    // Si la inserción fue exitosa, result.affectedRows debería ser mayor que 0
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Item insertado correctamente' });
    } else {
      return res.status(500).json({ message: 'Error al insertar el item' });
    }
  } catch (err) {
    console.error('Error al insertar el item: ', err.message);
    return res.status(500).json({ message: 'Error al insertar el item' });
  }
}

// Función para obtener los datos de la base de datos
async function getData(req, res) {
  try {
    // Realizamos la consulta SELECT para obtener todos los items de la tabla coleccion
    const rows = await db.query('SELECT * FROM coleccion');

    // Usamos el helper para garantizar que no haya datos vacíos
    const data = helper.emptyOrRows(rows);

    // Retornamos los datos obtenidos
    return res.json({ data });
  } catch (err) {
    console.error('Error al obtener los datos: ', err.message);
    return res.status(500).json({ message: 'Error al obtener los datos' });
  }
}

// Función para eliminar un item de la base de datos por su id
async function deleteData(req, res) {
  const { id } = req.query;  // El id se pasa como parámetro en la query (ej. /deleteItem?id=1)

  if (!id) {
    return res.status(400).json({ message: 'ID del item es requerido para eliminar' });
  }

  try {
    // Realizamos la consulta DELETE para eliminar el item con ese id de la tabla coleccion
    const result = await db.query('DELETE FROM coleccion WHERE id = ?', [id]);

    // Si la eliminación fue exitosa, result.affectedRows debería ser mayor que 0
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Item eliminado correctamente' });
    } else {
      return res.status(500).json({ message: 'Error al eliminar el item' });
    }
  } catch (err) {
    console.error('Error al eliminar el item: ', err.message);
    return res.status(500).json({ message: 'Error al eliminar el item' });
  }
}


// Función para insertar datos en la base de datos
async function insertDat2(req, res) {
  const { articulo, persona, fecha} = req.body; // Los datos vienen del cuerpo de la solicitud (req.body)

  // Asegúrate de que los datos no estén vacíos
  if (!articulo || !persona || !fecha) {
    return res.status(400).json({ message: 'Faltan datos para insertar el item.' });
  }

  // Realizamos la consulta para insertar los datos en la base de datos
  try {
    const result = await db.query(
      'INSERT INTO prestamos (articulo, persona, fecha) VALUES (?, ?, ?)',
      [articulo, persona, fecha]  // Parámetros a insertar
    );

    // Si la inserción fue exitosa, result.affectedRows debería ser mayor que 0
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Item insertado correctamente' });
    } else {
      return res.status(500).json({ message: 'Error al insertar el item' });
    }
  } catch (err) {
    console.error('Error al insertar el item: ', err.message);
    return res.status(500).json({ message: 'Error al insertar el item' });
  }
}

// Función para obtener los datos de la base de datos
async function getDat2(req, res) {
  try {
    // Realizamos la consulta SELECT para obtener todos los items de la tabla coleccion
    const rows = await db.query('SELECT * FROM prestamos');

    // Usamos el helper para garantizar que no haya datos vacíos
    const data2 = helper.emptyOrRows(rows);

    // Retornamos los datos obtenidos
    return res.json({ data2 });
  } catch (err) {
    console.error('Error al obtener los datos: ', err.message);
    return res.status(500).json({ message: 'Error al obtener los datos' });
  }
}

module.exports = {
  getData,
  insertData,
  deleteData,
  insertDat2,
  getDat2,
};
