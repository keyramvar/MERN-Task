//Rutas para manipular los poryectos
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");

//Crea proyectos
//api/projects
router.post("/", auth, projectController.createProject);

router.get("/", auth, projectController.createProject);

module.exports = router;
