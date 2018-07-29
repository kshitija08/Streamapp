import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import {Link } from 'react-router-dom';
export default class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Link to="/"><Menu.Item name='Stream' active={activeItem === 'Stream'} onClick={this.handleItemClick} /></Link>
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.props.logout}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}