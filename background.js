/** Listen for external messages
 *
 */
var messageListener = function(req,sender,fn) {
    req.senderId = sender.id;
	if('register' in req && req.register) {
		registerHandler(req);
        fn('ok');
	} else {
		handleRequest(req,sender,fn);
	}
	return true;
};
//listen
chrome.runtime.onMessageExternal.addListener(messageListener);


/** Register a handler
 */
var registerHandler = function(req) {
    registry.push(req);
};

var handleRequest = function(req,sender,fn) {
    var selection = select(req),
        callback = fn;
    if(!selection.length) {
        throw "Couldn't find.";
    } else {
        chrome.runtime.sendMessage(selection[0].senderId,req, function(res) {
            callback(res);
        });
    }
};
