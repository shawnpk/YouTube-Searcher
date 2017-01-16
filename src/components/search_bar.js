import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    // this binds the onInputChange method the the class object,
    // instead of it being bound to 'undefined'
    this.onInputChange = this.onInputChange.bind(this);

    this.state = { term: '' };
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

  render() {
    return (
      <div className='search-bar'>
        <input
          value={this.state.term}
          onChange={e => this.onInputChange(e.target.value)}
          placeholder='What are you looking for?' />
      </div>
    )
  }
}

export default SearchBar;
