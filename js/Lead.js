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

var Lead = React.createClass({
	getInitialState: function() {
		return {
          lead: { 'Email' :'Email'},
      	};
	},

	componentDidMount: function() {
        var that = this;
        var soql = 'SELECT email FROM Lead WHERE Id = \'' + that.props.leadId + '\' LIMIT 1';
        forceClient.query(soql,
          function(response) {
              	var l = response.records[0];

              	that.setState({
                  	lead: l
              	});
          });
    },

	render: function() {
		console.log(this.state.lead['Email']);
        return (
            <View style={styles.container}>
            	<Text style={styles.description}>
                {this.state.lead['Email']}
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
	description: {
    	marginBottom: 20,
    	fontSize: 18,
    	textAlign: 'center',
    	color: '#656565'
  	},
    container: {
    	padding: 30,
    	marginTop: 65,
    	alignItems: 'center'
    },
    header: {
        height: 50,
        alignItems:'center'
    },
    row: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 12,
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // Trick to get the thinest line the device can display
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    },
});


module.exports = Lead; 