var request = require('request');
var fs = require('fs');
var token = require('./secret');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

var getRepoContributors = function(repoOwner, repoName, cb){
  if(!repoOwner || !repoName) {
    console.log('please enter repoOwner and repoName to proceed!');
  } else {
    var options = {
      url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
      headers: {
        'User-Agent': 'GrinJessie',
        'Authorization': token.GITHUB_TOKEN
      }
    };
    request(options, function(err, res, body){
      cb(err, body);
    });
  }
};

var downloadImageByURL = function(urls, filePath){
  for (i = 0; i < urls.length; i++) {
    var options = {
      url: urls[i],
      headers: {
        'User-Agent': 'GrinJessie',
        'Authorization': token.GITHUB_TOKEN
      }
    };
    request(options)
      .on('err', function(err){
        throw err;
      })
      .pipe(fs.createWriteStream(filePath[i]));
  }
};

getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  var data = JSON.parse(result);
  var urlList = [];
  var filePath = [];
  data.forEach(function(obj){
    urlList.push(obj.avatar_url);
    filePath.push('avatars/' + obj.login + '.jpg');
  });
  downloadImageByURL(urlList, filePath);
});

