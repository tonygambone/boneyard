import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Marionette from 'backbone.marionette';
import template from './templates/layout.html';

var AppLayout = Marionette.View.extend({
    el: '#app',
    template: template
});

var layout = new AppLayout();
layout.render();