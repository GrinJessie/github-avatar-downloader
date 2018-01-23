var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');



var getRepoContributors = function(repoOwner, repoName, cb){
  var url = 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  request.get(url);
};


getRepoContributors ("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
})

