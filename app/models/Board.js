import Backbone from 'backbone';
import ListCollection from '../collections/ListCollection';

export default Backbone.Model.extend({
    set: function(attributes, options) {
        if (attributes.lists !== undefined && !(attributes.lists instanceof ListCollection)) {
            attributes.lists = new ListCollection(attributes.lists);
        }
        return Backbone.Model.prototype.set.call(this, attributes, options);
    }
});