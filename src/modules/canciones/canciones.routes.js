const express = require("express");
const cancionesService = require("./canciones.service");

const router = express.Router();

// GET /api/canciones
router.get("/api/canciones", async (req, res) => {
  // #swagger.tags = ['Canciones']
  try {
    params = JSON.parse(req.headers['params'])

    let paginated = await cancionesService.paginated(params)
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
});

router.get("/api/canciones/:id", async (req, res) => {
  // #swagger.tags = ['Canciones']
  try {
    const id = req.params.id
    let respuesta = await cancionesService.findOneById(id)
    return res.status(200).send(respuesta);

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
});

router.post("/api/canciones", async (req, res) => {
  // #swagger.tags = ['Canciones']
  try {
    const { name, artist, numberReplays } = req.body; // Extraer las propiedades relevantes
    const newSong = { name, artist, numberReplays }; // Crear un nuevo objeto de canción con esas propiedades
    const song = await cancionesService.save(newSong); // Guardar la nueva canción
    return res.status(201).send(song);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});


module.exports = router;