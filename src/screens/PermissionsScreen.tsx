import React, { useContext } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { PermissionsContext } from '../context/PermissionsContext';


export const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext( PermissionsContext );


    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Es necesario el uso del GPS para usar esta aplicación </Text>

            <Button
                title="Permission"
                onPress={ askLocationPermission }
            />

            <Text style={{ color:'#000', marginTop: 20 }}>
                { JSON.stringify( permissions, null, 5 ) }
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color:'#000',
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    }
});
