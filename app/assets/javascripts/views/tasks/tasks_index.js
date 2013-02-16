Failboat.Views.TasksIndex = Backbone.Marionette.CompositeView.extend({

  itemView: Failboat.Views.Task,


  template: JST['tasks/index'],


  events: {
    // 'submit #new_task': 'createNewTask'
  },

  initialize: function() {
    
  },

  appendHtml: function(collectionView, itemView, index){
    if(itemView.model.isFinished()) {
      collectionView.$('#finished').append(itemView.el);
    } else {
      collectionView.$('#tasks').append(itemView.el);
    }
  }



});
