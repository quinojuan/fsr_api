import Publisher from "../models/publisherModel.js"; // la extensión JS de este archivo me volvió loco

export const postPublisher = async (req, res) => {
  try {
    const {
      name,
      lastName,
      gender,
      group,
      hope,
      elder,
      active,
      dateOfBirth,
      dateInmersed,
      ministerialServant,
      regularPionner,
      activityMonth,
    } = req.body;

    const publisher = new Publisher({
      name,
      lastName,
      gender,
      group,
      hope,
      elder,
      active,
      dateOfBirth,
      dateInmersed,
      ministerialServant,
      regularPionner,
      activityMonth,
    });
    await publisher.save();
    console.log(publisher);
    res.status(201).json({ message: "Publisher created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
export const getAllPublishers = async (req, res) => {
  
  try {
    const publishers = await Publisher.find({state: "active"}).sort({ group: 1, lastName: 1 })
    res.json(publishers)
  } catch (error) {
    console.log(error)
  }
  
  
  // try {
  //   const publishers = await Publisher.find({});
  //   res.json(publishers);
  // } catch (error) {
  //   console.log(error);
  // }
};

export const updatePublisher = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    lastName,
    gender,
    group,
    hope,
    elder,
    active,
    dateOfBirth,
    dateOfInmersed,
    ministerialServant,
    regularPionner,
  } = req.body;

  try {
    await Publisher.findOneAndUpdate(
      { _id: id },
      {
        name,
        lastName,
        gender,
        group,
        hope,
        elder,
        active,
        dateOfBirth,
        dateOfInmersed,
        ministerialServant,
        regularPionner,
      },
      { new: true, runValidators: true } // si no ponía el runValidator me permitía actualizar el valor del enum "hope" a cualquier dato.
    );
    console.log("Document updated!");
    res.json("Success!");
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};
export const updateServiceReport = async (req, res) => {
  const { id } = req.params;
  const { activityMonth } = req.body;
  const {
    month,
    placements,
    videoShowings,
    hours,
    returnVisits,
    bibleStudies,
    remarks,
  } = activityMonth;

  console.log(activityMonth, "<<<<< soy activityMonth");
  try {
    await Publisher.updateOne(
      { _id: id },
      {
        $push: {
          activityMonth: {
            month,
            placements,
            videoShowings,
            hours,
            returnVisits,
            bibleStudies,
            remarks,
          },
        },
      },
      { new: true, runValidators: true }
    );

    res.json("success");
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};
export const queryData = async (req, res) => {
  try {
    const { type } = req.params;
    // Realizo la consulta basada en el type de la query
    if (type === "active") {
      const actives = await Publisher.find({ state: { $ne: "inactive" } });
      res.json(actives);
    } else if (type === "inactive") {
      const inactives = await Publisher.find({ state: { $ne: "active" } });
      res.json(inactives);
    } else {
      res.json("La consulta no existe!");
    }
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};
export const queryStrings = async (req, res) => {
  const { publisher, state, group } = req.query;
  const { type } = req.params;

  switch (type) {
    case "searchbypublisher":
      try {
        const publisherFound = await Publisher.findOne({ name: publisher });
        if (!publisherFound) {
          res.status(404).json("Publicador no encontrado");
        } else {
          res.status(200).json(publisherFound);
          break;
        }
      } catch (error) {
        console.log("OK");
        res.json(error.message);
        break;
      }

    case "searchbyactives":
      try {
        const states = await Publisher.find({ state: "active" });
        const activeList = states.map((pub) => {
          return `${pub.name} ${pub.lastName}`;
        });
        res.json(activeList);
        break;
      } catch (error) {
        console.log(error.message);
        res.json(error.message);
        break;
      }

    case "searchbygroup":
      try {
        const publishersOfAGroup = await Publisher.find({ group });
        const numberOfPublishers = await Publisher.count({
          group,
          state: "active",
        });
        const nameOfPublishers = publishersOfAGroup.map((publisher) => {
          return `${publisher.name} ${publisher.lastName}`;
        });
        res.json({
          publishers: publishersOfAGroup,
          count: numberOfPublishers,
          names: nameOfPublishers,
        });
        break;
      } catch (error) {
        console.log(error.message);
        res.json(error.message);
        break;
      }
    default:
      res.json("No se encontró el tipo de consulta");
  }
};

export const getResume = async (req, res) => {
  try {
    const publishers = await Publisher.countDocuments();
    const actives = await Publisher.countDocuments({ state: "active" });
    const inactives = await Publisher.countDocuments({ state: "inactive" });
    const groups = [];

    for (let i = 1; i < 5; i++) {
      const cantidad = await Publisher.countDocuments({ group: i });
      groups.push(cantidad);
    }
    res.json({
      total: publishers,
      activos: actives,
      inactivos: inactives,
      group: {
        grupo_1: groups[0],
        grupo_2: groups[1],
        grupo_3: groups[2],
        grupo_4: groups[3],
      },
    });
  } catch (error) {
    console.log(error);
  }
};
