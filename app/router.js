import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
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
  this.route('rooms', { 
    resetNamespace: true,
    path: '/' 
  });
});

export default Router;
