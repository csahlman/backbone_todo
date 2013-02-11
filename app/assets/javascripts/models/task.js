Failboat.Models.Task = Backbone.RelationalModel.extend({
  urlRoot: '/tasks',

  defaults: {
    name: "default", 
    done: "false"
  },

  relations: [{
    type: Backbone.HasMany,
    key: 'comments',
    relatedModel: 'Failboat.Models.Comment',
    collectionType: 'Failboat.Collections.Comments',
    includeInJSON: false,
    reverseRelation: {
      key: "task_id",
      includeInJSON: 'id'
    } 
  }],


  validate: function(attributes) {
    // attributes hash only contains changed attributes, so extend it to include current ones as well
    mergedAttributes = _.extend(_.clone(this.attributes), attributes);
    if(!mergedAttributes.name  || mergedAttributes.name.trim() === "") {
      return "Task name must be present.";
    }
  },

  initialize: function() {
    
  },

  toggle: function() {
    this.save({
      done: !this.get('done')
    });
    this.trigger('change');
  },

  isFinished: function() {
    return (this.get('done') === true);
  }

});
