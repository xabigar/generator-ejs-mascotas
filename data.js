// Datos de ejemplo en memoria (más adelante vendrán de una base de datos)
const owners = [
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

const pets = [
  { id: 1, name: 'Rex', species: 'dog', ownerId: 1 },
  { id: 2, name: 'Mimi', species: 'cat', ownerId: 2 },
  { id: 3, name: 'Luna', species: 'dog', ownerId: 1 }
];

module.exports = { owners, pets };
