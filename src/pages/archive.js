import React, {Component} from 'react';
import actions from '../actions';
import {connect} from 'react-redux';
import '../design/archive.css';
import axios from 'axios';

class ArchiveItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            key : null
        }
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <div className="table-container table-header">
                    <div className="column-no">No</div>
                    <div className="column">Game Title</div>
                    <div className="column">Thread Link</div>
                    <div className="column">Game Master</div>
                    <div className="column">Co-GM</div>
                    <div className="column">Alignment Winner</div>
                    <div className="column">Players</div>
                    <div className="column">Phases Detail</div>
                </div>

                {this.props.games.map((game, key) => {
                    return(
                        <div key={key} className="table-container">
                            <div className="column-no">{key+1}</div>
                            <div className="column">{game.name}</div>
                            <div className="column"><a href={game.link}>{game.link}</a></div>
                            <div className="column">{game.gm}</div>
                            <div className="column">{game.cogm ? game.cogm : '-'}</div>
                            <div className="column alignment"><span className={game.won}>{game.won}</span></div>
                            <div className="column">
                                <div className="button-detail" onClick={() => {this.props.getDetail(game, 'player')}}>Click to see players</div>
                            </div>
                            <div className="column">
                                <div className="button-detail" onClick={() => {this.props.getDetail(game, 'phases')}}>Click to see details</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

class PopUp extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='popup'>
                <div className='popupcontainer'>
                    {(this.props.type == 'player') ? <h2>Players List</h2> : <h2>Phases Details</h2>}
                    {(this.props.type == 'phases') ? (<div className='time-phase'>Thread Opened : {this.props.game.open} | Game Started : {this.props.game.start} | Game Finished : {this.props.game.finish} </div>) : null}
                    <div className='content'>
                        {(this.props.type == 'player') ?
                            this.props.game.players.map((player, key) => {
                                return(
                                    <div className='popuptable'>
                                        <div className='popupcolumn-no'>{key+1}</div>
                                        <div className='popupcolumn'>{player.id} {(player.mvp != null) ? <span><strong> MVP</strong></span> : null}</div>
                                        <div className='popupcolumn'>as <span className={player.alignment}>{player.role}</span></div>
                                        <div className='popupcolumn'>{(player.subbed != null) ? <span> subbed by {player.subbed}</span> : null}</div>
                                        <div className='popupcolumn'></div>                                        
                                    </div>
                                );
                            })
                            :
                            this.props.game.phases.map((phase, key) => {
                                return(
                                    <div>
                                        <div className='phase'>{(phase.phase[0] == 'D') ? ('Day ' + phase.phase[1]) : ('Night ' + phase.phase[1])}</div>
                                        
                                        <PhaseSpan phase={phase} game={this.props.game}/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="buttonholder">
                    <div className="closebutton" onClick={this.props.closePopUp}>X</div>
                </div>
            </div>
        );
    }
}

class PhaseSpan extends Component{
    constructor(props){
        super(props);
        this.state = {
            phase : this.props.phase,
            game : this.props.game
        }
    }

    render(){
        let {phase, game} = this.state;

        if(phase.dies.length == 0){
            return(<div>No one dies/lynched</div>);
        }
        else{
            for(var i=0; i < phase.dies.length; i++){
                var playerDie = phase.dies[i];

                for(var j=0; j < game.players.length; j++){
                    var playerName = game.players[j].id;
                    var playerNameSubbed = game.players[j].subbed;
                    var playerAlignment = game.players[j].alignment;
                    var playerRole = game.players[j].role;

                    if((playerName == playerDie) || (playerNameSubbed == playerDie)){
                        return(
                            <div className='phasespan'>
                                {playerDie} died as <span className={playerAlignment}>{playerRole}</span>
                            </div>
                        );
                    }
                }
            }
        }
    }
}

class Archive extends Component{
    constructor(props){
        super(props);
        this.state = {
            showPopUp : false,
            popUpContent : null,
            type : null,
            games : null,
            inProgress : true
        }

        this.togglePopUp = this.togglePopUp.bind(this);
        this.getDetail = this.getDetail.bind(this);
        
    }

    componentDidMount(){
        axios.get('https://raw.githubusercontent.com/rexevan/twg-cystg-big/master/new_kaskus.json')
        .then((response) => {
            this.setState({
                games : response.data,
                inProgress : false
            });
        })
    }

    getDetail(game, type){
        this.setState({popUpContent : game, type: type});
        this.togglePopUp();
    }

    togglePopUp(){
        this.setState({showPopUp : !this.state.showPopUp});
    }

    render(){
        const {showPopUp, popUpContent, type, games, inProgress} = this.state;
        return(
            <div>
                <div className='container'>
                    {(inProgress) ? (
                        <div>On Progress</div>
                    )
                    :
                    (
                        <div>
                            {showPopUp ? <PopUp game={popUpContent} closePopUp={this.togglePopUp} type={type} /> : null}
                            <ArchiveItem games={games} getDetail={this.getDetail} togglePopUp={this.togglePopUp} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    if(state.archive.games != null){
        return({
            games : state.archive.games,
            inProgress : state.archive.inProgress
        });
    }
    else{
        return state;
    }
}

export default connect(mapStateToProps, actions)(Archive);