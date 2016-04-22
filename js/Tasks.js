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

var Tasks = React.createClass({
	getInitialState: function() {

      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
          dataSource: ds.cloneWithRows([]),
      };
    },

    componentDidMount: function() {
        var that = this;
        console.log('that.props.userId: ' + that.props.userId);
        if (that.props.userId === undefined) return;
        var soql = 'SELECT Id, Subject FROM Task WHERE OwnerId = \'' + that.props.userId + '\' LIMIT 10';
        forceClient.query(soql,
          function(response) {
              var oppts = response.records;
              var data = [];
              for (var i in oppts) {
                  data.push(oppts[i]["Subject"]);
              }
              that.setState({
                  dataSource: that.getDataSource(data),
              });
          });
    },

    getDataSource: function(tasks: Array<any>): ListViewDataSource {
        return this.state.dataSource.cloneWithRows(tasks);
    },

    render: function() {
      console.log('Rendered Tasks');
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

module.exports = Tasks;
