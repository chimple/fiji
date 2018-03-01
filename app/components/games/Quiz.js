import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';

import Tile from './Tile';
import TileGrid from './TileGrid';

const SIZE = 2;
var colors = ['#fff', '#e56c25'];
var quecolors = ['#ffb300', '#ed2d85']

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = this._initBoard(props);
  }

  _initBoard = (props) => {
    let statuses = new Array(SIZE * SIZE)
    for (let i = 0; i < statuses.length; i++) {
      statuses[i] = 'Neutral';
    }
    var color = colors[Math.floor(Math.random() * colors.length)];
    var quecolor = quecolors[Math.floor(Math.random() * quecolors.length)];
    return ({
      statuses,
      color,
      quecolor
    });
  }


  componentWillReceiveProps(nextProps) {
    this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
  }


  _onStatusChange(id, view, prevStatus, currentStatus) {
    console.log('onstatuschange:', prevStatus, currentStatus)
    currentStatus == 'Neutral' && view.zoomIn(250)
  }

  _clickTile = (id, view) => {
    console.log(id);
    console.log(view);
    if (this.state.statuses[id] == 'Selected') {
      this.setState({ ...this.state })
    } else {
      if (id == this.props.data.answerIndex) {
        this.refs.questionView.zoomIn(250);
        view.zoomOut(250).then((endState) => {
          this.props.setProgress(1)
          this.props.onScore && this.props.onScore(2)
          this.setState({
            ...this.state,
            statuses: this.state.statuses.map(() => 'Selected')
          })
          this.props.onEnd()
        })
        view.zoomIn(250);
      } else {
        view.shake(250);
      }
    }
  }

  render() {

    const cellSize = Math.min(
      Math.floor(this.props.style.width / 2),
      Math.floor(this.props.style.height / 2)
    );

    const padding = Math.floor(cellSize * .05);
    const tileSize = cellSize - padding * 2;


    return (
      <View style={{alignContent: 'center', paddingTop: 10}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >


        <Animatable.View ref="questionView" style={{ margin: this.props.height * 0.01}}>
          <Tile
            id={0}
            tileColor='#24B2EA'
            edgeColor='black'
            pressedTileColor='goldenrod'
            pressedEdgeColor='darkgoldenrod'
            textColor='#fff'
            text={this.props.data.question}
            status='Same'
            statusStyles={{
              'Same': {
                View: {
                  backgroundColor: this.state.quecolor
                },
                Text: {
                  color: '#000'
                }
              }
            }}
            style={{
              width: tileSize,
              height: tileSize,
            }}

          />
        </Animatable.View>


        <TileGrid
          delegateTouch={this.props.delegateTouch}
          numRows={SIZE}
          numCols={SIZE}
          data={this.props.data.choices}
          statuses={this.state.statuses}
          onStatusChange={this._onStatusChange}
          tileColor='#24B2EA'
          edgeColor='deepskyblue'
          pressedTileColor='goldenrod'
          pressedEdgeColor='darkgoldenrod'
          textColor='#FFFFFF'
          style={{
            width: this.props.style.width * 0.5,
            height: this.props.style.height * 0.5
          }}
          onPress={this._clickTile}
          statusStyles={{
            Neutral: {
              View: {
                backgroundColor: this.state.color
              },
              Text: {
                color: '#000'
              }
            },
            Selected: {
              View: {
                backgroundColor: 'green'
              },
              Text: {
                color: '#000'
              }
            }
          }}
        />


      </View>
      </View>
    );
  }
}



Quiz.propTypes = {
  data: PropTypes.object,
  runIndex: PropTypes.number,
  onScore: PropTypes.func,
  onEnd: PropTypes.func,
  delegateTouch: PropTypes.func,
  setProgress: PropTypes.func
}
