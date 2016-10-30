import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Marionette from 'backbone.marionette';
import Router from './router';
import NavbarView from './views/NavbarView';
import PageView from './views/PageView';
import HomeView from './views/HomeView';
import Board from './models/Board';

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

        const board = window.board = new Board({ id: 1 });
        board.fetched = false;

        const router = new Router();
        router.on('route', (name, path, args) => {
            if (['about', 'contact'].includes(name)) {
                layout.showChildView('navbarRegion', new NavbarView({ activeItem: name }));
                layout.showChildView('pageRegion', new PageView({ page: name }));
            } else if (name === 'home') {
                layout.showChildView('navbarRegion', new NavbarView({ activeItem: name }));
                if (!board.fetched)
                {
                    board.fetch({ success: () => {
                        board.fetched = true;
                        layout.showChildView('pageRegion', new HomeView({ model: board }));
                    }});
                } else {
                    layout.showChildView('pageRegion', new HomeView({ model: board }));
                }
            }
        });
        Backbone.history.start();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    app.start();
});