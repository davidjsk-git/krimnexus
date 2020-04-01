var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'kriM' });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'krimNexus' });
});

// 데이터 추가
router.get('/article', function(req, res, next) {
  res.render('addArticle', { title: '문서등록' });
});

router.post('/article', function(req, res, next) {
  console.log(req.body);
  res.render('index', { title: 'kriM' });
});


module.exports = router;
