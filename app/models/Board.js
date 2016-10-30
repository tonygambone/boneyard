import Backbone from 'backbone';
import Relational from 'backbone-relational';
import List from './List';
import ListCollection from '../collections/ListCollection';

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
    }]
});