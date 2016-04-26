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
  TouchableHighlight,
  TouchableOpacity
} = React;

var Styles = require('./Styles.js');
var oauth = require('./react.force.oauth');
var forceClient = require('./react.force.net.js');
var GiftedSpinner = require('react-native-gifted-spinner');
var Icon = require('react-native-vector-icons/MaterialIcons');

var Opportunity = require('./Opportunity.js');

var OpportunityPageClass = React.createClass({
    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
          dataSource: ds.cloneWithRows([]),
          loaded: false
      };
    },

    componentWillMount: function() {
      var that = this;
      var soql = 'SELECT Id, Name FROM Opportunity WHERE Owner.Id = \''
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
        var that = this;
        return (
            <View>
                <TouchableOpacity
                  style={Styles.row}
                  onPress={() => {
                    that.props.navigator.push({
                      id: 'Opportunity',
                      name: 'Opportunity Details',
                      passProps: {oppId: rowData['Id']}
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

class OpportunityPage extends Component {
  render() {
    return (
      <Navigator
          renderScene={(route, navigator) => this.renderScene(route, navigator)}
          navigator={this.props.navigator} />
    );
  }
  renderScene(route, navigator) {
    return (
        <OpportunityPageClass navigator={this.props.navigator} userId={this.props.userId} />
    );
  }
}

module.exports = OpportunityPage;
