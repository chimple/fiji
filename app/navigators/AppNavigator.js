/**
 * Read https://reactnavigation.org/docs/guides/redux 
 * for integrating navigation with redux
 * @flow
 */

import React from 'react'
import { addNavigationHelpers, TabNavigator, StackNavigator } from 'react-navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FriendsScreen from '../screens/FriendsScreen'
import GamesScreen from '../screens/GamesScreen'
import StoriesScreen from '../screens/StoriesScreen'
import StoryScreen from '../screens/StoryScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import ChatScreen from '../screens/ChatScreen'
import GameFrontScreen from '../screens/GameFrontScreen'

import CamPage from '../components/CamPage'

const CamNavigator = StackNavigator({
  Cam: {
    screen: CamPage,
    navigationOptions:{
      headerTitle: 'Take photo',
      headerStyle:{ backgroundColor:'red'}
    }
  }
}, {headerMode:'none'}) 

const ChatNavigator = StackNavigator({
  Friends: {
    screen: FriendsScreen,
    navigationOptions: {
      headerTitle: 'Friends',
      headerStyle:{backgroundColor: '#19a4f2'}
    },
  },
  /*ChatWith: {
    screen: ChatScreen,
    navigationOptions: {
      headerTitle: 'Chat',
      headerStyle:{backgroundColor: '#e24076'}
    }
  }*/  
},{headerMode:'none'})

const StoryNavigator = StackNavigator({
  Titles: {
    screen: StoriesScreen,
    navigationOptions: {
      headerTitle: 'Stories',
      headerStyle:{backgroundColor:'#19a4f2'}
    },
  },
  /*Story: {
    screen: StoryScreen,
    navigationOptions: {
      headerTitle: 'Story',
      headerStyle:{backgroundColor:'#19a4f2'}
    }
  }*/  
},{
  headerMode:'none'
})

const MainNavigator = TabNavigator({
  Chat: {
    screen: ChatNavigator
  },
  Games: {
    screen: GamesScreen,
    navigationOptions: {
      headerTitle: 'Games',
      headerStyle:{backgroundColor:'#19a4f2'}
    }
  },
  Stories: {
    screen: StoryNavigator
  }
}, {
  tabBarPosition:"bottom",
  tabBarOptions:{
    labelStyle:{fontSize: 15, fontWeight:'bold', color:'black'},
    style:{backgroundColor:'#19a4f2'},
    indicatorStyle:{backgroundColor:'white'}
  }
})

export const AppNavigator = StackNavigator({
  Home: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Homez',
      headerStyle:{backgroundColor:'#19a4f2'}
    }
  },
  CamPage: {
    screen: CamNavigator
  },
  Main: {
    screen: MainNavigator
  },
  Story: {
    screen: StoryScreen,
    navigationOptions: {
      headerTitle: 'Story',
      headerStyle:{backgroundColor:'#19a4f2'}
    }
  },
  ChatWith: {
    screen: ChatScreen,
    navigationOptions: {
      headerTitle: 'Chat',
      headerStyle:{backgroundColor: '#19a4f2'}
    }
  },
  Game: {
    screen: GameFrontScreen,
    navigationOptions:{
      headerTitle:'Game',
      headerStyle:{backgroundColor: '#19a4f2'}
    }
  },
  /*Game1: {
    screen: Game1
  },
  Game2: {
    screen: Game2
  },
  Game3: {
    screen: Game3
  },
  Game4: {
    screen: Game4
  },
  Game5: {
    screen: Game5
  },*/
})

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState)
