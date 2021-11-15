const Router = require('express');
const router = Router();
const fetch = require('node-fetch');
const baseUrl = 'https://jsonbase.com/favorite-books';

router.get('/:userFavoriteBook', async (req, res) => {
  try {
    const { userFavoriteBook } = req.params;
    const finalUrl = (userFavoriteBook) => `${baseUrl}/${encodeURIComponent(userFavoriteBook)}`;
    const bookUrl = finalUrl(userFavoriteBook);

    // get favorite books for the user in jsonbase.com
    const response = await fetch(bookUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.status == 200) {
      res.json(await response.json());
    } else {
      res.status(404).json({ message: `falied to get data in jsonbase.com with status: ${response.status}` });
    }
  }
  catch(error){
    res.status(404).json({ message: `Unexpected error: ${error}` });
  }
});

router.put('/', async (req, res) => {
  try {
    const {user, favoriteBookId, favorite} = req.body;
    const finalUrl = (user, favoriteBookId) => `${baseUrl}/${encodeURIComponent(user)}-${favoriteBookId}`;
    const bookUrl = finalUrl(user, favoriteBookId);

    // save favorite books for the user in jsonbase.com
    const response = await fetch(bookUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"favorite" : favorite}),
      });

    if (response.status == 200) {
      res.json(
        { 
          favorite: favorite,
          message: 'data inserted in jsonbase.com' 
        });
    } else {
      res.status(500).json({ message: `falied to insert data in jsonbase.com with status: ${response.status}` });
    }
  }
  catch (error) {
    res.status(404).json({ message: `Unexpected error: ${error}` });
  }
})

module.exports = router;
