// app/assets/javascripts/support/swapping_router.js
Failboat.SwappingRouter = function(options) {
  Backbone.Router.apply(this, [options]);
};

_.extend(Failboat.SwappingRouter.prototype, Backbone.Router.prototype, {
  swap: function(newView) {
    if (this.currentView && this.currentView.close) {
      this.currentView.close();
    }
    this.currentView = newView;
    $(this.el).empty().append(this.currentView.render().el);
  },

  closeViews: function() {
    _.each(this.currentViews, function(view) {
        if(view.close) view.close();
    });
  }
});

Failboat.SwappingRouter.extend = Backbone.Router.extend;