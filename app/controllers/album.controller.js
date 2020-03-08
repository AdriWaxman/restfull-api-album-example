//Aqui generamos todos los metodos de CRUD
/*
create
findAll
findOne
update
delete
deleteAll
findAllPublished
*/

const db = require('../models');
const Album = db.Album;

// Create and Save a new Album
exports.create = (req, res) => {
      // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Album
  const album = new Album({
    title: req.body.title,
    artist: req.body.artist,
    description: req.body.description,
    publishedDate: req.body.publishedDate,
    published: req.body.published ? req.body.published : false
  });

  // Save Album in the database
  album
    .save(album)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Album."
      });
    });
  
};

// Retrieve/Recupera all Albums from the database.
exports.findAll = (req, res) => {

    //We use req.query.title to get query string from 
    //the Request and consider it as condition for findAll() method.
    const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving albums."
      });
    });
};

// Find a single Album with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Album with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Album with id=" + id });
      });
};

// Update a Album by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Album with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Album was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Album with id=" + id
          });
        });
};

// Delete a Album with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Album with id=${id}. Maybe Album was not found!`
          });
        } else {
          res.send({
            message: "Album was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Album with id=" + id
        });
      });
};

// Delete all Albums from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Albums were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all albums."
      });
    });
};

// Find all published ALbums
//Find all album with published = true;
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving albums."
      });
    });
};
