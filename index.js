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
  var err = isValidItems(items);
  if (err) {
    callback(err);
    return;
  }

  // Get items per page
  var itemsPerPage = params.ItemsPerPage;
  var err = isValidItemsPerPage(itemsPerPage);
  if (err) {
    callback(err);
    return;
  }

  // Get key
  var key = params.Key;
  var err = isValidKey(key);
  if (err) {
    callback(err);
    return;
  }

  // Get stamp
  var stamp = params.Index;
  var err = isValidStamp(stamp);
  if (err) {
    callback(err);
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
      return;
      // Redis success
    } else {
      callback(null, true);
      return;
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
function isValidItems(items) {
  if (Array.isArray(items) === false) {
    return new Error("Invalid 'Items' parameter. Not of type array.");
  } else if (items === null) {
    return new Error("Empty 'Items' parameter is not valid.");
  }
};

// Check if items per page is valid number
function isValidItemsPerPage(itemsPerPage) {
  if (Number.isInteger(itemsPerPage) == false){
    return new Error("Invalid 'ItemsPerPage' parameter. Not of type integer.")
  } else if (itemsPerPage < -1 || itemsPerPage === 0) {
    return new Error("Invalid 'ItemsPerPage' value. Must be a positive integer. -1 denotes all items in one page.");
  }
};

// Check if valid key
function isValidKey(key) {
  if (typeof key != "string") {
    return new Error("Invalid 'Key' parameter. Not of type String.");
  }
};


// Check if valid stamp
function isValidStamp(stamp) {
  if (typeof stamp !== "string" || typeof stamp !== "number") {
    return new Error("Invalid 'Stamp' parameter. Not of type String or Number.");
  }
};
