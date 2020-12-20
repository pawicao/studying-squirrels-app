import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import SubjectListItem from '../../../components/Subject/SubjectListItem';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from '../../../components/ui/Spinner';
import NoDataView from '../../../components/ui/NoDataView';

class MySubjectsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      offers: [],
      loadingRemovalButtonId: null,
    };
  }

  getOffers = () => {
    this.setState({isLoaded: false});
    const url = `/offers?tutorId=${this.props.userId}`;
    axios
      .get(url)
      .then((res) =>
        this.setState({
          isLoaded: true,
          offers: res.data.sort((a, b) =>
            a.subject.name > b.subject.name ? -1 : 1,
          ),
        }),
      )
      .catch((err) => console.log(err));
  };

  createNewOffer = () => this.props.navigation.push('SubjectsDetails', {refresh: this.getOffers});

  editOffer = (offer) => this.props.navigation.push('SubjectsDetails', {offer, refresh: this.getOffers});

  deleteOffer = (id) => {
    const url = `/offer/${id}`;
    this.setState({loadingRemovalButtonId: id});
    axios
      .delete(url)
      .then((res) => {
        this.setState({loadingRemovalButtonId: null});
        this.getOffers();
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getOffers();
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={{justifyContent: 'center', flex: 1}}>
          <Spinner />
        </View>
      );
    }
    return (
      <View style={{justifyContent: 'space-between', flex: 1}}>
        {this.state.offers.length ? (
          <ScrollView>
            {this.state.offers.map((offer) => (
              <SubjectListItem
                title={offer.subject.name}
                offer={offer}
                icon={offer.subject.icon}
                removalIsLoading={
                  this.state.loadingRemovalButtonId === offer.id
                }
                onPress={this.editOffer}
                onDelete={this.deleteOffer}
                key={offer.id}
                offerId={offer.id}
              />
            ))}
          </ScrollView>
        ) : (
          <NoDataView
            subtitle="You haven't added any offers yet!"
            onReload={this.getOffers}
          />
        )}
        <SubjectListItem
          title="Add more offers"
          icon="plus-circle"
          white
          onPress={this.createNewOffer}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(MySubjectsScreen);
