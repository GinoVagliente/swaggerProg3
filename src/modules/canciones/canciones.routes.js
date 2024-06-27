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

router.get("/api/cancionesQuery/", async (req, res) => {
  // #swagger.tags = ['Canciones']
  try {
    const id = req.query.id;
    const respuesta = await cancionesService.findOneById(id);
    return res.status(200).send(respuesta);

  } catch (error) {
    console.log(error);
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

router.put("/api/canciones/",  async (req, res) => {
  // #swagger.tags = ['Canciones']
  try {
    const cancionId = req.query.id;
    const updatedCancion = req.body;
    const cancion = await cancionesService.update(cancionId, updatedCancion);
    return res.status(200).send(cancion);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});


// DELETE /api/user/:id
router.delete("/api/canciones/", async (req, res) => {
  // #swagger.tags = ['Canciones']
  try {
    const cancionId = req.query.id;
    await cancionesService.remove(cancionId);
    return res.status(200).send("Cancion eliminada correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;