import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validation";
import * as firebase from "firebase";
import Loading from "../Loading";
import { withNavigation } from "react-navigation";

function RegisterForm(props) {
    const { toastRef, navigation } = props;

    const [hidePassword, setHidePassword] = useState(true);
    const [repeatHidePassword, setRepeatHidePassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);

    const register = async () => {
        setIsVisibleLoading(true);

        if (!email || !password || !repeatPassword) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else {
            if (!validateEmail(email)) {
                toastRef.current.show("El email no es válido");
            } else {
                if(password !== repeatPassword) {
                    toastRef.current.show("Las contraseñas no son iguales");
                } else {
                    await firebase 
                        .auth()
                        .createUserWithEmailAndPassword(email,password)
                        .then(() => {
                            navigation.navigate("MyAccount");
                        })
                        .catch(() => {
                            toastRef.current.show("Error al registrar, inténtelo más tarde");
                        })
                }
            }
        }

        setIsVisibleLoading(false);
    }

    return (
        <View style={styles.formContainer} >
            <Input
                placeholder="Correo electrónico"
                containerStyle={styles.inputForm}
                onChange={e => setEmail(e.nativeEvent.text)}
                autoCapitalize="none"
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                onChange={e => setPassword(e.nativeEvent.text)}
                password={true}
                secureTextEntry={hidePassword}
                autoCapitalize="none"
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                }
            />
            <Input
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputForm}
                onChange={e => setRepeatPassword(e.nativeEvent.text)}
                password={true}
                secureTextEntry={repeatHidePassword}
                autoCapitalize="none"
                rightIcon={
                    <Icon
                        type="material-community"
                        name={repeatHidePassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setRepeatHidePassword(!repeatHidePassword)}
                    />
                }
            />
            <Button 
                title="Registrarse" 
                containerStyle={styles.boton} 
                buttonStyle={styles.botonEstilo} 
                onPress={() => register()}
            />
            <Loading text="Registrando" isVisible={isVisibleLoading} />
        </View>
    )
};

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    iconRight: {
        color: "#c1c1c1"
    },
    boton: {
        marginTop: 20,
        width: "95%"
    },
    botonEstilo: {
        backgroundColor: "#00a680"
    }
})