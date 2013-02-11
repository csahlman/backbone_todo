Failboat.Views.Login = Backbone.View.extend({
  template: JST['users/login'],

  events: {
    'submit form': 'login'
  },

  initialize: function() {
    this.model = new Failboat.Models.UserSession();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  login: function(event) {
    event.preventDefault();

    var email = $('#email').val();
    var password = $('#password').val();

    this.model.save({ 
      email: email,
      password: password
    }, {
      success: function(userSession, response) {
        Failboat.session.save({remember_token: response.remember_token, id: response.id })
        Failboat.currentUser = new Failboat.Models.User(response);
        Failboat.appRouter.navigate('', true);
        if(Failboat.appRouter.collection) Failboat.appRouter.collection.trigger('reset');
      },
      error: function(userSession, response) {
        console.log('error');
        console.log(userSession);
        console.log(response);
      }
    });
    $('#sidebar_ul').append(JST['utilities/logged_in_sidebar']());
  }

});