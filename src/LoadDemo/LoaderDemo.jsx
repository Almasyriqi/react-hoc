import React, { Component } from 'react';
import LoadIndicator from './LoaderHOC.jsx';
import './ContactsApp.css';

class LoaderDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchResults: [],
            contactList: []
        }
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    handleUserInput(inputText) {
        this.setState({
            searchText: inputText,
        }, () => console.log(this.state))
    }
    componentDidMount() {
        let init = {
            method: 'GET',
            headers: new Headers(),
            mode: 'cors',
            cache: 'default'
        };
        fetch('https://6249dbac852fe6ebf8814593.mockapi.io/users/', init)
            .then((response) => (response.json()))
            .then(
                (data) => {
                    console.log(data); this.setState(
                        prevState => ({
                            contactList: [...data]
                        })
                    )
                }
            )
    }

    render() {
        const ContactListWithLoadIndicator = LoadIndicator('contact')(ContactList);
        return (<div className="contactApp">
            
            <ContactListWithLoadIndicator contacts={this.state.contactList} />
        </div>
        )
    }
}
const ContactList = ({ contacts }) => {
    return (
        <div>
            <ul>
                {contacts.map(
                    (contact) => <li key={contact.email}>

                        <img src={contact.photo} width="100px" height="100px" alt="presentation" />
                        <div className="contactData">
                            <h4>{contact.name}</h4>
                            <small>{contact.email}</small> <br /><small> {contact.phone}</small>
                        </div>
                        {console.log(contact)}
                    </li>
                )}
            </ul>
        </div>
    )
}
export default LoaderDemo;