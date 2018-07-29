import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class LeftMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='huge' pointing secondary vertical>
        <Menu.Item name='Play' active={activeItem === 'Play'} onClick={this.handleItemClick} />
        <Menu.Item
          name='Profile'
          active={activeItem === 'Profile'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}
