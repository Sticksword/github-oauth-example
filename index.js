require('dotenv').config();

var githubOAuth = require('github-oauth')({
  githubClient: process.env.GITHUB_CLIENT,
  githubSecret: process.env.GITHUB_SECRET,
  baseURL: 'http://localhost:8080',
  loginURI: '/login',
  callbackURI: '/callback',
  scope: 'user' // optional, default scope is set to user
});

require('http').createServer(function(req, res) {
  if (req.url.match(/login/)) {
    console.log('login!');
    // console.log(req)
    return githubOAuth.login(req, res);
  }
  if (req.url.match(/callback/)) {
    console.log('callback!');
    console.log(req);
    return githubOAuth.callback(req, res);
  }
  res.write('Hello World!');
  res.end();
  return; 
}).listen(8080);

githubOAuth.on('error', function(err) {
  console.error('there was a login error', err);
});

githubOAuth.on('token', function(token, serverResponse) {
  console.log('here is your shiny new github oauth token', token);
  serverResponse.end(JSON.stringify(token));
});

// now go to http://localhost/login