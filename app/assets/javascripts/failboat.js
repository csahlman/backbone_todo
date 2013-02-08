window.Failboat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.appRouter = new Failboat.Routers.Tasks();
    this.session = new Failboat.Models.Session();
    if(this.session.authenticated()) {
      var user = new Failboat.Models.User({'remember_token': this.session.get('remember_token')});
      user.fetch();
      this.currentUser = user;
    } else {
      this.currentUser = new Failboat.Models.User();
    }
    Backbone.history.start();
  }
};


$(document).ready(function(){
  Failboat.initialize();
});
