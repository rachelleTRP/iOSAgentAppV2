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
    Navigator,
    TabBarIOS,
    ActivityIndicatorIOS,
    TouchableOpacity,
    Image,
    DrawerLayout
} = React;

var forceOAuth = require('./react.force.oauth.js');
var Icon = require('react-native-vector-icons/MaterialIcons');
var DrawerLayout = require('react-native-drawer-layout');
var forceClient = require('./react.force.net.js');

var profileUrl = '';

var Styles = require('./Styles.js');
var MainPage = require('./MainPage');
var TaskPage = require('./TaskPage');
var Task = require('./Task');
var ContactPage = require('./ContactPage');
var Contact = require('./Contact');
var LeadPage = require('./LeadPage');
var Lead = require('./Lead');
var OppPage = require('./OpportunityPage');
var Opportunity = require('./Opportunity');
var NotePage = require('./NotePage');
var Note = require('./Note');
var CreateNote = require('./CreateNote');
var MetricsPage = require('./MetricsPage');
var ProfilePage = require('./ProfilePage.js');

var App = React.createClass({

    getInitialState: function() {
      return {
        selectedTab: 'tasks',
        isLoading: true
      }
    },

    componentWillMount: function() {
      var that = this;
      forceOAuth.getAuthCredentials(
        function (resp){
          that.setState({userId: resp['userId']});
              var soql = 'SELECT Name,SmallPhotoUrl,FullPhotoUrl FROM User WHERE Id = \''
                +that.state.userId+'\' limit 1';
              forceClient.query(soql,
                function(response) {
                    var user = response.records[0];
                    profileUrl = user['SmallPhotoUrl'];
                    that.setState({
                      userName: user['Name'],
                      profileUrl: user['SmallPhotoUrl'],
                      fullProfileUrl: user['FullPhotoUrl'],
                      userId: resp['userId'],
                      isLoading: false
                    });
                }
              );
          },
          function (resp) {}
        );
    },

    renderScene: function(route, navigator) {
      var that = this;
      var routeId = route.id;
      if (routeId === 'MainPage') {
        return (
          <MainPage navigator={navigator} userName={that.state.userName} />
        );
      }
      if (routeId === 'TaskPage') {
        return (
          <TaskPage navigator={navigator} userId={that.state.userId} type={route.passProps.type} status={route.passProps.status} />
        );
      }
      if (routeId === 'Task') {
        return (
          <Task navigator={navigator} taskId={route.passProps.taskId} />
        );
      }
      if (routeId === 'ContactPage') {
        return (
          <ContactPage navigator={navigator} userId={that.state.userId} />
        );
      }
      if (routeId === 'Contact') {
        return (
          <Contact navigator={navigator} contactId={route.passProps.contactId} />
        );
      }
      if (routeId === 'LeadPage') {
        return (
          <LeadPage navigator={navigator} userId={that.state.userId} />
        );
      }
      if (routeId === 'Lead') {
        return (
          <Lead navigator={navigator} leadId={route.passProps.leadId} />
        );
      }
      if (routeId === 'OppPage') {
        return (
          <OppPage navigator={navigator} userId={that.state.userId} />
        );
      }
      if (routeId === 'Opportunity') {
        return (
          <Opportunity navigator={navigator} oppId={route.passProps.oppId} />
        );
      }
      if (routeId === 'NotePage') {
        return (
          <NotePage navigator={navigator} relatedId={route.passProps.relatedId} />
        );
      }
      if (routeId === 'Note') {
        return (
          <Note navigator={navigator} noteId={route.passProps.noteId} relatedId={route.passProps.relatedId} />
        );
      }
      if (routeId === 'CreateNote') {
        return (
          <CreateNote navigator={navigator} relatedId={route.passProps.relatedId} />
        );
      }
      if (routeId === 'ProfilePage') {
        return (
          <ProfilePage navigator={navigator} userId={that.state.userId} userName={that.state.userName} profileUrl={that.state.fullProfileUrl} />
        );
      }
      if (routeId === 'MetricsPage') {
        //var curDat = [{date:'2016-04-13','pts':1, 'ast':2, 'reb':3, 'stl':4, 'blk':5, 'tov':6, 'min':7},
        //  {date:'2016-04-12','pts':9, 'ast':2, 'reb':6, 'stl':4, 'blk':5, 'tov':6, 'min':5}];
        return (
          <MetricsPage navigator={navigator} userId={that.state.userId} userName={that.state.userName} profileUrl={that.state.fullProfileUrl} />
        );
      }
    },

  render: function() {
    console.log('render: userId: ' + this.state.userId);
    var that = this;
    /*var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
      hidden='true'
      size='large'/> ) :
      (<NavigatorIOS
        style={Styles.container}
        tintColor='#48BBEC'
        barTintColor='#FFFFFD'
        titleTextColor='#48BBEC'
        ref={(navigator) => global.navigator = navigator}
        initialRoute={{
          title: 'Main',
          component: MainPage,
          passProps: {userId: that.state.userId, userName: that.state.userName},
          onLeftButtonPress: () => openDrawer(),
          leftButtonTitle: 'Open Menu',
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
              onPress={this.viewContacts}>
              <Text style={Styles.menuText}>Contacts</Text>
          </Icon.Button>
          <Icon.Button name="assignment" style={Styles.menuButton} color='#545454'
              onPress={this.viewMetrics}>
              <Text style={Styles.menuText}>Metrics</Text>
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
        {spinner}
      </DrawerLayout>
    );*/
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
              onPress={this.gotoContactPage}>
              <Text style={Styles.menuText}>Contacts</Text>
          </Icon.Button>
          <Icon.Button name="adjust" style={Styles.menuButton} color='#545454'
              onPress={this.gotoLeadPage}>
              <Text style={Styles.menuText}>Leads</Text>
          </Icon.Button>
          <Icon.Button name="assignment" style={Styles.menuButton} color='#545454'
              onPress={this.gotoOppPage}>
              <Text style={Styles.menuText}>Opportunities</Text>
          </Icon.Button>
          <Icon.Button name="assignment" style={Styles.menuButton} color='#545454'
              onPress={this.gotoMetricsPage}>
              <Text style={Styles.menuText}>Metrics</Text>
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
        <Navigator
            ref={(navigator) => global.navigator = navigator}
            style={Styles.container}
            initialRoute={{
              id: 'MainPage',
              name: 'Home'
            }}
            renderScene={(route, navigator) => this.renderScene(route, navigator)}
            configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              return Navigator.SceneConfigs.FloatFromRight;
            }}
            navigationBar={
                <Navigator.NavigationBar
                  routeMapper={NavigationBarRouteMapper}
                  style={Styles.navBar} />
            }
            sceneStyle={Styles.scene}
          />
      </DrawerLayout>
    );
  },

  /*viewLeads: function() {
    // TODO: route the metrics page once that's built
    var that = this;

     global.navigator.push({
          title: 'Leads',
          component: Leads,
          passProps: {userId: that.state.userId},
          onLeftButtonPress: () => openDrawer(),
          leftButtonTitle: 'Open Menu',
     });
     closeDrawer();
  },

  viewOpportunities: function() {
     var that = this;
     global.navigator.push({
          title: 'Opportunities',
          component: Opportunities,
          passProps: {userId: that.state.userId},
          onLeftButtonPress: () => openDrawer(),
          leftButtonTitle: 'Open Menu',
     });
     closeDrawer();
  },

  viewTasks: function() {

     var that = this;
     console.log('viewTasks: userId: ' + that.state.userId);
     global.navigator.push({
          title: 'Tasks',
          component: Tasks,
          passProps: {userId: that.state.userId, type: route.passProps.type, status: route.passProps.status},
          onLeftButtonPress: () => openDrawer(),
          leftButtonTitle: 'Open Menu',
     });
     closeDrawer();
  },

  viewContacts: function() {

     var that = this;
     global.navigator.push({
          title: 'Contacts',
          component: Contacts,
          passProps: {userId: that.state.userId},
          onLeftButtonPress: () => openDrawer(),
          leftButtonTitle: 'Open Menu',
     });
     closeDrawer();
  },

  viewMetrics: function() {
    var that = this;
    global.navigator.push({
         title: 'Metrics',
         component: Metrics,
         passProps: {userId: that.state.userId},
         onLeftButtonPress: () => openDrawer(),
         leftButtonTitle: 'Open Menu',
    });
    closeDrawer();
  },

  logout:function() {
    forceOAuth.logout();
    closeDrawer();
  },*/
  gotoContactPage: function() {
      global.navigator.push({
        id: 'ContactPage',
        name: 'Contacts',
      });
      closeDrawer();
    },

    gotoLeadPage:function() {
      global.navigator.push({
        id: 'LeadPage',
        name: 'Leads',
      });
      closeDrawer();
    },

    gotoOppPage:function() {
      global.navigator.push({
        id: 'OppPage',
        name: 'Opportunities',
      });
      closeDrawer();
    },

    gotoMetricsPage:function() {
      global.navigator.push({
        id: 'MetricsPage',
        name: 'Metrics',
      });
      closeDrawer();
    },

    gotoProfilePage:function() {
      global.navigator.push({
        id: 'ProfilePage',
        name: 'Profile',
      });
      closeDrawer();
    },

    logout:function() {
      forceOAuth.logout();
      closeDrawer();
    }

});

var openDrawer = function() {
    global.drawer.openDrawer();
}
var closeDrawer = function() {
    global.drawer.closeDrawer();
}

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (route !== undefined && (route.id === 'Contact' || route.id === 'Lead'
      || route.id === 'Opportunity' || route.id === 'Task' || route.id === 'TaskPage'
      || route.id === 'NotePage' || route.id === 'Note' || route.id === 'CreateNote')) {

      var routes = navigator.getCurrentRoutes();
      if (routes[routes.length - 2].id === 'CreateNote' || routes[routes.length - 2].id === 'Note') {
        var destRoute = routes[routes.length - 3];
        for (var i = (routes.length-3); i > 0; --i) {
          destRoute = routes[i];
          if (destRoute.id === 'NotePage') {
            --i;
            destRoute = routes[i];
            if (destRoute.id !== 'CreateNote' && destRoute.id !== 'Note') break;
          }
        }
        return (
          <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
            onPress={() => {
              navigator.popToRoute(destRoute)
            }}>
            <Icon name='keyboard-arrow-left' size={30}
                style={Styles.iconLeft}/>
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {
            navigator.pop()
          }}>
          <Icon name='keyboard-arrow-left' size={30}
              style={Styles.iconLeft}/>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
        onPress={() => {
          openDrawer()
        }}>
        <Icon name='list' size={30}
          style={Styles.iconLeft}/>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
      var that = this;
      if (profileUrl === '' || route !== undefined && (route.id === 'Contact'
        || route.id === 'Lead' || route.id === 'Opportunity'
        || route.id === 'Task' || route.id === 'TaskPage'
        || route.id === 'NotePage' || route.id === 'Note' || route.id === 'CreateNote')) {

        return null;
    } else if (route !== undefined && route.id === 'ProfilePage') {
        return(
          <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
            onPress={() => {
              navigator.pop();
            }}>
            <Image
              style={{ height:30, width: 30, marginRight: 8, marginBottom: 5 }}
              source={{ uri: profileUrl }}
            />
          </TouchableOpacity>
        );
    } else {
      return(
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {
            navigator.push({ id: 'ProfilePage', name: 'Agent Profile' });
          }}>
          <Image
            style={{ height:30, width: 30, marginRight: 8, marginBottom: 5 }}
            source={{ uri: profileUrl }}
          />
        </TouchableOpacity>
      );
    }
  },

  Title: function(route, navigator, index, navState) {
      if (route !== undefined && (route.id === 'Contact' || route.id === 'Lead'
        || route.id === 'Opportunity' || route.id === 'Task' || route.id === 'TaskPage'
        || route.id === 'NotePage' || route.id === 'Note' || route.id === 'CreateNote')) {
        if (route.name.length > 38) {
          return (
            <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={Styles.navBarTitleLarge}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={Styles.navBarTitle}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      }
      if (route !== undefined && route.id === 'MainPage') {
        return(
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Image
              style={Styles.logo}
              source={require('../res/trp-logo.png')}
            />
          </View>
        );
      }
      return(
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {
            navigator.push({ id: 'MainPage', name: 'Home' });
          }}>
          <Image
            style={Styles.logo}
            source={require('../res/trp-logo.png')}
          />
        </TouchableOpacity>
      );
  },
};

React.AppRegistry.registerComponent('iOSAgentApp', () => App);
