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
        // el.find('input.btn-primary').button('reset');
        console.log(response.remember_token);
        console.log(response.id);
        Failboat.session.save({remember_token: response.remember_token, id: response.id })
        Failboat.currentUser = new Failboat.Models.User(response);
        Failboat.appRouter.navigate('', true);
        Failboat.appRouter.collection.trigger('reset');
      },
      error: function(userSession, response) {
        // var result = $.parseJSON(response.responseText);
        // el.find('form').prepend(BD.Helpers.Notifications.error("Unable to complete signup."));
        // _(result.errors).each(function(errors,field) {
        //   $('#'+field+'_group').addClass('error');
        //   _(errors).each(function(error, i) {
        //     $('#'+field+'_group .controls').append(BD.Helpers.FormHelpers.fieldHelp(error));
        //   });
        // });
        // el.find('input.btn-primary').button('reset');
        console.log('error');
        console.log(userSession);
        console.log(response);
      }
    });
  }

});