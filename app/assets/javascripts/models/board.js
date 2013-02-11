Failboat.Models.Board = Backbone.RelationalModel.extend({
  urlRoot: '/boards',

  relations: [{
    type: Backbone.HasMany,
    key: 'tasks',
    relatedModel: 'Failboat.Models.Task',
    collectionType: 'Failboat.Collections.Tasks',
    includeInJSON: false,
    reverseRelation: {
      key: "board_id",
      includeInJSON: 'id'
    } 
  }]


});
