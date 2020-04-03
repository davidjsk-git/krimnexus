const articleCntr = require('../controllers/articleCntr.js')

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  articleCntr.show(req, res);
});

router.post('/', function(req, res, next) {
  console.log('검색어: ' + req.body.keyword)
  articleCntr.list(req, res);
});

router.get('/search', function(req, res, next) {
  res.render('search', { title: 'krimNexus' });
});

router.get('/search/:id?', function(req, res, next) {
  console.log(req.query);
  let category = req.param('category');
  let keyword = req.param('keyword');
  console.log("category: " + category, "keyword: " + keyword);

  const docs = [];
  res.render('index', { title: 'krimNexus', docs });
});

// 데이터 추가
router.get('/article', function(req, res, next) {
  res.render('addArticle', { title: '문서등록' });
});

router.post('/article', function(req, res, next) {
  console.log(req.body);
  articleCntr.create(req, res);
});


module.exports = router;
