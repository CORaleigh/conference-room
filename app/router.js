import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  /* jshint ignore:start */
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
      'page': this.get('url'),
      'title': this.get('url')
    });
  }.on('didTransition')
  /* jshint ignore:end */
});

Router.map(function() {
  this.route('buildings', { path: '/' }, function() {
    this.route('detail', { path: ':building_slug' });
    this.route('list', { path: 'all' });
  });
});

export default Router;
