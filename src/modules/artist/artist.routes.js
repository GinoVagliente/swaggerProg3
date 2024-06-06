const express = require("express");
const artistService = require("./artist.service");

const router = express.Router();

// GET /api/artist
router.get("/api/artist", async (req, res) => {
  // #swagger.tags = ['Artista']
  try {
    params = JSON.parse(req.headers['params'])

    let paginated = await artistService.paginated(params)
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
});

router.post("/api/artist", async (req, res) => {
    // #swagger.tags = ['Artista']
    try {
      const newUser = req.body;
      console.log(newUser);
      const user = await artistService.save(newUser);
      return res.status(201).send(user);
  
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  });

module.exports = router;