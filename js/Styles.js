var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio,
    NavigatorIOS,
    TouchableHighlight,
    Dimensions,
} = React;

const { height, width } = Dimensions.get('window');

var Styles = StyleSheet.create({
    // for home page
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    listViewIcon: {
        marginRight: 15
    },
    textStyle: {
        color: '#545454',
        flex: 1,
        flexDirection: 'row'
    },
    flowRight: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flex: 1
    },
    paddingFour: {
        padding: 4
    },
    noteTitle: {
        fontSize: 16,
        color: '#404040'
    },
    noteInputBlack: {
        height: 40,
        color:'black',
    },
    noteInputBlue: {
        height: 40,
        color:'#42638E',
    },
    noteButton: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#cc0000',
        borderColor: '#cc0000',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    buttonContainer: {
      padding: 30,
      marginTop: 65,
      alignItems: 'center'
    },

    // for list views
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
    rowText: {
        flex:6
    },

    // for charts
    chart: {
        marginVertical:20,
        width: width - 40,
        height: 200,
        alignSelf: 'center'
    },
    chartContainer: {
        flex:1,
        justifyContent:'center',
        'alignItems': 'center'
    },
    scrollView: {
        width, marginTop: 10,
        flex: 1
    },
    menuButton: {
        height: 50,
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    menuTitle: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#cd201f',
        alignSelf: 'stretch'
    },
    scene: {
        flex: 1,
        paddingTop: 50,
    },
    row: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 12,
    },
    flowRight: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flex: 1
    },
    textStyle: {
        color: '#545454',
        flex: 1,
        flexDirection: 'row',
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // Trick to get the thinest line the device can display
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    },
});

module.exports = Styles;
