// app/assets/javascripts/support/swapping_router.js
Failboat.SwappingRouter = function(options) {
  Backbone.Router.apply(this, [options]);
};

_.extend(Failboat.SwappingRouter.prototype, Backbone.Router.prototype, {
  swap: function(newView) {
    if (this.currentView && this.currentView.leave) {
      this.currentView.leave();
    }
    this.currentView = newView;
    $(this.el).empty().append(this.currentView.render().el);
  }
});
Failboat.SwappingRouter.extend = Backbone.Router.extend;