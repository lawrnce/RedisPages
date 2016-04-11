#Redis Pages

<p align="center">
<img src="/Assets/preview.gif" />
</p>

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
```javascript
setPages(params = {}, callback)
```
Caches pages.

######Parameters
* Client - A redis client.
* Items - An `Array` of `String` items to cache.
* ItemsPerPage - An `Int` value denoting the number of items in each page.
* Key - A `String` denoting the name of the item in the cache.
* Stamp - An optional `String` or `Integer` to differentiate each key.

```javascript
getPage(params = {}, callback)
```
Returns a single page.

######Parameters
* Client - A redis client.
* Key - A `String` denoting the name of the item in the cache.
* Index - An `Integer` value denoting the index of the page content. Starts from 0.

```javascript
deletePages(params = {}, callback)
```
Deletes a group of pages.

######Parameters
* Client - A redis client.
* Key - A `String` denoting the name of the item in the cache.
* Stamp - An optional `String` or `Integer` to differentiate each key.

##Installation
`npm install redis-pages`

##Author
Lawrence Tran

##License
See the LICENSE file for more info.
