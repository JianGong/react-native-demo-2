'use strict';

import React from 'react-native';
import {results} from './../data/docs';
import palette  from './../styles/palette';
import SearchResultItem from './SearchResultItem';
import OrderPage from './OrderPage';


const {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  SwitchIOS,
  ListView
} = React;

export default class SearchResults extends React.Component {

  static propTypes = {
    docs: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.renderSearchResultItem = this.renderSearchResultItem.bind(this);
    this.selectRow = this.selectRow.bind(this);

    const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
        dataSource: dataSource.cloneWithRows(results)
    };
  }

  render() {
    return (
       <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderSearchResultItem}
                style={styles.listView}
              />
       </View>
    );
  }

  renderSearchResultItem(item) {
    return (
        <SearchResultItem
            item={item}
            onRowSelect={this.selectRow}
        />
    );
  }

selectRow(order) {
    console.log('seleect roooow', this.props);
    this.props.navigator.push({
        component: OrderPage,
        title: 'Order',
        passProps: { order },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  title: {
    fontSize: 22,
    color: 'black'
  },

  listView: {
    backgroundColor: palette.backgroundColor,
  }
});