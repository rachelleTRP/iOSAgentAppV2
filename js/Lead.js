'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio,
    ListView,
    ScrollView,
    NavigatorIOS,
    TouchableOpacity
} = React;

var forceClient = require('./react.force.net.js');
var Styles = require('./Styles.js');
var Icon = require('react-native-vector-icons/MaterialIcons');
var NotePage = require('./NotePage.js');

var Lead = React.createClass({
	getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
          dataSource: ds.cloneWithRows([])
      	};
	},

	componentDidMount: function() {
        var that = this;
        var soql = 'SELECT Name,Email,Phone,Status,LeadSource FROM Lead WHERE Id = \'' + that.props.leadId + '\' LIMIT 1';
        forceClient.query(soql,
            function(response) {
                if (response.records.length > 0) {
                    var fields = response.records[0];
                    var data = [];
                    for (var i in fields) {
                        if (typeof fields[i] !== 'object') {
                          data.push(i+': '+fields[i]);
                        }
                    }

                    that.setState({
                        dataSource: that.getDataSource(data)
                    });
                }
          });
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
                <View>
                  <TouchableOpacity style={Styles.row}
                    onPress={() => {
                      this.props.navigator.push({ title: 'NotePage',
                        component: NotePage,
                        passProps: { relatedId: this.props.leadId }})
                    }}>
                    <Icon name='note' size={25} style={Styles.listViewIcon}/>
                    <Text style={Styles.textStyle}>Notes</Text>
                    <Icon name='mode-edit' size={25}/>
                  </TouchableOpacity>
                  <View style={Styles.cellBorder} />
                </View>
            </View>
        );
    },

    renderRow: function(rowData: Object) {
      if (rowData.substring(0,5) === 'Name:') {
            return (
              <View>
                  <View style={Styles.row}>
                    <Icon name='person' size={25} style={Styles.listViewIcon}/>
                    <Text numberOfLines={1} style={Styles.textStyle}>
                     {rowData.substring(6)}
                    </Text>
                  </View>
                  <View style={Styles.cellBorder} />
              </View>
            );
        } else if (rowData.substring(0,5) === 'Email') {
            return (
              <View>
                  <View style={Styles.row}>
                    <Icon name='email' size={25} style={Styles.listViewIcon}/>
                    <Text numberOfLines={1} style={Styles.textStyle}>
                     {rowData.substring(7)}
                    </Text>
                  </View>
                  <View style={Styles.cellBorder} />
              </View>
            );
        } else if (rowData.substring(0,5) === 'Phone') {
            return (
              <View>
                  <View style={Styles.row}>
                    <Icon name='phone' size={25} style={Styles.listViewIcon}/>
                    <Text numberOfLines={1} style={Styles.textStyle}>
                     {rowData.substring(7)}
                    </Text>
                  </View>
                  <View style={Styles.cellBorder} />
              </View>
            );
        } else if (rowData.substring(0,6) === 'Status') {
            return (
              <View>
                  <View style={Styles.row}>
                    <Icon name='assignment-late' size={25} style={Styles.listViewIcon}/>
                    <Text numberOfLines={1} style={Styles.textStyle}>
                     {rowData.substring(8)}
                    </Text>
                  </View>
                  <View style={Styles.cellBorder} />
              </View>
            );
        } else if (rowData.substring(0,10) === 'LeadSource') {
            return (
              <View>
                  <View style={Styles.row}>
                    <Icon name='web' size={25} style={Styles.listViewIcon}/>
                    <Text numberOfLines={1} style={Styles.textStyle}>
                     {rowData.substring(12)}
                    </Text>
                  </View>
                  <View style={Styles.cellBorder} />
              </View>
            );
        } else {
            return (
              <View>
                  <View style={Styles.row}>
                    <Text numberOfLines={1} style={Styles.textStyle}>
                        {rowData}
                    </Text>
                  </View>
                  <View style={Styles.cellBorder} />
              </View>
            );
        }
    }
});


module.exports = Lead; 