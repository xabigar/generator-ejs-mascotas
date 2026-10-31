const express = require('express');
const router = express.Router();
const { owners, pets } = require('../data');

// GET home page: lista de dueños
router.get('/', (req, res) => {
  res.render('index', { owners });
});

// POST /pets: agregar una nueva mascota
router.post('/pets', (req, res) => {
  const newPet = {
    id: pets.length + 1,
    name: req.body.name,
    species: req.body.species,
    ownerId: parseInt(req.body.ownerId)
  };
  pets.push(newPet);
  res.redirect(`/owner/${newPet.ownerId}`);
});

module.exports = router;
