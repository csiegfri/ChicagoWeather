var express = require('express');
var router = express.Router();

/* GET home page. */
// Re-grabbing the code from Week 2 and Week 1
const requ = require('request-promise-native');

const options = {
  uri: 'https://api.github.com/users/csiegfri',
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true

};

var jlogin;
var jid;
var javatar;
var jhtml_url;
var jname;
var jbio;
var jupdated_at;

router.get('/', function(req, res, next){
  requ(options)
    .then(function(profile_json){
      jlogin = JSON.stringify(profile_json.login);
      jid = JSON.stringify(profile_json.id);
      javatar = JSON.stringify(profile_json.avatar_url);
      jhtml_url = JSON.stringify(profile_json.html_url);
      jname = JSON.stringify(profile_json.name);
      jbio = JSON.stringify(profile_json.bio);
      jupdated_at = JSON.stringify(profile_json.updated_at);
  });
  console.log(jlogin);
  next();
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Index',
    log: jlogin,
    id: jid,
    ava: javatar,
    html: jhtml_url,
    name: jname,
    bio: jbio,
    update: jupdated_at });
});

module.exports = router;
