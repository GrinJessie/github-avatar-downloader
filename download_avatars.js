var request = require('request');
var token = require('./secret');

console.log('Welcome to the GitHub Avatar Downloader!');



var getRepoContributors = function(repoOwner, repoName, cb){
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GrinJessie',
      'Authorization':token.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body){
    cb (err, body);
  });
};


getRepoContributors ("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result = JSON.parse(result);
  var data = [];
  result.forEach(function(obj){
    data.push(obj.avatar_url);
  });
  console.log("Result:", data);
})

