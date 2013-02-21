window.Failboat = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(data) {
    // this.visualSearch = VS.init({
    //   container: $('.visual_search'),
    //   query: '',
    //   callbacks : {
    //     search       : function(query, searchCollection) {},
    //     facetMatches : function(callback) {},
    //     valueMatches : function(facet, searchTerm, callback) {}
    //   }
    // });
    this.session = new Failboat.Models.Session();
    this.boards = new Failboat.Collections.Boards(data.boards);
    this.users = new Failboat.Collections.Users(data.users);
    if(this.session.authenticated()) {
      var user = new Failboat.Models.User({'remember_token': this.session.get('remember_token')});
      user.fetch();
      this.currentUser = user;
    } else {
      this.currentUser = new Failboat.Models.User();
    }
    this.appRouter = new Failboat.Routers.Tasks({
      boards: this.boards,
      users: this.users
    });
    if(!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
    
  }
};


// $(document).ready(function(){
//   Failboat.initialize();
// });
