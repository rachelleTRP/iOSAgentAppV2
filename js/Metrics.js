'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    TabBarIOS,
    ActivityIndicatorIOS,
    ScrollView
} = React;

import Chart from 'react-native-chart';

var forceClient = require('./react.force.net.js');
var Styles = require('./Styles.js');
var store = require('react-native-simple-store');

const chartData = [
    {
        name: 'BarChart',
        type: 'bar',
        color:'purple',
        widthPercent: 0.6,
        data: [40, 1, 1, 2, 3, 5, 21, 13, 21, 34, 55, 30],
    },
    {
        name: 'BarChart',
        type: 'bar',
        color: 'blue',
        widthPercent: 0.6,
        data: [30, 1, 1, 2, 3, 5, 21, 13, 21, 34, 55, 30],
    },
    {
        name: 'LineChart',
        color: 'gray',
        lineWidth: 2,
        highlightIndices: [1, 2],   // The data points at indexes 1 and 2 will be orange
        highlightColor: 'orange',
        showDataPoint: true,
        data: [10, 12, 14, 25, 31, 52, 41, 31, 52, 66, 22, 11],
    },
    {
        name: 'LineChart',
        color: 'gray',
        lineWidth: 2,
        highlightIndices: [1, 2],   // The data points at indexes 1 and 2 will be orange
        highlightColor: 'orange',
        showDataPoint: true,
        data: [30, 1, 1, 2, 3, 5, 21, 13, 21, 34, 55, 30],
    }
];

const xLabels = ['0','1','2','3','4','5','6','7','8','9','10','11'];

var Metrics = React.createClass({

    getInitialState: function() {
        // getMonth(), getFullYear()
        var today = new Date(); 
        var startDate = today.setMonth(today.getMonth() - 5);
      return {
        startDate: startDate,
        endDate: today
      }
    },

    renderTransactionRevenue: function() {
        var that = this;
        var soql = 'SELECT Elapsed_Transaction_Signed_Time__c, Net_Revenue__c, StageName FROM Opportunity' + 
                    ' WHERE Owner.Id = \'' + that.props.userId + '\' '+ 
                    ' AND CreatedDateTime__c >= ' + that.state.startDate.toISOString() + //TODO: remember to set the date part to the first of month, and time 00:00:00Z
                    ' AND trp_opp_Transaction_Property_Type__c != \'Rental Provider\' ' + 
                    ' AND trp_opp_Transaction_Property_Type__c != \'Rental Seeker\' ' + 
                    ' AND trp_opp_Transaction_Property_Type__c != \'Mortgage\' ' + 
                    ' AND Type != \'Mortgage\' AND Type != \'Rental Provider\' AND Type != \'Rental Seeker\' ' + 
                    ' AND LeadSource != \'Referral - Agent\' ';
        forceClient.query(soql,
          function(response) {
             /* var oppts = response.records;
              var data = [];
              for (var i in oppts) {
                  data.push(oppts[i]["Name"]);
              }
              that.setState({
                  dataSource: that.getDataSource(data),
              });*/
        });
    },

    renderChart: function(title, chartData) {
        return(<Chart chartTitle={title}
                      style={Styles.chart}
                      chartData={chartData}
                      verticalGridStep={5}
                      xLabels={xLabels}
                     />);
    },

    render: function() {

        return (
            <View style={Styles.chartContainer}>
                <ScrollView style={Styles.scrollView}>
                    <Chart chartTitle="Opportunity Volume"
                        style={Styles.chart}
                        chartData={chartData}
                        verticalGridStep={5}
                        xLabels={xLabels}
                     />
                     <Chart chartTitle="Transaction Revenue"
                        style={Styles.chart}
                        chartData={chartData}
                        verticalGridStep={5}
                        xLabels={xLabels}
                     />
                     <Chart chartTitle="Conversion Rate (Actual)"
                        style={Styles.chart}
                        chartData={chartData}
                        verticalGridStep={5}
                        xLabels={xLabels}
                     />
                     <Chart chartTitle="Conversion Rate (4 Weeks Moving Avg)"
                        style={Styles.chart}
                        chartData={chartData}
                        verticalGridStep={5}
                        xLabels={xLabels}
                     />
                </ScrollView>
            </View>
        );
    }
});


module.exports = Metrics; 