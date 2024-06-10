const express = require("express");
const cancionesService = require("./canciones.service");

const router = express.Router();

// GET /api/canciones
router.get("/api/canciones", async (req, res) => {
  // #swagger.tags = ['Canciones']
  try {
    const data = await cancionesService.findAll();
    return res.status(200).send(data);

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
    const { name, artist, numberReplays } = req.body;
    const newSong = { name, artist, numberReplays };
    const song = await cancionesService.save(newSong);
    return res.status(201).send(song);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/user/:id
router.delete("/api/canciones/:id", async (req, res) => {
  // #swagger.tags = ['Canciones']
  try {
    const cancionId = req.params.id;
    await cancionesService.remove(cancionId);
    return res.status(200).send("Cancion eliminada correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;