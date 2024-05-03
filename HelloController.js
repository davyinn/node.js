// Ici on va écrire la fonction sayHello
const sayHello = (req, res) => {
  res.send(["Hello World!"]);
};
// Fin de la fonction sayHello

const sayHelloInFrench = (req, res) => {
  res.send(["Bonjour le Monde!"]);
};

export { sayHello, sayHelloInFrench };
