// Requiring our Todo model
const db = require('../models');

// Routes
// =============================================================
module.exports = (app) => {
  // GET route for getting all of the posts
  app.get('/api/movies/', (req, res) => {
    db.Post.findAll({}).then((dbPost) => res.json(dbPost));
  });

  // Get route for returning posts of a specific category
  app.get('/api/movies/title/:title', (req, res) => {
    db.Post.findAll({ // GET * FROM posts WHERE category = req.params.category
      where: {
        category: req.params.category,
      },
    }).then((dbPost) => {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get('/api/movies/:id', (req, res) => {
    db.Post.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbPost) => res.json(dbPost));
  });

  // POST route for saving a new post
  app.post('/api/movies', (req, res) => {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      review: req.body.review,
      rating: req.body.rating,
      category: req.body.category,
    }).then((dbPost) => res.json(dbPost));
  });

  // DELETE route for deleting posts
  app.delete('/api/movies/:id', (req, res) => {
    db.Post.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbPost) => res.json(dbPost));
  });

    // PUT route for updating posts
  app.put('/api/movies', (req, res) => {
    db.Post.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((dbPost) => res.json(dbPost));
  });
};
