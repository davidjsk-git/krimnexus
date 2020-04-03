const articleModel = require('../models/articleModel.js');
const qs = require("querystring");

module.exports = {

  create: function(req, res) {
            console.log("create new article...");
            let tags = [];
            if(req.body.tag1) tags.push(req.body.tag1);
            if(req.body.tag2) tags.push(req.body.tag2);
            if(req.body.tag3) tags.push(req.body.tag3);

            const article = new articleModel({
              author: req.body.author,
              subject: req.body.subject,
              contents: req.body.contents,
              category: req.body.category,
              tags: tags,
            });
            article.save(function(err, article) {
              if(!err && article) {
                res.render('search', { title: 'krimNexus' });
              }
              else if(err) {
                next(err);
              }
            });
  },
  update: function(req, res) {

  },
  show: function(req, res) {
          let option = parseInt(req.query.option, 10);
          console.log("option: " + option);

          if(option) { // searching by tag
            let tag = qs.unescape(req.query.tag);
            console.log("검색: " + tag)
            articleModel.find({tags: {$in: [tag]}}, function(err, docs) {
              if(err) next(err);
              if(docs) {
                console.log(docs);
                res.render('index', { title: 'krimNexus', docs: docs, keyword: tag})
              }
              else {
                // no result searching with the keyword
                console.log("no result...");
                res.render('index', { title: 'krimNexus', docs: null, keyword: keyword})
              }
            });
          }
          else { // searching by category
            let category = qs.unescape(req.query.category);
            console.log("검색: " + category)
            articleModel.find({category: category}, function(err, docs) {
              if(err) next(err);
              if(docs) {
                console.log(docs);
                res.render('index', { title: 'krimNexus', docs: docs, keyword: category})
              }
              else {
                // no result searching with the keyword
                console.log("no result...");
                res.render('index', { title: 'krimNexus', docs: null, keyword: category})
              }
            });
          }


  },
  list: function(req, res) {
          let keyword = req.body.keyword;

          articleModel.find({tags: {$in: [keyword]}}, function(err, docs) {
            if(err) next(err);
            if(docs) {
              console.log(docs);
              res.render('index', { title: 'krimNexus', docs: docs, keyword: keyword})
            }
            else {
              // no result searching with the keyword
              res.render('index', { title: 'krimNexus', docs: null, keyword: keyword})
            }
          });
  },
  remove: function(req, res) {

  }
};
