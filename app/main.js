import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Marionette from 'backbone.marionette';
import Router from './router';
import NavbarView from './views/NavbarView';
import PageView from './views/PageView';
import HomeView from './views/HomeView';

const app = new Marionette.Application({
    onStart: () => {
        const AppLayout = Marionette.View.extend({
            el: '#app',
            template: require('./templates/layout.html'),
            regions: {
                navbarRegion: '#navbar-region',
                pageRegion: '#page-region'
            }
        });
        const layout = new AppLayout();
        layout.render();

        const router = new Router();
        router.on('route', (name, path, args) => {
            if (['about', 'contact'].includes(name)) {
                layout.showChildView('navbarRegion', new NavbarView({ activeItem: name }));
                layout.showChildView('pageRegion', new PageView({ page: name }));
            } else if (name === 'home') {
                layout.showChildView('navbarRegion', new NavbarView({ activeItem: name }));
                layout.showChildView('pageRegion', new HomeView());
            }
        });
        Backbone.history.start();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    app.start();
});