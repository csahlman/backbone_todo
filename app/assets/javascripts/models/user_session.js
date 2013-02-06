Failboat.Models.UserSession = Backbone.Model.extend({
  url: '/sign_in',

  toJSON: function() {
  // overwrite toJSON to correctly format params[:user] instead of params[:registration]
    return { user: _.clone(this.attributes) };
  },
  
  defaults: {
    "email": "",
    "password": ""
  }

});