const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;
const { addTutorial, getTutorial, getAllTutorials } = require("./queryHelpers");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const { title, description, published } = req.body;
    const [result] = await addTutorial(title, description, published);
    if (result.insertId) {
      const [data] = await getTutorial(result.insertId);
      res.send({ success: true, result: data[0] });
    } else {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Tutorial."
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial."
    });
  }
  // Create a Tutorial
  /* const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    }); */
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    const title = req.query.title;
    const [data] = await getAllTutorials(title);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials."
    });
  }
  /*  const title = req.query.title;
   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
 
   Tutorial.findAll({ where: condition })
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving tutorials."
       });
     }); */
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const [data] = await getTutorial(id);
    if (data.length > 0) {
      res.send(data[0]);
    } else {
      res.status(404).send({
        success: false,
        error: `No employee found with id ${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  }
  /* Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    }); */
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
