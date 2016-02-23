var round = require('round')

module.exports = require('angular')
  .module('angular-stars', [])
  .component('stars', {
    template:
      '<div class="star-container">' +
        '<span ng-repeat="s in star.stars">' +
          '<div class="star-mask"></div>' +
        '</span>' +
      '</div>',
    bindings: {
      amount: '<',
      max: '<'
    },
    controllerAs: 'star',
    controller: Star
  })
  .name

function Star () {
  var state = {
    amount: round((this.amount || 0), 1),
    max: (this.max || 5),
    stars: []
  }

  for (var i = 0; i < state.max; i++) {
    if (state.amount > i) {
      state.stars.push(i)
    }
  }

  return state
}
