'use strict';

var React = require('react-native');
var {
    Component,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} = React;
var SearchResults = require('./SearchResults');

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'USD',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                Search for FX!
                </Text>
                <View style={styles.flowRight}>
                    <TextInput
                        placeholder='Enter FX code'
                        onChange={this.onSearchTextChanged.bind(this)}
                        style={styles.searchInput}
                        value={this.state.searchString}
                    />
                    <TouchableHighlight
                        onPress={this.onSearchPressed.bind(this)}
                        style={styles.button}
                    >
                    <Text style={styles.buttonText}>Go!</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

  onSearchTextChanged(event) {
    this.setState({searchString: event.nativeEvent.text});
    console.log(this.state);
  }

  onSearchPressed() {
    fetch('http://api.fixer.io/latest?base=' + this.state.searchString)
    .then(response => response.json())
    .then(json => this.handleResponse(json))
    .catch(console.warn);
  }

  handleResponse(json) {
      var rates = [];
      for (var key in json.rates) {
          rates.push({
              currency: key,
              rate: json.rates[key],
          });
      }
      console.log(rates);
      this.props.navigator.push({
          title: 'Results',
          component: SearchResults,
          passProps: {rates: rates},
      })
  }
};

var styles = StyleSheet.create(require('./styles'));

module.exports = SearchPage;
