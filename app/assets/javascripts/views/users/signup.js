Failboat.Views.Signup = Backbone.View.extend({
  template: JST['users/signup'],

  events: {
    'submit form': 'signUp'
  },

  initialize: function() {
    this.model = new Failboat.Models.UserRegistration();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },


  signUp: function(event) {

    event.preventDefault();

    var email = $('#email').val().trim();
    var password = $('#password').val();
    var password_confirmation = $('#password_confirmation').val();


    this.model.save({ 
        email: email, 
        password: password, 
        password_confirmation: password_confirmation
      }, {
      success: function(userSession, response) {
        // el.find('input.btn-primary').button('reset');
        Failboat.session.save({remember_token: response.remember_token, id: response.id })
        Failboat.currentUser = new Failboat.Models.User(response);
        Failboat.appRouter.boardsCollection.fetch();
        Failboat.appRouter.navigate('', true);
      },
      error: function(userSession, response) {
        console.log('error');
        console.log(userSession);
        console.log(response);
      }
    });
  }


});