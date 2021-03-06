import React from 'react'
import { connect } from 'react-redux'
import { guestLoginCall, publicGrubSearch, resetGuestState } from '../actions/guestActions';
import { cancelState } from '../actions/actions'

import './guestUser.css'

export class GuestUser extends React.Component {

    //ask for user location
    guestLogin(event) {
        event.preventDefault();

        let randomVal = Math.floor(Math.random() * parseInt(this.props.publicSort.length)) + 0;
        let sortForPub = this.props.publicSort[randomVal]

        const userLocation = this.userLoc.value

        return this.props.dispatch(guestLoginCall(userLocation, sortForPub))

    }

    guestReset(event) {
        event.preventDefault();

        return this.props.dispatch(resetGuestState())
    }


    cancel(event) {
        event.preventDefault();

        this.props.dispatch(cancelState())
    }
    //the draw work flow

    guestDraw(event) {
        event.preventDefault();
        //determines random value to draw from the users fav array

        let randomVal = Math.floor(Math.random() * parseInt(this.props.publicJoints.length)) + 0;

        let publicTheOffer = this.props.publicJoints[randomVal]
        //tracks for display of offers made

        let publicMadeOffers = [...this.props.publicMadeOffers, { restaurantName: publicTheOffer.restaurantName, url: publicTheOffer.url }]

        let publicDrawCount = this.props.publicMadeOffers.length + 1;

        let publicHangryTaunt;

        let publicRestart;
        //removes the restaurant from the current game, it will load back to state on reset

        this.props.publicJoints.splice(randomVal, 1)

        let publicNumJoints = this.props.publicNumJoints;

        //taunt the user based on number of draws

        if (publicNumJoints < 5) {
            if (publicDrawCount < publicNumJoints) {
                publicHangryTaunt = `Draw again ya scoundrel!`
                publicRestart = false

                this.props.dispatch(publicGrubSearch(publicHangryTaunt, publicMadeOffers, publicRestart, publicTheOffer))

            }

            if (publicDrawCount < publicNumJoints - 2) {
                publicHangryTaunt = `Draw again ya scallywag!`
                publicRestart = false

                this.props.dispatch(publicGrubSearch(publicHangryTaunt, publicMadeOffers, publicRestart, publicTheOffer))

            }

            if (publicDrawCount === publicNumJoints - 1) {
                publicHangryTaunt = `It's yer last stand ya scurvy dog!`
                publicRestart = false

                this.props.dispatch(publicGrubSearch(publicHangryTaunt, publicMadeOffers, publicRestart, publicTheOffer))

            }

            if (publicDrawCount === publicNumJoints) {
                publicRestart = true

                this.props.dispatch(publicGrubSearch(publicHangryTaunt, publicMadeOffers, publicRestart, publicTheOffer))

            }
        }
        else {

            if (publicDrawCount < publicNumJoints) {
                publicHangryTaunt = `Draw again ya scoundrel!`
                publicRestart = false

                this.props.dispatch(publicGrubSearch(publicHangryTaunt, publicMadeOffers, publicRestart, publicTheOffer))

            }

            if (publicDrawCount === 2) {
                publicHangryTaunt = `Arr ya scallywag, draw again!`
                publicRestart = false

                this.props.dispatch(publicGrubSearch(publicHangryTaunt, publicMadeOffers, publicRestart, publicTheOffer))

            }

            if (publicDrawCount === 3) {
                publicHangryTaunt = `It's yer last stand ya scurvy dog!`
                publicRestart = false

                this.props.dispatch(publicGrubSearch(publicHangryTaunt, publicMadeOffers, publicRestart, publicTheOffer))

            }

            if (publicDrawCount === 4) {
                publicRestart = true

                this.props.dispatch(publicGrubSearch(publicHangryTaunt, publicMadeOffers, publicRestart, publicTheOffer))

            }

        }

    }

    render() {

        if (this.props.loggedIn < 6) {
            //Display initial guest page requesting zipcode
            return (

                <div className='pirateImageSection'>
                    <h2 className='loginTitle'>Ye be a vistor aboard me ship!</h2>
                    <form className='logInForm' id='logInForm' onSubmit={event => this.guestLogin(event)}>
                        <p className='guestLocation'>Enter your Zip Code:</p>
                        <input type='number' className='userLocationField' id='userLocationField' min='00000' max='99999' ref={userLoc => (this.userLoc = userLoc)} />
                        <br />
                        <span id='errorMessage' role='alert'>{this.props.errorMessage}</span>
                        <br />
                        <button type='submit' name='submit' id='logInButton' className='logInButton playAsGuestStart'>Play as Guest</button>
                    </form>
                    <p className='cancel'><button id='cancelButton' className='cancelButton' onClick={event => this.cancel(event)}>Cancel</button></p>
                    <br /><br />

                </div>

            )
        }

        if (this.props.loggedIn === 6) {
            //displays the draw form for guests
            if (!this.props.publicRestart) {
                return (
                    <div>
                        <div className='drawForm guestDrawform'>
                            <form id='drawForm' onSubmit={event => this.guestDraw(event)}>
                                <button type='submit' name='submit' id='drawButton' className='drawbutton dpe_button'>Whar do ye want to eat?</button>
                            </form>
                        </div>


                        <div className='publicHangryTauntSection'>
                            <span role='alert'>{this.props.noFavsMessage}</span>
                            <br />
                            <span role='alert'>{this.props.publicHangryTaunt}</span>

                            <br />
                            <ul className='publicOfferSection'>
                                {this.props.publicMadeOffers.map(offer =>
                                    <li key={offer.restaurantName} className='offerDisplay' >
                                        <a href={offer.url} target='_blank' rel='noopener noreferrer'>{offer.restaurantName}</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <br /><br />
                        <div className='yelpsection'>
                            <p className='yelpInfo'>Search info provided by:</p>
                            <a href='https://www.yelp.com' target='_blank' rel='noopener noreferrer'><img className='yelpImg' src={require('../images/Yelp_trademark_RGB_outline.png')} alt='yelp logo' /></a>
                        </div>
                    </div>
                )
            }

            if (this.props.publicRestart) {
                //displays the restart flow for guests
                return (
                    <div>
                        <div className='drawForm guestDrawform'>
                            <form onSubmit={event => this.guestReset(event)}>
                                <button type='submit' name='reset' id='restartButton' className='restartButton dpe_button'>Restart the game?</button>
                            </form>
                            <p className='cancel'><button id='cancelButton' className='cancelButton' onClick={event => this.cancel(event)}>Cancel</button></p>

                        </div>


                        <div className='publicHangryTauntSection'>
                            <br />
                            <span role='alert'> Ye time is up, walk thee plank! </span>

                            <br />
                            <ul className='publicOfferSection'>
                                {this.props.publicMadeOffers.map(offer =>
                                    <li key={offer.restaurantName} className='offerDisplay' >
                                        <a href={offer.url} target='_blank' rel='noopener noreferrer'>{offer.restaurantName}</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <br /><br />
                        <div className='yelpsection'>
                            <p className='yelpInfo'>Search info provided by:</p>
                            <a href='https://www.yelp.com' target='_blank' rel='noopener noreferrer'><img className='yelpImg' src={require('../images/Yelp_trademark_RGB_outline.png')} alt='yelp logo' /></a>
                        </div>
                    </div>
                )

            }



        }
    }

}

const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    restart: state.restart,
    publicHangryTaunt: state.publicHangryTaunt,
    randomCheck: state.randomCheck,
    publicSort: state.publicSort,
    publicJoints: state.publicJoints,
    publicNumJoints: state.publicNumJoints,
    publicMadeOffers: state.publicMadeOffers,
    publicTheOffer: state.publicTheOffer,
    publicRestart: state.publicRestart,
    publicDrawCount: state.publicDrawCount,
    noFavsMessage: state.noFavsMessage
})

export default connect(mapStateToProps)(GuestUser)