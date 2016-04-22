'use strict';

var React = require('react-native');
var {
    AppRegistry,
    Stylesheet,
    Text,
    View,
    ListView,
    NavigatorIOS,
    TouchableHighlight,
    TabBarIOS
} = React;

var Styles = require('./Styles.js');
var Opportunities = require('./Opportunities.js');
var Tasks = require('./Tasks.js');
var Leads = require('./Leads.js');


var Home = React.createClass({
  viewLeads: function() {
    // TODO: route the metrics page once that's built
    var that = this;
     this.props.navigator.push({
          title: 'Leads',
          component: Leads,
          passProps: {userId: that.props.userId}
     });
  },

  viewOpportunities: function() {
     var that = this;
     this.props.navigator.push({
          title: 'Opportunities',
          component: Opportunities,
          passProps: {userId: that.props.userId}
     });
  },

  viewTasks: function() {
     var that = this;
     this.props.navigator.push({
          title: 'Tasks',
          component: Tasks,
          passProps: {userId: that.props.userId}
     });
  },

  viewMetrics: function() {
    // TODO: route the metrics page once that's built
  },
  render: function() {
    return (
      <View style={Styles.buttonContainer}>
        <TouchableHighlight style={Styles.button} onPress={this.viewLeads}>
          <Text style={Styles.buttonText}>Leads</Text>
        </TouchableHighlight>
        <TouchableHighlight style={Styles.button} onPress={this.viewOpportunities}>
          <Text style={Styles.buttonText}>Opportunities</Text>
        </TouchableHighlight>
        <TouchableHighlight style={Styles.button} onPress={this.viewTasks}>
          <Text style={Styles.buttonText}>Tasks</Text>
        </TouchableHighlight>
        <TouchableHighlight style={Styles.button} onPress={this.viewMetrics}>
          <Text style={Styles.buttonText}>Metrics</Text>
        </TouchableHighlight>
      </View>
      );
  }
});


module.exports = Home;
