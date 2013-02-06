
// _.extend(Backbone.Router.prototype, Backbone.Events, {
//     before: function(){},
//     after : function(){},
//     route : function(route, name, callback) {
//       Backbone.history || (Backbone.history = new Backbone.History);
//       var _r = route;
//       if (!_.isRegExp(route)) route = this._routeToRegExp(route);
//       Backbone.history.route(route, _.bind(function(fragment) {
//         var args = this._extractParameters(route, fragment);
//         if( _(this.before).isFunction() ){
//           if(this.before.apply(this, [_r].concat(args))){
//             callback.apply(this, args);
//           }
//         }else{
//             callback.apply(this, args);
//         }
//         if( _(this.after).isFunction() ){
//           this.after.apply(this, args);
//         } 
//         this.trigger.apply(this, ['route:' + name].concat(args));
//       }, this));
//     }
// });

Failboat.Routers.Tasks = Backbone.Router.extend({

  routes: {
    "": "index",
    "tasks/:id": "show",
    "sign_in": "signIn",
    'log_in': 'logIn'
  },

  initialize: function() {
    this.collection = new Failboat.Collections.Tasks();
    this.collection.fetch();
  },

  signIn: function() {
    console.log('in the signIn function');
    view = new Failboat.Views.Signup({});
    $('#container').html(view.render().el);
  },

  logIn: function() {
    console.log('in the login function');
    view = new Failboat.Views.Login({});
    $('#container').html(view.render().el);
  },

  index: function() {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }
    view = new Failboat.Views.TasksIndex({model: Failboat.currentUser, collection: this.collection});
    $('#container').html(view.render().el);
  },

  show: function(id) {
    if(!Failboat.session.authenticated()) {
      this.navigate('sign_in', true);
      return false;
    }     
    if($('#main').length === 0) {
      view = new Failboat.Views.TasksIndex({model: Failboat.currentUser, collection: this.collection});
      $('#container').html(view.render().el);
    }
    if(show_model = this.collection.get(id)) {
      view = new Failboat.Views.TaskShow({model: show_model});
      $('#sidebar').detach();
      $('#container').append(view.render().el);
    } 
    else {
      this.collection.on('reset', function(collection, response) {
        show_model = collection.get(id);
        view = new Failboat.Views.TaskShow({model: show_model});
        $('#container').append(view.render().el);
      });
    }
  },

  renderCollection: function() {
    this.collection.trigger('change');
  }

});
