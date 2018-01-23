var request = require('request');
var fs = require('fs');
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

var downloadImageByURL = function(urls, filePath){
 for (i = 0; i < urls.length; i++) {
  var options = {
    url: urls[i],
    headers: {
      'User-Agent': 'GrinJessie',
      'Authorization':token.GITHUB_TOKEN
      }
    };
  request(options)
    .on('err', function(err){
      throw err;
    })
    .pipe(fs.createWriteStream(filePath[i]));
 }
};


getRepoContributors ("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result = JSON.parse(result);
  var urlList = [];
  var filePath = [];
  result.forEach(function(obj){
    urlList.push(obj.avatar_url);
    filePath.push('avatars/' + obj.login + '.jpg');
  });
  downloadImageByURL(urlList, filePath);
})

