import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as a from './../actions';
import Moment from 'moment';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedTicket: null,
      editing: false,
    };
  }

  componentDidMount(){
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedTime(),
      1000
    );
  }

  componentDidUpdate() {
    console.log("component updated!");
  }  

  componentWillUnmount(){
      console.log("component unmounted!");
      clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedTime = () => {
      console.log("tick");
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false,
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage,
      // }));
    }
  };

  handleEditClick = () => {
    console.log("handleEditClick reached");
    this.setState({ editing: true });
  };

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = a.addTicket(newTicket);
    dispatch(action);
    this.setState({formVisibleOnPage: false})
    // below code is from pure react, without redux
    // const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    // this.setState({
    //   masterTicketList: newMasterTicketList,
    //   formVisibleOnPage: false,
    // });
  };

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    })
    // below code was react only before redux
    // const editedMasterTicketList = this.state.masterTicketList
    //   .filter((ticket) => ticket.id !== this.state.selectedTicket.id)
    //   .concat(ticketToEdit);
    // console.log(editedMasterTicketList);
    // this.setState({
    //   masterTicketList: editedMasterTicketList,
    //   editing: false,
    //   selectedTicket: null,
    // });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = (
        <EditTicketForm
          ticket={this.state.selectedTicket}
          onEditTicket={this.handleEditingTicketInList}
        />
      );
      buttonText = "Return To Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = (
        <TicketDetail
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return to Ticket List";
    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      );
      buttonText = "return To Ticket List";
    } else {
      currentlyVisibleState = (
        <TicketList
          ticketList={this.props.masterTicketList}
          onTicketSelection={this.handleChangingSelectedTicket}
        />
      );
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  masterTicketList: PropTypes.object
}

const mapStateToProps = state => {
  return {
    masterTicketList: state
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;
