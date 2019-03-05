import React, { Component } from 'react';
import Firebase from '../firebase';

const Context = React.createContext({});
const AuthenticationContextProvider = Context.Provider;
const AuthenticationContextConsumer = Context.Consumer;

export {AuthenticationContextProvider, AuthenticationContextConsumer};
