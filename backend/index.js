//importo el express y el cors
const express = require('express')
const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
const login = require('./services/login')
const items = require('./services/items');

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port  = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())



//Ejemplo para ver cómo funciona un endpoint:
//este endpoint / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({message: 'Hola perras!'})
})

//Creación del endpoint: /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    console.log(req.query.user)
    console.log(req.query.password)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});

// Endpoint para insertar un item en la base de datos
app.post('/addItem', async (req, res) => {
    try {
      await items.insertData(req, res); // Llama la función insertData del archivo items.js
    } catch (err) {
      console.error(`Error while inserting item: ${err.message}`);
      res.status(500).json({ message: 'Error al insertar el item' });
    }
  });
  
  // Endpoint para obtener todos los items de la base de datos
  app.get('/getItems', async (req, res) => {
    try {
      await items.getData(req, res); // Llama la función getData del archivo items.js
    } catch (err) {
      console.error(`Error while getting items: ${err.message}`);
      res.status(500).json({ message: 'Error al obtener los items' });
    }
  });
  
  // Endpoint para eliminar un item de la base de datos por ID
  app.get('/deleteItem', async (req, res) => {
    try {
      const { id } = req.query; // Extraemos el id desde los parámetros de la URL
      if (!id) {
        return res.status(400).json({ message: 'ID del item es necesario para eliminar' });
      }
      await items.deleteData(req, res); // Llama la función deleteData del archivo items.js
    } catch (err) {
      console.error(`Error while deleting item: ${err.message}`);
      res.status(500).json({ message: 'Error al eliminar el item' });
    }
  });

  // Endpoint para insertar un item en la base de datos
app.post('/addIte2', async (req, res) => {
  try {
    await items.insertDat2(req, res); // Llama la función insertData del archivo items.js
  } catch (err) {
    console.error(`Error while inserting item: ${err.message}`);
    res.status(500).json({ message: 'Error al insertar el item' });
  }
});

// Endpoint para obtener todos los items de la base de datos
app.get('/getItem2', async (req, res) => {
  try {
    await items.getDat2(req, res); // Llama la función getData del archivo items.js
  } catch (err) {
    console.error(`Error while getting items: ${err.message}`);
    res.status(500).json({ message: 'Error al obtener los items' });
  }
});

// Endpoint para obtener todos los items de la base de datos
app.get('/getItem3', async (req, res) => {
  try {
    await items.getDat3(req, res); // Llama la función getData del archivo items.js
  } catch (err) {
    console.error(`Error while getting items: ${err.message}`);
    res.status(500).json({ message: 'Error al obtener los items' });
  }
});


//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)