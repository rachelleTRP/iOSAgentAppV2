'use strict';

var React = require('react-native');
var {
  Stylesheet,
  Component,
  View,
  Text,
  ListView,
  ScrollView,
  Navigator,
  TouchableHighlight
} = React;

var Styles = require('./Styles.js');
var forceClient = require('./react.force.net.js');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Note = require('./Note.js');

var NotePage = React.createClass({

    componentWillMount: function() {
      var that = this;
      var soql = 'SELECT Id,Title,Body FROM Note WHERE ParentId = \''
        +that.props.relatedId+'\'';
      forceClient.query(soql,
        function(response) {
            console.log(response.records);
            that.setState({
                dataSource: that.getDataSource(response.records),
            });

        });

      var callback = (event) => {
        var soql = 'SELECT Id,Title,Body FROM Note WHERE ParentId = \''
          +that.props.relatedId+'\'';
        forceClient.query(soql,
          function(response) {
              console.log(response.records);
              that.setState({
                  dataSource: that.getDataSource(response.records),
              });

          });
      };

      // Observe focus change events from this component.
      this._listeners = [
        navigator.navigationContext.addListener('willfocus', callback),
        navigator.navigationContext.addListener('didfocus', callback),
      ];
    },

    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
          dataSource: ds.cloneWithRows([])
      };
    },

    getDataSource: function(users: Array<any>): ListViewDataSource {
        return this.state.dataSource.cloneWithRows(users);
    },

    render: function() {
        return (
          <View style={Styles.container}>
            <ScrollView>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow} />
            </ScrollView>
          </View>
      );
    },

    renderRow: function(rowData: Object) {
      return (
        <View>
            <TouchableHighlight
              style={Styles.row}
              onPress={() => {
                this.props.navigator.push({
                  title: 'Note',
                  component: Note,
                  passProps: {noteId: rowData['Id'], relatedId: this.props.relatedId}
                })
              }}>
              <View style={Styles.flowRight}>
                <Text numberOfLines={1} style={Styles.textStyle} >
                 {rowData['Title']}
                </Text>
                <Icon name='keyboard-arrow-right' size={25} />
              </View>
            </TouchableHighlight>
            <View style={Styles.cellBorder} />
        </View>
      );
    }
});

module.exports = NotePage;