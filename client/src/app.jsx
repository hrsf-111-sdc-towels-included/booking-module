import React from 'react';
import ReactDOM from 'react-dom';
import BookingWidget from './BookingWidget.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: null,
    };
    this.postBooking = this.postBooking.bind(this);
  }

  componentDidMount() {
      let homeId;
      if (window.location.href.split('?')[1]) {
        homeId = window.location.href.split('?')[1];
       } else {
        window.location = window.location.href + "?100";
       }

    fetch('/api/bookings/' + homeId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(JSONresp => JSONresp)
      .then((calendar) => {
        this.setState({
          calendar: calendar,
        });
      })
      .catch(error => console.error(error));
  }

  postBooking(booking) {
    console.log(`${booking} was sent`);
    fetch('/bookings/', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({booking: booking}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
  }

  render() {
    const { calendar } = this.state;
    if (!calendar) {
      return (
        <div>
          { /* Failed to load data, please try again */ }
        </div>
      );
    }
    return (
      <div>
        <div>
          <BookingWidget
            calendar={calendar}
            postBooking={this.postBooking}
          />
        </div>
      </div>
    );
  }
}
