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

module.exports = router;
