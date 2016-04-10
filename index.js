use strict';

var params = {
  Client: redisClient,
  Items: [AnyObject],
  ItemsPerPage: Int,
  Key: String,
  Stamp: String,
  IndexStamp: false
}

// Set pages with key and items
module.exports.setPages = function(params, callback) {

  // Get Parameters
  var client = params.Client;
  var items = params.Items;
  var itemsPerPage = params.ItemsPerPage;
  var key = params.Key;
  var stamp = params.Index;
  var pages = Math.ceil(parseFloat(items) / itemsPerPage);
  if (stamp !== null) {
    key = key + ':' + stamp;
  }

  // Prepare redis
  var multi = client.multi();
  var index = 0;

  // Iterate through items
  for (var i = 0; i < pages; i++) {
    var page = [];
    // Add items to page
    for (var j = 0; j < itemsPerPage; j++) {
      if (items[index] !== undefined) {
        page.push(items[index]);
        index++;
      } else {
        break;
      }
    }
    multi.rpush(key, page);
  }

  // Run redis multi commands
  multi.exec(function(err, replies) {
    // Redis execution error
    if (err) {

    // Redis success
    } else {

    }
  });
};

var params = {
  Client: redisClient,
  Key: String,
  Page: Int
}

// Get page for a certain key
module.exports.getPage = function(params, callback) {

  // Get Parameters
  var client = params.Client;
  var key = params.Key;
  var page = params.Page;

  // Get key from redis
  client.lindex(key, page, function(err, result) {
    // Redis execution error
    if (err) {
    // Redis success
    } else {

      context.succeed(JSON.parse(result));
    }
  });
};

var params = {
  Client: redisClient,
  Key: String
  Stamp: String
}

// Delete pages for key
module.exports.deletePages = function(params, callback) {

  // Get parameters
  var client = params.Client;
  var key = params.Key;
  var stamp = params.Stamp;
  if (stamp !== null) {
    key = key + ':' + stamp;
  }

  // Clear cache
  client.del(key, function(err, result) {
    // Redis execution error
    if (err) {
    // Redis success
    } else {

      context.succeed(JSON.parse(result));
    }
  });
};
