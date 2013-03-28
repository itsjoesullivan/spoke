mocha.setup({
    ui: 'bdd',
    globals: ['*']
});

var expect = chai.expect;

describe('select', function() {
    it('returns an array', function() {
        registry = [];
        var selection = select({noun:'asdf',verb:'fdsa'});
        expect(_(selection).isArray()).to.equal(true);
    });
    
    it('returns identical items', function() {
        registry = [{
            verb: 'read',
            noun: 'time'
        }];
        var selection = select({noun: 'time', verb: 'read'});
        expect(selection.length).to.equal(1);
        expect(selection[0].noun).to.equal('time');
        expect(selection[0].verb).to.equal('read');
    });
    
    it('returns protocol://* noun registrants with protocol://index', function() {
        registry = [
            {
                verb: "read",
                noun: "protocol://*"
            }
        ];
        var selection = select({noun: 'protocol://index', verb: 'read'});
        expect(selection.length).to.equal(1);
    });
    
    it('requires verbs to match', function() {
        registry = [
            {
                verb: "read",
                noun: "protocol://*"
            }
        ];
        var obj = {
            noun: "protocol://index",
            verb: "read"
        };
        var selection = select(obj)
        expect(selection.length).to.equal(1);
        obj.verb = '';
        var selection = select(obj);
        expect(selection.length).to.equal(0);
    });
});

mocha.run();