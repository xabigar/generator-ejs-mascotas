const express = require('express');
const router = express.Router();
const { owners, pets } = require('../data');

// GET home page: lista de dueños con su número de mascotas
router.get('/', (req, res) => {
  // La cuenta se calcula en la ruta (la vista solo presenta datos ya listos)
  const ownersWithCount = [];

  owners.forEach(owner => {
    let petCount = 0;

    pets.forEach(pet => {
      if (pet.ownerId === owner.id) {
        petCount = petCount + 1;
      }
    });

    ownersWithCount.push({
      id: owner.id,
      name: owner.name,
      email: owner.email,
      petCount: petCount
    });
  });

  res.render('index', { owners: ownersWithCount });
});

// GET /pets: todas las mascotas con el nombre de su dueño
router.get('/pets', (req, res) => {
  const petsWithOwner = [];

  pets.forEach(pet => {
    let ownerName = 'Sin dueño';

    owners.forEach(owner => {
      if (owner.id === pet.ownerId) {
        ownerName = owner.name;
      }
    });

    petsWithOwner.push({
      id: pet.id,
      name: pet.name,
      species: pet.species,
      ownerId: pet.ownerId,
      ownerName: ownerName
    });
  });

  res.render('pets', { pets: petsWithOwner });
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
