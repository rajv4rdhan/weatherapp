import React, { Component } from 'react';

class CountryNameConverter extends Component {
  state = { countryName: '' };

  updateCountryName = (countryCode) => {
    const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
    this.setState({ countryName });
  };

  componentDidMount() {
    this.updateCountryName(this.props.countryCode);
  }

  componentDidUpdate(prevProps) {
    if (this.props.countryCode !== prevProps.countryCode) {
      this.updateCountryName(this.props.countryCode);
    }
  }

  render() {
    return <>{this.state.countryName}</>;
  }
}

export default CountryNameConverter;
