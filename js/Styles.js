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
    /*container: {
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
    logo: {
        flex: 1,
        //height: HEIGHT,
        width: width/4,
        //marginLeft: 42/360 * WIDTH,
        //marginLeft: WIDTH/3 - 145/2,
        resizeMode: 'contain',
        justifyContent: 'center',
        //alignSelf: 'center',
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
    },*/

    // for charts
    metricsChart: {
        marginVertical:20,
        width: width - 40,
        height: 200,
        alignSelf: 'center'
    },
    metricsChartContainer: {
        flex:1,
        justifyContent:'center',
        'alignItems': 'center'
    },
    /*scrollView: {
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
    menuTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 50,
        marginLeft: 50,
        color: 'white',
    },
    menuButton: {
        height: 50,
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    menuText: {
        fontSize: 16,
        marginLeft: 40,
        color: '#545454',
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
    rowColor: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#cc0000',
        flexDirection: 'row',
        padding: 14,
        elevation: 1
    },
    profilePic: {
        height: 100,
        width: 50,
        marginTop: 8,
        marginLeft: 8,
        flex: 1
    },
    flowTop: {
        flexDirection: 'row',
        flex: 1
    },
    listViewIcon: {
        marginRight: 15
    },
    listViewImageIcon: {
        marginRight: 15,
        width: 25,
        height: 25
    },*/
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo: {
        flex: 1,
        //height: HEIGHT,
        width: width/4.7,
        //marginLeft: 42/360 * WIDTH,
        //marginLeft: WIDTH/3 - 145/2,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    textStyle: {
        color: '#545454',
        flex: 1,
        flexDirection: 'row',
    },
    textStyleRight: {
        color: '#545454',
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'flex-end'
    },
    navBar: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        //elevation: 1,
        //borderBottomWidth: 1 / PixelRatio.get(),
        shadowColor: '#d9d9d9',
        shadowOffset: {width: 0, height: 0.1},
        shadowOpacity: 400,
        shadowRadius: 2
    },
    navBarText: {
        fontSize: 18,
    },
    navButtonsGroup: {
        flex: 1,
        alignItems:'center',
        flexDirection: 'row',
    },
    navBarElt: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        margin: 2,
    },
    navBarTitle: {
        //marginLeft: 42/360 * WIDTH,
        color: '#17314A',
        fontSize: 16,
        //textAlign: 'left'
    },
    navBarTitleLarge: {
        //marginLeft: 42/360 * WIDTH,
        color: '#17314A',
        fontSize: 12,
        //textAlign: 'left'
    },
    scene: {
        flex: 1,
        paddingTop: 55,
    },
    row: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 12,
    },
    rowNoPad: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    rowLessPad: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 4,
        paddingLeft: 12
    },
    rowHorizontalPad: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12
    },
    rowLeftPad: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 4,
        paddingLeft: 26
    },
    rowColor: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#cc0000',
        flexDirection: 'row',
        padding: 14,
        elevation: 1
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // Trick to get the thinest line the device can display
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    },
    menuTitle: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#cd201f',
        alignSelf: 'stretch'
    },
    menuTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 50,
        marginLeft: 50,
        color: 'white',
    },
    menuButton: {
        height: 50,
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    menuText: {
        fontSize: 16,
        marginLeft: 40,
        color: '#545454',
    },
    chartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    chart: {
        position: 'absolute',
        top: 16,
        left: 4,
        bottom: 4,
        right: 16,
    },
    iconLeft: {
        color: '#17314A',
        marginLeft: 8,
        marginBottom: 5
    },
    flowRight: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flex: 1
    },
    flowTop: {
        flexDirection: 'row',
        flex: 1
    },
    listViewIcon: {
        color: '#BCBCBC',
        marginRight: 15
    },
    listViewImageIcon: {
        marginRight: 15,
        width: 25,
        height: 25
    },
    noteTitle: {
        fontSize: 16,
        color: '#404040',
    },
    noteInput: {
        height: 40,
        color:'grey',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        paddingLeft: 4,
    },
    noteText: {
        height: 40,
        color:'grey',
        paddingLeft: 4,
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
    paddingFour: {
        padding: 4
    }
});

module.exports = Styles;
