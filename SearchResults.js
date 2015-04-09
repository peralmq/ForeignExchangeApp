'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component
} = React;

class SearchResults extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.guid !== r2.guid}
        );
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.rates)
        };
    }

  renderRow(rowData, sectionID, rowID) {
                console.log(rowData);
    return (
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                  {rowData.currency}: {rowData.rate}
                </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
}

var styles = StyleSheet.create(require('./styles'));

module.exports = SearchResults;
