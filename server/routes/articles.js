var express = require('express');
var router = express.Router();
var {getUserArtikel, insertArtikel, getArtikel, updateArtikel, deleteArtikel, getOneArticle, addComments, deleteComment} = require('../controller/article');
var isLogin = require('../middlewares/isLogin');
/* GET home page. */
router.post('/', isLogin, insertArtikel)
      .get('/', getArtikel)
      .get('/:id/detailarticle', getOneArticle)
      .get('/userarticles', isLogin, getUserArtikel)
      .put('/:id', isLogin, updateArtikel)
      .put('/:id/comment', isLogin, addComments)
      .put('/:id/comment/:idcomment/delete', isLogin, deleteComment)
      .delete('/:id', isLogin, deleteArtikel)
module.exports = router;
