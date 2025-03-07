import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {useState} from 'react';
import HistoryCell from '../components/HistoryCell';
import Card from '../components/Card';
import {uuid} from 'uuidv4';
import {
  addCard,
  deleteCard,
  changeCard,
  changeType,
  changeLimit,
  changeQuantity,
  changeName,
  changeGroup,
  changePhone,
  tieCheckedOrdersToHistory,
  uploadCards,
} from '../actions';
import {connect} from 'react-redux';
import {
  getKeyDate,
  checkDate,
  checkOrders,
  writeData,
  readData,
  keys,
} from '../services';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

let cardsUploaded = false;
let initialRefresh= false;
const HistoryPage = props => {
  const history = props.cards.history;
  const datesToCheck = checkDate();
  const [refreshing, refresh] = useState({
    refreshing: false,
    lastRefreshed: new Date().getTime() - 1000 * 60 ,
  });

  const loadHistory = async () => {
    if (props.cards.history.length === 0) {
      const cards = await readData(keys.cards);
      if (cards) {
        props.uploadCards(cards);
        cardsUploaded = true;
      }
    } else {
      cardsUploaded = true;
    }
  };
  if (!cardsUploaded) {
    loadHistory();
  }

 

  const ordersToCheck = history
    .filter(
      order =>
        order.date === datesToCheck.date1 || order.date === datesToCheck.date2,
    )
    .map(({id, date, approved}) => ({id, date, approved}));

  const handlerefresh = () => {
    if (new Date().getTime() - refreshing.lastRefreshed > 1000 * 60) {
      console.log('Sended update');
      refreshStatuses();
    } else {
      console.log('Brutforced update');
    }
  };

  const refreshStatuses = async () => {
    refresh(prevRefresh => ({
      refreshing: true,
      lastRefreshed: prevRefresh.lastRefreshed,
    }));
    try {
      result = await checkOrders(ordersToCheck);
      if (result != null) {
        await props.tieCheckedOrdersToHistory(result);
      } else {
        alert(`Something wrong with network connection or serever!\n
       Try later...`);
      }
    } catch (error) {}
    refresh({
      refreshing: false,
      lastRefreshed: new Date().getTime(),
    });
  };

  if(!initialRefresh){
    initialRefresh=true;
    refreshStatuses();
  }

  if (history.length > 0) {
    return (
      <View
        style={styles.mainView}>
        <FlatList
          data={history}
          onRefresh={handlerefresh}
          refreshing={refreshing.refreshing}
          renderItem={({item}) => {
            return (
              <HistoryCell
                key={uuid()}
                navigation={props.navigation}
                order={item}
              />
            );
          }}
          contentContainerStyle={{flexGrow: 1}}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.mainView}>
        <View style={styles.nocardsLayout}>
        <Text style={styles.textPrimary}>No orders in history!</Text>
        <Text style={styles.textPrimary}>Make order first</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainView: {
   backgroundColor: "#B3E5FC",
   height:"100%",
   width: "100%"
  },
  card: {
    backgroundColor: '#9E9E9E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    marginTop: 10,
    padding: 5,
  },
  font: {
    color: '#FFFFFF',
    fontSize: RFValue(20),
    textAlign: 'center',
  },
  textPrimary: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});
const mapStateToProps = state => {
  return {
    cards: state.cards,
    user: state.user,
    history: state.history,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addCard: card => dispatch(addCard(card)),
    deleteCard: id => dispatch(deleteCard(id)),
    changeCard: (index, card) => dispatch(changeCard(index, card)),
    changeType: type => dispatch(changeType(type)),
    changeLimit: limit => dispatch(changeLimit(limit)),
    changeQuantity: quantity => dispatch(changeQuantity(quantity)),
    changeName: name => dispatch(changeName(name)),
    changeGroup: group => dispatch(changeGroup(group)),
    changePhone: phone => dispatch(changePhone(phone)),
    goBack: () => dispatch(deleteHistory()),
    addHistory: pageName => dispatch(addHistory(pageName)),
    refresh: () => dispatch(refresh()),
    tieCheckedOrdersToHistory: checkedOrders =>
      dispatch(tieCheckedOrdersToHistory(checkedOrders)),
    uploadCards: cards => dispatch(uploadCards(cards)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryPage);
