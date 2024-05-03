import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAgents = async (req, res) => {
  try {
    const agents = await prisma.agent.findMany();
    // si ça ne fonctionne pas, le code en bas ne sera pas exec
    return res.send(agents);
  } catch (error) {
    // mais ce sera exec ici
    return res.status(500).send(error.message);
  }
};

const getAgent = async (req, res) => {
  const id = req.params.id;
  // const id = "1"
  // une fois que ta fais un parseInt
  // const id = 1
  try {
    const agent = await prisma.agent.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (agent === null) {
      return res.status(404).send("Agent not found");
    }

    // si ça ne fonctionne pas, le code en bas ne sera pas exec
    return res.send(agent);
  } catch (error) {
    // mais ce sera exec ici
    return res.status(500).send(error.message);
  }
};

const createAgent = (req, res) => {
  let agent = req.body;
  console.log(agent);

  prisma.agent
    .create({
      data: {
        name: agent.name,
      },
    })

    .then((agents) => {
      res.json(agents);
    })

    .catch((error) => {
      res.json(error);
    });
};

const updateAgent = (req, res) => {
  let id = Number(req.params.id);
  let agent = req.body;

  prisma.agent
    .update({
      where: {
        id: id,
      },
      data: {
        name: agent.name,
      },
    })
    .then((agent) => {
      res.json(agent);
    })
    .catch((error) => {
      res.json(error);
    });
};

const deleteAgent = (req, res) => {
  let id = Number(req.params.id);

  prisma.agent
    .delete({
      where: {
        id: id,
      },
    })
    .then((agent) => {
      res.json(agent);
    })
    .catch((error) => {
      res.json(error);
    });
};

export { getAgents, getAgent, createAgent, updateAgent, deleteAgent };
