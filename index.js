/** Object to hold all handlers
 */
var registry = [];

/** select what works
 */
var select = function(obj) {
    return _(registry).select(function(item) {
        return item.verb === obj.verb && minimatch(obj.noun,item.noun)
    });
};