'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio,
    NavigatorIOS
} = React;

var forceClient = require('./react.force.net.js');
var Styles = require('./Styles.js');
var Icon = require('react-native-vector-icons/FontAwesome');

var Opportunities = React.createClass({
    getInitialState: function() {

      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
          dataSource: ds.cloneWithRows([]),
      };
    },

    componentDidMount: function() {
        var that = this;
        var soql = 'SELECT Id, Name FROM Opportunity WHERE Owner.Id = \'' + that.props.userId + '\' LIMIT 10';
        forceClient.query(soql,
          function(response) {
              var oppts = response.records;
              var data = [];
              for (var i in oppts) {
                  data.push(oppts[i]["Name"]);
              }
              that.setState({
                  dataSource: that.getDataSource(data),
              });
          });
    },

    getDataSource: function(oppts: Array<any>): ListViewDataSource {
        return this.state.dataSource.cloneWithRows(oppts);
    },

    render: function() {
        return (
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow} />
      );
    },

    renderRow: function(rowData: Object) {
        return (
                <View>
                    <View style={Styles.row}>
                      <Text style={Styles.rowText} numberOfLines={1}>
                       {rowData.substring(0,35)}
                      </Text>
                      <Text>
                        <Icon name="chevron-right" color="#48BBEC" />
                      </Text>
                    </View>
                    <View style={Styles.cellBorder} />
                </View>
        );
    }
});

module.exports = Opportunities; 