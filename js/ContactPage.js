'use strict';

var React = require('react-native');
var {
  Stylesheet,
  Component,
  View,
  Text,
  ListView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Navigator
} = React;

var Styles = require('./Styles.js');
var oauth = require('./react.force.oauth');
var forceClient = require('./react.force.net.js');
var GiftedSpinner = require('react-native-gifted-spinner');
var Icon = require('react-native-vector-icons/MaterialIcons');

var Contact = require('./Contact.js');

var ContactPageClass = React.createClass({

    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
          dataSource: ds.cloneWithRows([]),
          loaded: false
      };
    },

    componentWillMount: function() {
      var that = this;
      var soql = 'SELECT Id, Name FROM Contact WHERE Owner.Id = \''
        +that.props.userId+'\'';
      forceClient.query(soql,
        function(response) {
            that.setState({
                dataSource: that.getDataSource(response.records),
                loaded: true
            });

        });
    },

    getDataSource: function(users: Array<any>): ListViewDataSource {
        return this.state.dataSource.cloneWithRows(users);
    },

    render: function() {
        if (!this.state.loaded) {
          return(
            <View style={{flex:1,
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'center'}}>
              <GiftedSpinner/>
            </View>
          );
        }
        return (
          <ScrollView>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow} />
          </ScrollView>
      );
    },

    renderRow: function(rowData: Object) {
      return (
        <View>
            <TouchableOpacity
              style={Styles.row}
              onPress={() => {
                this.props.navigator.push({
                  name: 'Contact Details',
                  id: 'Contact',
                  passProps: {contactId: rowData['Id']}
                })
              }}>
              <View style={Styles.flowRight}>
                <Text numberOfLines={1} style={Styles.textStyle} >
                 {rowData['Name']}
                </Text>
                <Icon name='keyboard-arrow-right' size={25} color='#cc0000' />
              </View>
            </TouchableOpacity>
            <View style={Styles.cellBorder} />
        </View>
      );
    }
});

class ContactPage extends Component {
  render() {
    return (
      <Navigator
          renderScene={(route, navigator) => this.renderScene(route, navigator)}
          navigator={this.props.navigator} />
    );
  }
  renderScene(route, navigator) {
    return (
        <ContactPageClass navigator={this.props.navigator} userId={this.props.userId} />
    );
  }
}

module.exports = ContactPage;
