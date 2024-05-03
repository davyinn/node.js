const signUp = (req, res) => {
  const { email, pseudo, password } = req.body;
  prisma.user
    .create({
      data: {
        email,
        pseudo,
        password,
      },
    })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

const { email, password } = req.body;
const user = await prisma.user.findUnique({
  where: {
    email,
  },
});

if (!user) {
  return res.status(404).json({ error: "User not found" });
}

const validPassword = await bcrypt.compare(password, user.password);

if (!validPassword) {
  return res.status(404).json({ error: "Password not valid" });
}

const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_SECRET,
  {
    expiresIn: "8000h",
  }
);

res.json(token);

prisma.user
  .create({
    data: {
      email,
      pseudo,
      password: hashedPassword,
    },
  })
  .then((user) => {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "8000h",
      }
    );
    res.json(token);
  })
  .catch((error) => {
    res.json(error);
  });
