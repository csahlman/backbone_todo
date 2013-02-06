window.Failboat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Failboat.TasksRouter = new Failboat.Routers.Tasks;
    this.session = new Failboat.Models.Session();
    if (this.session.authenticated()) {
      var user = new Failboat.Models.User({id: this.session.get('user_id')});
      user.fetch()
      this.currentUser = user;

    } else {
      console.log('unauthenticated, should be at login');
    }
    Backbone.history.start();
  }
};


$(document).ready(function(){
  Failboat.initialize();
});
