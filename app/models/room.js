import DS from "ember-data";

var Room = DS.Model.extend({
    building: DS.belongsTo('building', { async: false }),
    roomNumber: DS.attr('string'),
    roomType: DS.attr('string'),
    manager: DS.attr('string'),
    generalUsage: DS.attr('boolean'),
    seating: DS.attr('number'),
    display: DS.attr('boolean'),
    phone: DS.attr('boolean'),
    usageRestrictions: DS.attr('string'),
    network: DS.attr('boolean'),
    hasUsageRestrictions: DS.attr('boolean'),
    slug: DS.attr('string')
});

export default Room;
