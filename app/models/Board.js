import Backbone from 'backbone';
import Relational from 'backbone-relational';
import List from './List';
import ListCollection from '../collections/ListCollection';
import _ from 'underscore';

// Backbone model of a board

export default Backbone.RelationalModel.extend({
    urlRoot: '/api/boards',
    relations: [{
        type: Backbone.HasMany,
        key: 'lists',
        relatedModel: List,
        collectionType: ListCollection,
        reverseRelation: {
            key: 'board',
            includeInJSON: Backbone.Model.prototype.idAttribute
        }
    }],

    // get a single card model by ID from within this board
    getCard: function(id) {
        return this.get('lists').models.map((l) => l.get('cards').get(id)).reduce((p,c) => p || c);
    }
});