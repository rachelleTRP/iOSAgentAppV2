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
  TouchableOpacity,
  TextInput
} = React;

var Styles = require('./Styles.js');
var forceClient = require('./react.force.net.js');
var Icon = require('react-native-vector-icons/MaterialIcons');
var NotePage = require('./NotePage.js');

var Note = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
        title: '',
        body: '',
        editable: false
    };
  },

  componentWillMount: function() {
    var that = this;
    var soql = 'SELECT Id,Title,Body FROM Note WHERE Id = \''
      +that.props.noteId+'\'';
    forceClient.query(soql,
      function(response) {
          if (response.records.length > 0) {
            var fields = response.records[0];
            for (var i in fields) {
                if (i === 'Title') {
                  that.setState({
                      title: fields[i]
                  });
                } else if (i === 'Body') {
                  that.setState({
                      body: fields[i]
                  });
                }
            }
          }
      });
    },

    updateNote: function() {
      var that = this;
      that.makeEditable(false);
      forceClient.update('Note', that.props.noteId,
        { Title: that.state.title, Body: that.state.body },
        function(resp) {
          console.log(resp);
          that.props.navigator.pop();
        },
        function(resp) {}
      );
    },

    deleteNote: function() {
      var that = this;
      forceClient.del('Note', that.props.noteId,
        function(resp) {
          console.log(resp);
          that.props.navigator.pop();
        },
        function(resp) {}
      );
    },

    makeEditable(value) {
      //this.refs['textInput1'].setNativeProps({editable: value});
      //this.refs['textInput2'].setNativeProps({editable: value});
      this.setState({editable: value});
    },

    render: function() {
        var that = this;
        if (that.state.editable) {
            return (
              <View style={Styles.container}>
                <ScrollView>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity
                          style={{flex: 1, flexDirection: 'row', padding: 8}}
                          onPress={() => {
                            that.makeEditable(false)
                          }}>
                          <Icon name='mode-edit' size={30} style={{paddingRight: 8}}/>
                          <Text style={{fontSize: 14, alignSelf: 'center'}}>Toggle Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{padding: 8}}
                          onPress={that.deleteNote}>
                          <Icon name='delete' size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.paddingFour}>
                        <Text style={Styles.noteTitle}>Title</Text>
                    </View>
                    <View style={{paddingHorizontal: 4}}>
                        <TextInput
                          style={Styles.noteInputBlue}
                          ref={'textInput1'}
                          editable={true}
                          defaultValue={that.state.title}
                          onChangeText={(text) => that.setState({title: text})}
                          value={that.state.title}
                        />
                    </View>
                    <View style={Styles.paddingFour}>
                        <Text style={Styles.noteTitle}>Body</Text>
                    </View>
                    <View style={{paddingHorizontal: 4}}>
                        <TextInput
                          style={Styles.noteInputBlue}
                          ref={'textInput2'}
                          editable={true}
                          defaultValue={that.state.body}
                          onChangeText={(text) => that.setState({body: text})}
                          value={that.state.body}
                        />
                    </View>
                    <View style={Styles.paddingFour}>
                        <TouchableHighlight style={Styles.noteButton}
                          onPress={that.updateNote}>
                          <Text style={{fontSize: 18, color: 'white', alignSelf: 'center'}}>Update</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
              </View>
          );
      } else {
          return (
            <View style={Styles.container}>
              <ScrollView>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={{flex: 1, flexDirection: 'row', padding: 8}}
                        onPress={() => {
                          that.makeEditable(true),
                          that.refs.textInput1.focus()
                        }}>
                        <Icon name='mode-edit' size={30} style={{paddingRight: 8}}/>
                        <Text style={{fontSize: 14, alignSelf: 'center'}}>Toggle Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{padding: 8}}
                        onPress={that.deleteNote}>
                        <Icon name='delete' size={30} />
                      </TouchableOpacity>
                  </View>
                  <View style={Styles.paddingFour}>
                    <Text style={Styles.noteTitle}>Title</Text>
                  </View>
                  <View style={{paddingHorizontal: 4}}>
                      <TextInput
                        style={Styles.noteInputBlack}
                        ref={'textInput1'}
                        editable={false}
                        defaultValue={that.state.title}
                        onChangeText={(text) => that.setState({title: text})}
                        value={that.state.title}
                      />
                  </View>
                  <View style={Styles.paddingFour}>
                    <Text style={Styles.noteTitle}>Body</Text>
                  </View>
                  <View style={{paddingHorizontal: 4}}>
                      <TextInput
                        style={Styles.noteInputBlack}
                        ref={'textInput2'}
                        editable={false}
                        defaultValue={that.state.body}
                        onChangeText={(text) => that.setState({body: text})}
                        value={that.state.body}
                      />
                  </View>
                  <View style={Styles.paddingFour}>
                        <TouchableHighlight style={Styles.noteButton}
                          onPress={that.updateNote}>
                          <Text style={{fontSize: 18, color: 'white', alignSelf: 'center'}}>Update</Text>
                        </TouchableHighlight>
                    </View>
              </ScrollView>
            </View>
        );
      }
    }
});

module.exports = Note;
