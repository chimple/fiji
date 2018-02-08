import React, {PureComponent} from 'react'
import {FlatList,View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SvgUri from 'react-native-svg-uri'
import { Buffer } from 'buffer'
import { fetchGameHighScores } from '../redux/score' 

class ScoreScreen extends PureComponent{
    componentDidMount(){
        this.props.dispatch(fetchGameHighScores(this.props.game._id))
        console.log(this.props.user.name)
        console.log(this.props.game.name)
        console.log(this.props.item.name)
    }

    _keyExtractor = (item, index) => item._id

    _renderItem = ({item}) => (
        <View style={styles.RankingStyle}><Text style={{fontWeight:'bold', fontSize:30,}}>{item.score}</Text></View>
    )
    render(){
        var UserScore
        if(this.props.gameScore.length)
            for( i=0; i<this.props.gameScore.length ; i++ ){
                if(this.props.gameScore[i].user_id==this.props.user._id){
                    UserScore = this.props.gameScore[i].score
                    break
                }
            }
        return(
            this.props.isFetching
                ?
                    <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
                :
                    this.props.gameScore.length
                        ?
                
                        <View style={styles.ScoreCardStyle}>
                            <View style={styles.PlayerScoreViewStyle}>
                                <ImageBackground style={[styles.PlayerScoreStyle, {width:20, height:100, alignSelf:'center'}]} source={{uri:'data:image/png;base64,' + this.props.user.image }} ><Text style={{fontWeight:'bold', fontSize:20,}}>{UserScore}</Text></ImageBackground>
                                <View style={styles.CharacterStyle}></View>
                                <View style={styles.PlayerScoreStyle}><Text style={{fontWeight:'bold', fontSize:50,}}>B</Text></View>
                            </View>
                            <View style={styles.OptionStyle}>
                                <View style={[styles.EachOptionStyle, {backgroundColor:'#bac2d1'}]}><Text style={{fontSize:20,fontWeight:'bold', color:'black'}}>Home</Text></View>
                                <View style={[styles.EachOptionStyle, {backgroundColor:'grey'}]}><Text style={{fontSize:20,fontWeight:'bold', color:'black'}}>Exit</Text></View>
                                <View style={[styles.EachOptionStyle, {backgroundColor:'#91b587'}]}><Text style={{fontSize:20,fontWeight:'bold', color:'black'}}>Next</Text></View>
                            </View>
                            <View style={styles.RankingViewStyle}>
                                <FlatList
                                showsVerticalScrollIndicator={false}
                                data={ this.props.gameScore }
                                renderItem={this._renderItem}
                                keyExtractor={this._keyExtractor}
                                />
                            </View>
                        </View>

                        :

                        <View><Text>No body has scored !</Text></View>
        )
    }
}

ScoreScreen.propTypes = {
    gameScore:PropTypes.array,
    game:PropTypes.object,
    item:PropTypes.object,
    user:PropTypes.object,
    /*navigation: PropTypes.shape({
        state: PropTypes.shape({
          params: PropTypes.shape({
            game: PropTypes.object.isRequired,
            user: PropTypes.object.isRequired
          })
        })
      })*/
}

const styles = StyleSheet.create({
    ScoreCardStyle:{
       flex:1 
    },
    PlayerScoreViewStyle:{
        flex:3,
        backgroundColor:'#edca2f',
        flexDirection:'row'
    },
    RankingViewStyle:{
        flex:3,
        backgroundColor:'#59c6c3'
    },
    PlayerScoreStyle:{
        flex:3,
        justifyContent:'center',
        alignItems:'center'
    },
    RankingStyle:{
        marginTop:'2%',
        marginBottom:'2%'
    },
    CharacterStyle:{
        flex:2,
        borderColor:'black',
        borderWidth:2,
        borderRadius:30,
        marginTop:'5%',
        marginBottom:'5%'
    },
    OptionStyle:{
        flexDirection:'row',
        flex:1
    },
    EachOptionStyle:{
        borderColor:'black',
        borderWidth:1,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default connect( state => ({
    gameScore: state.score.gameHighScores,
    isFetching: state.score.isFetching
}))(ScoreScreen)