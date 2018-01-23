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

var downloadImageByURL = function(url, filePath){
  var options = {
    url: url,
    headers: {
      'User-Agent': 'GrinJessie',
      'Authorization':token.GITHUB_TOKEN
      }
    };
  request(options)
    .on('err', function(err){
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
};

downloadImageByURL('https://avatars3.githubusercontent.com/u/192451?v=4', 'avatars/kvirani.jpg');

// getRepoContributors ("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   result = JSON.parse(result);
//   var data = [];
//   result.forEach(function(obj){
//     data.push(obj.avatar_url);
//   });
//   downloadImageByURL(data);
//   // console.log("Result:", data);
// })

