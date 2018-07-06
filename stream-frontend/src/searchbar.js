import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
export default class search_bar extends Component {
  componentWillMount() {
    this.props.resetComponent()
  }


  render() {

    return (
      <Grid>
        <Grid.Column width={12}>
          <Search fluid size='large'
            loading={this.props.isLoading}
            onResultSelect={this.props.handleResultSelect}
            onSearchChange={this.props.handleChange}
            results={this.props.results}
            value={this.props.searchbar}
          />
        </Grid.Column>
      </Grid>
    )
  }
}