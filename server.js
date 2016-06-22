var express = require('express'),
  requestProxy = requre('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();

var proxyGitHub = function(request, response) {
  console.log('routing gitHub requestion for', request.params[0]);
  (requestProxy({
    url: 'https://api.github.com/' + request.params[0],
    headers: {Authorization: 'token ' + process.env.GITHUB_TOKEN}
  }))(request, response); //completes our context similar to an IFFE
};

app.get('/github/*', proxyGitHub);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
