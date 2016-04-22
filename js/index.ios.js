/*
 * Copyright (c) 2015, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

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
    TouchableOpacity
} = React;

var forceOAuth = require('./react.force.oauth.js');
var Icon = require('react-native-vector-icons/MaterialIcons');
var DrawerLayout = require('react-native-drawer-layout');


var Styles = require('./Styles.js');

var Home = require('./Home.js');
var Opportunities = require('./Opportunities.js');
var Tasks = require('./Tasks.js');
var Leads = require('./Leads.js');
var Metrics = require('./Metrics.js');

var App = React.createClass({

    getInitialState: function() {
      return {
        selectedTab: 'home',
        isLoading: true
      }
    },

    componentWillMount: function() {
      var that = this;
      forceOAuth.getAuthCredentials(
        function (resp){
            that.setState(
              {userId: resp['userId'],
               isLoading: false});
          },
          function (resp) {}
        );
    },

  render: function() {
    console.log('render: userId: ' + this.state.userId);
    var that = this;
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
      hidden='true'
      size='large'/> ) :
      (<NavigatorIOS
        style={Styles.container}
        tintColor='#48BBEC'
        barTintColor='#FFFFFD'
        titleTextColor='red'
        ref='home'
        initialRoute={{
          title: 'Home',
          component: Home,
          passProps: {userId: that.state.userId}
        }} />);
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View>
          <View style={Styles.menuTitle}>
              <TouchableOpacity style={{flex: 1, justifyContent: 'center', paddingLeft: 4, paddingTop: 8}}
                onPress={() => {
                  closeDrawer()
                }}>
              </TouchableOpacity>

          </View>
          <Icon.Button name="account-box" style={Styles.menuButton} color='#545454'
              onPress={this.viewLeads}>
              <Text style={Styles.menuText}>Leads</Text>
          </Icon.Button>
          <Icon.Button name="adjust" style={Styles.menuButton} color='#545454'
              onPress={this.viewOpportunities}>
              <Text style={Styles.menuText}>Opportunities</Text>
          </Icon.Button>
          <Icon.Button name="assignment" style={Styles.menuButton} color='#545454'
              onPress={this.viewTasks}>
              <Text style={Styles.menuText}>Tasks</Text>
          </Icon.Button>
          <View style={Styles.cellBorder} />
          <Icon.Button name="exit-to-app" style={Styles.menuButton} color='#545454'
              onPress={this.logout}>
              <Text style={Styles.menuText}>Logout</Text>
          </Icon.Button>
        </View>
      </View>
    );

    return (
      <DrawerLayout
        ref={(drawer) => { global.drawer = drawer}}
        drawerWidth={300}
        drawerPosition={DrawerLayout.positions.Left}
        renderNavigationView={() => navigationView}>
        <NavigatorIOS
          style={Styles.container}
          tintColor='#48BBEC'
          barTintColor='#FFFFFD'
          titleTextColor='#48BBEC'
          ref={(navigator) => global.navigator = navigator}
          initialRoute={{
            title: 'Home',
            component: Home,
            passProps: {userId: that.state.userId}
          }} />
      </DrawerLayout>
    );

    /*return(
      <TabBarIOS>
        <Icon.TabBarItem
          title='Metrics' selected={this.state.selectedTab === 'metrics'}
          iconName={'bar-chart-o'} iconSize={24}
          onPress={() => {
            if (this.state.selectedTab !== 'metrics') {
              this.setState({
                selectedTab: 'metrics'
              });
            } else if (this.state.selectedTab === 'metrics') {
              this.refs.metrics.popToTop();
            }
          }}>
          {this.renderMetricsView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='Tasks' selected={this.state.selectedTab === 'tasks'}
          iconName={'check-square-o'} iconSize={24}
          onPress={() => {
            if (this.state.selectedTab !== 'tasks') {
              this.setState({
                selectedTab: 'tasks'
              });
            } else if (this.state.selectedTab === 'tasks') {
              this.refs.tasks.popToTop();
            }
          }}>
          {this.renderTasksView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='Home' selected={this.state.selectedTab === 'home'}
          iconName={'home'} iconSize={24}
          onPress={() => {
            if (this.state.selectedTab !== 'home') {
              this.setState({
                selectedTab: 'home'
              });
            } else if (this.state.selectedTab === 'home') {
              this.refs.home.popToTop();
            }
          }}>
          {spinner}
        </Icon.TabBarItem>
       <Icon.TabBarItem
          title='Opportunities' selected={this.state.selectedTab === 'oppts'}
          iconName={'folder-open-o'} iconSize={24}
          onPress={() => {
            if (this.state.selectedTab !== 'oppts') {
              this.setState({
                selectedTab: 'oppts'
              });
            } else if (this.state.selectedTab === 'oppts') {
              this.refs.oppts.popToTop();
            }
          }}>
          {this.renderOpptsView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title='Leads' selected={this.state.selectedTab === 'leads'}
          iconName={'group'} iconSize={24}
          onPress={() => {
            if (this.state.selectedTab !== 'leads') {
              this.setState({
                selectedTab: 'leads'
              });
            } else if (this.state.selectedTab === 'leads') {
              this.refs.leads.popToTop();
            }
          }}>
          {this.renderLeadsView()}
        </Icon.TabBarItem>
      </TabBarIOS>);*/
  },

  viewLeads: function() {
    // TODO: route the metrics page once that's built
    var that = this;

     global.navigator.push({
          title: 'Leads',
          component: Leads,
          passProps: {userId: that.state.userId}
     });
  },

  viewOpportunities: function() {
     var that = this;
     global.navigator.push({
          title: 'Opportunities',
          component: Opportunities,
          passProps: {userId: that.state.userId}
     });
  },

  viewTasks: function() {

     var that = this;
     console.log('viewTasks: userId: ' + that.state.userId);
     global.navigator.push({
          title: 'Tasks',
          component: Tasks,
          passProps: {userId: that.state.userId}
     });
  },

  viewMetrics: function() {
    // TODO: route the metrics page once that's built
  },

});

var openDrawer = function() {
    global.drawer.openDrawer();
}
var closeDrawer = function() {
    global.drawer.closeDrawer();
}

React.AppRegistry.registerComponent('iOSAgentApp', () => App);
