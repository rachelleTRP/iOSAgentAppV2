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

var NotePageClass = React.createClass({

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

      callback();

      // Observe focus change events from this component.
      this._listeners = [
        navigator.navigationContext.addListener('willfocus', callback)
      ];
    },

    componentWillUnmount: function() {
      this._listeners && this._listeners.forEach(listener => listener.remove());
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
      console.log('note log noteId: ' + rowData['Id']);
      return (
        <View>
            <TouchableHighlight
              style={Styles.row}
              onPress={() => {
                this.props.navigator.push({
                  name: 'Note',
                  id: 'Note',
                  passProps: {noteId: rowData['Id'], relatedId: this.props.relatedId},

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

class NotePage extends Component {
  render() {
    return (
      <Navigator
          renderScene={(route, navigator) => this.renderScene(route, navigator)}
          navigator={this.props.navigator} />
    );
  }
  renderScene(route, navigator) {
    return (
        <NotePageClass navigator={this.props.navigator} relatedId={this.props.relatedId} />
    );
  }
}

module.exports = NotePage;
