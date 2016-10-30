import Backbone from 'backbone';
import List from '../models/List';

export default Backbone.Collection.extend({
    model: List,
    url: '/api/lists'
});