#Redis Pages

Redis pages is a simply interface for caching page based content in redis.

##Usage
```javascript
var redis = require('redis');
var redisPages = require('redis-pages');
var client = redis.createClient();

// An array of items
var items = [];

var params = {
  Client : client,
  Items : items,
  ItemsPerPage: 10,
  Key: 'MyKey',
  Stamp: null
}

redisPages.setPages(params, function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

```
##Documentation

##Installation
`npm install redis-pages`

##Author
Lawrence Tran

##License
See the LICENSE file for more info.
