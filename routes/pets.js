const express = require('express');
const router = express.Router();
const { owners, pets } = require('../data');

// GET /pets: todas las mascotas con el nombre de su dueño
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
  // IDs únicos: no basta con pets.length + 1 porque al borrar quedan huecos
  const nextId = pets.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const newPet = {
    id: nextId,
    name: req.body.name,
    species: req.body.species,
    ownerId: parseInt(req.body.ownerId)
  };
  pets.push(newPet);
  res.redirect(`/owner/${newPet.ownerId}`);
});

// POST /pets/:petId/delete: eliminar una mascota
router.post('/:petId/delete', (req, res) => {
  const id = Number(req.params.petId);
  const index = pets.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).send('Mascota no encontrada');

  const [deletedPet] = pets.splice(index, 1);
  // Volvemos al listado de mascotas del dueño de la mascota eliminada
  res.redirect(`/owner/${deletedPet.ownerId}/pets`);
});

module.exports = router;
