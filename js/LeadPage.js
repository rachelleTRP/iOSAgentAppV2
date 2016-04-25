'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio,
    NavigatorIOS,
    TouchableHighlight
} = React;

var forceClient = require('./react.force.net.js');
var Styles = require('./Styles.js');
var Lead = require('./Lead.js');
var Icon = require('react-native-vector-icons/FontAwesome');

var Leads = React.createClass({
    getInitialState: function() {

      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
          dataSource: ds.cloneWithRows([]),
      };
    },

    componentDidMount: function() {
        var that = this;
        var soql = 'SELECT Id, Name FROM Lead WHERE Owner.Id = \'' + that.props.userId + '\' LIMIT 10';
        forceClient.query(soql,
          function(response) {
              var leads = response.records;
              var data = [];
              for (var i in leads) {
                  data.push(leads[i]);
              }
              that.setState({
                  dataSource: that.getDataSource(data),
              });
          });
    },

    viewLead: function(leadName: String, leadId: String) {
    	var that = this;
     	this.props.navigator.push({
          title: leadName,
          component: Lead,
          passProps: {leadId: leadId}
     	});
    },

    getDataSource: function(leads: Array<any>): ListViewDataSource {
        return this.state.dataSource.cloneWithRows(leads);
    },

    render: function() {
        return (
          <View style={Styles.scene}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow} />
          </View>
      );
    },

    renderRow: function(rowData: Object) {
        return (
        	<TouchableHighlight onPress={() => this.viewLead(rowData['Name'], rowData['Id'])}>
              <View>
                  <View style={Styles.row}>
                    <Text style={Styles.rowText} numberOfLines={1}>
                    {rowData['Name'].substring(0,35)}
                    </Text>
                    <Text>
                      <Icon name="chevron-right" color="#48BBEC" />
                    </Text>
                  </View>
                  <View style={Styles.cellBorder} />
              </View>
          </TouchableHighlight>
        );
    }
});

module.exports = Leads; 