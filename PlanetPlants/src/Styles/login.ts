import EStyleSheet from 'react-native-extended-stylesheet';

const LoginStyles = EStyleSheet.create({

    container: {
        margin: '1rem'
    },
    loginText: {
        fontSize: '1.3rem',
        color: "red",
        fontWeight: '600',
    },
    text: {
        fontSize: '0.88rem',
        color: "black",
        fontWeight: '400',
    },

    bottomGap: {
        marginBottom: "0.5rem"
    },

    topGap: {
        marginTop: '1rem'
    },

    textInputView: {
        paddingVertical: '0.4rem',
        fontSize: '0.88rem',
        borderColor: "grey",
        borderWidth: '0.05rem',
        flexDirection: 'row',
        borderRadius: '0.6rem',
        color: "black",
        marginTop: '0.5rem',
        marginBottom: '0.25rem',
    },

})

export default LoginStyles;