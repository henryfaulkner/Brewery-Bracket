import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GetBreweriesNamesAndIds, GetAllBeersFromGivenBrewery } from "./api/catalog-beer"
import React, { Component } from 'react'
import CardInBracket from '../components/CardInBracket'
import RatingModal from '../components/RatingModal'
import Header from '../components/Header'
import ActiveBracketCard from '../components/ActiveBracketCard'

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRatingModal: false,
      activeBracket: [
        {
          "name": "Eventide Brewing",
          "id": "28b3a317-fa0d-4217-9395-62455e9d9b97"
        },
        {
          "name": "Arches Brewing",
          "id": "3bcfe05a-56a9-4702-96f8-b2940d647fb3"
        },
        {
          "name": "Strawn Brewing Company",
          "id": "4fd78bc0-5c1a-4436-bf38-c6a721ea3fee"
        },
        {
          "name": "Thomas Creek Brewery",
          "id": "c5607ffd-9e05-4a29-a948-83869716e2dd"
        },
        {
          "name": "Cahaba Brewing Company",
          "id": "755cb446-8115-4d1d-8b72-58c87d596162"
        },
        {
          "name": "Czann's Brewing",
          "id": "40ac7f0a-5199-438b-8a0b-85c6754eaedc"
        },
        {
          "name": "Sugar Creek Brewing Company",
          "id": "5a961acc-2d29-43e6-a8f0-2a0de4814fc7"
        },
        {
          "name": "Red Clay Ciderworks",
          "id": "926955c8-640a-4bd5-98cb-49fe988bdc6d"
        }
      ],
      actieBrackets: ["le Homies", "Beertrinken", "Shwasteds"]
    };
  }

  toggleRatingModal() {
    this.setState({
      showRatingModal: this.state.showRatingModal ? false : true
    })
  }

  render() {
    GetBreweriesNamesAndIds()
    var activeBracketCards = this.state.activeBracket.map((breweryObj) =>
      <CardInBracket breweryName={breweryObj.name} breweryId={breweryObj.id} />
    );

    var ratingModal = this.state.ratingModal ? <RatingModal /> : <div />;

    let currentBrackets = (
      this.state.actieBrackets.map((bracketName) => {
        return (
          <ActiveBracketCard
            name={bracketName}
          />
        )
      })
    )


    return (
      <div className="container">
        <Header
        />
        <h2>Active Brackets</h2>
          <hr />
        <div className={styles.cardContainer}>
          {currentBrackets}
          <ActiveBracketCard
        override={true}
        />
        </div>
      </div>
    )
  };
}