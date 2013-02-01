window.Failboat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Failboat.Routers.Tasks;
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Failboat.initialize();
});
