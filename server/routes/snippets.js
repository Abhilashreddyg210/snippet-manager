const router = require('express').Router();
const Snippet = require('../models/Snippet');
const verifyToken = require('../middleware/auth');

// GET ALL SNIPPETS (Protected) - GET /api/snippets
router.get('/', verifyToken, async (req, res) => {
  try {
    // Only get snippets for the logged-in user
    const snippets = await Snippet.find({ user: req.user._id });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE SNIPPET (Protected) - POST /api/snippets
router.post('/', verifyToken, async (req, res) => {
  try {
    const newSnippet = new Snippet({
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      language: req.body.language,
      tags: req.body.tags,
      user: req.user._id // From the verified token
    });

    const savedSnippet = await newSnippet.save();
    res.status(201).json(savedSnippet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// TOGGLE FAVORITE (Protected) - PUT /api/snippets/:id/favorite
router.put('/:id/favorite', verifyToken, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, user: req.user._id });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    snippet.isFavorite = !snippet.isFavorite;
    await snippet.save();
    
    res.json({
      _id: snippet._id,
      isFavorite: snippet.isFavorite,
      message: snippet.isFavorite ? 'Added to favorites' : 'Removed from favorites'
    });
  } catch (error) {
    console.error('Favorite toggle error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET FAVORITES (Protected) - GET /api/snippets/favorites
router.get('/favorites', verifyToken, async (req, res) => {
  try {
    const favorites = await Snippet.find({ 
      user: req.user._id, 
      isFavorite: true 
    }).sort({ updatedAt: -1 });
    
    res.json(favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE SNIPPET (Protected) - PUT /api/snippets/:id
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, user: req.user._id });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Update only the fields that are provided in the request
    if (req.body.title !== undefined) snippet.title = req.body.title;
    if (req.body.description !== undefined) snippet.description = req.body.description;
    if (req.body.code !== undefined) snippet.code = req.body.code;
    if (req.body.language !== undefined) snippet.language = req.body.language;
    if (req.body.tags !== undefined) snippet.tags = req.body.tags;

    const updatedSnippet = await snippet.save();
    res.json(updatedSnippet);
  } catch (error) {
    console.error('Update snippet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE SNIPPET (Protected) - DELETE /api/snippets/:id
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, user: req.user._id });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    await Snippet.deleteOne({ _id: req.params.id });
    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error('Delete snippet error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;