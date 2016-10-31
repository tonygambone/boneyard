import Backbone from 'backbone';
import List from '../models/List';

// Backbone collection of list models

export default Backbone.Collection.extend({
    model: List,
    url: '/api/lists'
});