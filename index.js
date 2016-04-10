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

  // check if redis
  var client = params.Client;

  // Get items
  var items = params.Items;
  // Check if valid array
  if (Array.isArray(items) == false) {
    callback(new Error("Invalid 'Items' parameter. Not of type array."));
    return;
  } else if (items === null) {
    callback(new Error("Empty 'Items' parameter is not valid."));
    return;
  }

  // Get items per page
  var itemsPerPage = params.ItemsPerPage;
  // Check if valid int
  if (Number.isInteger(itemsPerPage) == false){
    callback(new Error("Invalid 'ItemsPerPage' parameter. Not of type integer."))
    return;
    // Check if int is valid
  } else if (itemsPerPage < -1 || itemsPerPage === 0) {
    callback(new Error("Invalid 'ItemsPerPage' value. Must be a positive integer. -1 denotes all items in one page."));
    return;
  }

  // Get key
  var key = params.Key;
  // Check if valid key
  if (typeof key != "string") {
    callback(new Error("Invalid 'Key' parameter. Not of type String."))
    return;
  }

  // Get stamp
  var stamp = params.Index;
  // Check if valid stamp
  if (typeof key !== "string" || typeof key !== "number") {
    callback(new Error("Invalid 'Stamp' parameter. Not of type String or Number."))
    return;
  }
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
      callback(err);
      // Redis success
    } else {
      callback(null, true);
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

// Error handling
// Check if items is a valid array
isValidItems(items) {
  if (Array.isArray(items) === false) {
    return new Error("Invalid 'Items' parameter. Not of type array.");
  } else if (items === null) {
    return new Error("Empty 'Items' parameter is not valid.");
  }
};
