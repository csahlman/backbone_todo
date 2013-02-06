Failboat.Models.UserRegistration = Backbone.Model.extend({
  url: '/users.json',

  toJSON: function() {
  // overwrite toJSON to correctly format params[:user] instead of params[:registration]
    return { user: _.clone(this.attributes) };
  },

  defaults: {
    "email": "",
    "password": "",
    "password_confirmation": ""
  }
});