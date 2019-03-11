import React from 'react';
import BookingWidget from './BookingWidget';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: null,
    };
    this.postBooking = this.postBooking.bind(this);
  }

  componentDidMount() {
    let homeId = new URLSearchParams(window.location.search).get('homeId');
    if (!homeId || !parseInt(homeId, 10)) homeId = 200;
    fetch('/api/booking/' + homeId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((calendar) => {
        this.setState({
          calendar: calendar,
        });
      })
      .catch(error => console.error(error));
  }

  postBooking(booking) {
    fetch('/bookings/', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ booking: booking }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json());
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
