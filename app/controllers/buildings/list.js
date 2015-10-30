import Ember from 'ember';

export default Ember.Controller.extend({

  init() {
    this.get('buildingsController').addObserver('filteredRooms', this, 'parentFilteredRoomsDidChange');
    /*this.get('buildingsController').addObserver('display', this, 'parentDisplayDidChange');
    this.set('filteredRooms', this.get('buildingsController').get('filteredRooms'));*/
  },
  
  buildingsController: Ember.inject.controller('buildings'),
  filteredRooms: null,
  
  roomCount: function() {
    return this.get('filteredRooms').get('length');
  }.property(),

  parentFilteredRoomsDidChange(sender, key, value, rev) {
    this.notifyPropertyChange('packagedRooms');
  },

  parentDisplayDidChange(sender, key, value, context, rev) {
    console.log();
  },


  packagedRooms: function() {
    var rooms = this.get('buildingsController').get('filteredRooms');
    var buildingIds = [];
    var buildingArray = [];

    rooms.forEach(function(item) {
      var id = item.get('building').get('id');
      if (buildingIds.indexOf(id) < 0) {
        buildingIds.push(id);
        buildingArray.push({ 
          id: item.get('building').get('id'), 
          name: item.get('building').get('name') 
        });
      }
    });

    var buildings = Ember.ArrayProxy.create({ content: Ember.A(buildingArray) });
    var packaged = Ember.ArrayProxy.create({ content: [] });


    function buildingIteratorCallback(item) {

      var newObject = {
        id: item.id,
        name: item.name,
        rooms: this.filter(roomFilter).sort(function(a, b) {
          var _a = parseInt(a.get('roomNumber'));
          var _b = parseInt(b.get('roomNumber'));
          return _a - _b;
        })
      };

      function roomFilter(room) {
        if (room.get('building').get('id') === item.id) {
          return true;
        } else {
          return false;
        }
      }
      packaged.addObject(newObject);
    }

    buildings.forEach(buildingIteratorCallback, rooms);

    return packaged;
  }.property(),
});
