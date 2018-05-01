import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Meta } = Card;

class ProfileCard extends Component {
    state = { 
        profiles: [], 
        displayingName: '', 
        displayingImage: '', 
        displayingAge: 0, 
        displayingDistance: 0,
        isEmpty: false,
        isLoading: true,
    };

    componentDidMount(){
        this.loadProfileData();
    }

    componentWillReceiveProps(){
        this.loadProfileData()
    }

    loadProfileData = () => {  
        this.setState( () => ({
            profiles: [],
            isLoading: true
        }) );
        axios.get('/users')
        .then((response) => {

            const profiles =  response.data.filter( (value) => (
                this.dateOfBirthToAge(value.dateOfBirth) >= this.props.selectedAge[0] && this.dateOfBirthToAge(value.dateOfBirth) <= this.props.selectedAge[1] && value.distance <= this.props.selectedDistance
            ));
            setTimeout(() => {
                
            this.setState( () => ({
                profiles,
                isEmpty: profiles.length === 0,
                isLoading: false
                
            }) );

            this.next();
            }, 500);
        })
        .catch((error) => {
            this.setState( () => ({
                profiles: [],
                isLoading: false
            }) );
            console.log(error);
        });
    }
    
    dateOfBirthToAge = (dob) => {
        const now = moment();
        const dateOfBirth = moment(dob);
        const age = now.diff(dateOfBirth, 'year');
        return age;
    }

    next = () => {
        const  x = this.state.profiles.pop();
        if (x) {
            const age = this.dateOfBirthToAge(x.dateOfBirth);
            this.setState( () => ({ 
            displayingName: x.name, 
            displayingImage: x.avatar,
            displayingAge: age, 
            displayingDistance: x.distance
         }));
        } else {
            this.setState( () => ({ 
                isEmpty: true
        }));
        
        }
    }
    


    like = () => {
        console.log('liked')
    }

    render(){
        if(this.state.isLoading) {
            return (
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <Icon type="loading"/>
                </div>
            )
        } 
        return (            
            <Card
            style={{ width: 300, margin:'auto auto'}}
            cover={!this.state.isEmpty && <img alt="profile" src={this.state.displayingImage} />}
            actions={!this.state.isEmpty  && [<Icon onClick={() => this.next()} type="close-circle" />, <Icon type="star" onClick={()=>this.like()}/>, <Icon onClick={() => this.like()} type="heart" />]}
          >
            {
                !this.state.isEmpty ?
                <Meta
                title={`${this.state.displayingName}, ${this.state.displayingAge}`}
                description={`${this.state.displayingDistance} km away`}
                /> :
                <p>No Card Left</p>
            }
          </Card>
        )
    }
}

export default ProfileCard