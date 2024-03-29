import React, { createContext, useState } from "react";

import api from '../services/api';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigation = useNavigation();

    async function signUp(email, password, nome) {
        // teste de funcionalidade
        //console.log('email digitado: ', email);
        setLoadingAuth(true);

        try {
            const response = await api.post('/users', {
                name: nome,
                password: password,
                email: email,
            })
            setLoadingAuth(false);

            navigation.goBack();

        } catch (error) {
            console.log('ERRO AO CADASTRAR', error);
            setLoadingAuth(false);
        }
    }

    async function signIn(email, password){
        console.log("Email Test: ", email);
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
