import EStyleSheet from "react-native-extended-stylesheet";

export const sharedColorConstants = {
    black: '#444444',
    blue: 'blue',
    greyColor: '#AAAAAA',
    generalTextColor: "black",
    whiteColor: "#FFFFFF",
    yellowColor: "#FFF296",
    voiletColor: "#9739E4",
    borderColor: "#DDDDDD",
    blackcolor: "black",
    redColor: "#ff8066",
    overallBackgroundcolor: "#fcfcfc",
    calendarBackgroundColor: "#FFF296",
    chatMessageYellowBackgroundColor: "#FFEA5B"
}

export const sharedAlignmentConstants = {
    borderWidth: '0.05rem',
    margin: '0.3rem',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    normalText: '0.88rem',
    mediumText: '1.1rem',
    normalfontWeight: '400',
    mediumFontWeight: '500',
    largeFontWeight: '600'
}

const sharedStyles = EStyleSheet.create({

    headerText: {
        fontSize: '1.1rem',
        color: sharedColorConstants.black,
        fontWeight: '600'
    },

    subHeaderText: {
        fontSize: '0.88rem',
        color: sharedColorConstants.black,
        fontWeight: '700',
    },

    subHeaderHighlightedText: {
        fontSize: '0.88rem',
        color: sharedColorConstants.voiletColor,
        fontWeight: '600'
    },

    text: {
        fontSize: '0.88rem',
        color: sharedColorConstants.black,
        fontWeight: '400',
    },
    focusText: {
        fontSize: '0.88rem',
        color: sharedColorConstants.black,
        fontWeight: '700',
    },

    textOverVioletSubHeading: {
        fontSize: '0.88rem',
        color: sharedColorConstants.whiteColor,
        fontWeight: '700'
    },
    textOverVioletcontext: {
        fontSize: '0.88rem',
        color: sharedColorConstants.whiteColor,
        fontWeight: '400'
    },
    textOverVioletHeading: {
        fontSize: '1.65rem',
        color: sharedColorConstants.whiteColor,
        fontWeight: '400'
    },
    textGreyed: {
        fontSize: '0.88rem',
        color: sharedColorConstants.greyColor,
        fontWeight: '400'
    },

    textSmall: {
        fontSize: '0.715rem',
        color: sharedColorConstants.greyColor,
        fontWeight: '400'
    },

    textLarge: {
        fontSize: '1.32rem',
        color: sharedColorConstants.black,
        fontWeight: '700'
    },

    cardContainer: {
        borderRadius: '1rem',
        elevation: 3,
        margin: '1rem',
        padding: "1rem",
        marginBottom: "0.2rem",
        backgroundColor: "#FFFFFF",
    },

    textStar: {
        color: 'red',
        fontSize: "0.9rem",
        marginTop: '0.5rem',
    },

    textLabel: {
        fontSize: '0.88rem',
        color: sharedColorConstants.black,
        fontWeight: '400',
        marginTop: '0.5rem',
    },

    textInputView: {
        paddingVertical: '0.4rem',
        fontSize: '0.88rem',
        borderColor: sharedColorConstants.greyColor,
        borderWidth: '0.05rem',
        flexDirection: 'row',
        borderRadius: '0.6rem',
        color: sharedColorConstants.black,
        marginTop: '0.5rem',
        marginBottom: '0.25rem',
    },
    textView: {
        flexDirection: 'row',
        paddingTop: '0.4rem',
        flexWrap: 'wrap',
        color: sharedColorConstants.black,
    },
    textBox: {
        marginTop: '0.5rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        borderColor: 'black',
        borderWidth: '0.05rem',
        flexDirection: 'row',
        flex: 1,
        borderRadius: '0.6rem',
        fontSize: "1rem",
        color: "black",
        minHeight: "4rem",
        maxHeight: "14rem"
    },

    validationText: {
        color: 'red',
        fontSize: "0.8rem",
    },

    timeInputView: {
        borderWidth: "0.08rem",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "1rem",
        borderColor: sharedColorConstants.greyColor
    },

    multiLineTextInputView: {
        borderColor: sharedColorConstants.greyColor,
        borderWidth: '0.05rem',
        flexDirection: 'row',
        flex: 1,
        borderRadius: '0.6rem',
        fontSize: '0.88rem',
        color: sharedColorConstants.black,
        minHeight: "4rem",
        maxHeight: '14rem',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        paddingLeft: '0.5rem',
    },

    dateView: {
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        borderWidth: "0.05rem",
        borderRadius: '0.6rem',
        borderColor: sharedColorConstants.greyColor,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    dateText: {
        color: sharedColorConstants.black,
        padding: "0.6rem",
        fontSize: '0.88rem'
    },

    dateIconsView: {
        flexDirection: "row",
        marginRight: "0.7rem",
        alignItems: 'center'
    },

    chatSuggestedText: {
        borderWidth: sharedAlignmentConstants.borderWidth,
        padding: sharedAlignmentConstants.padding,
        margin: sharedAlignmentConstants.margin,
        borderRadius: sharedAlignmentConstants.borderRadius,
        borderColor: sharedColorConstants.greyColor,
        color: sharedColorConstants.blackcolor
    },

    textTranform: {
        textTransform: 'capitalize'
    },

    buttonTextoverViolet: {
        textAlign: 'center',
        fontSize: '1.1rem',
        color: "#FFFFFF",
        fontWeight: '500'
    },

    buttonTextoverYellow: {
        textAlign: 'center',
        fontSize: '1.1rem',
        color: sharedColorConstants.black,
        fontWeight: '500'
    },
    yellowButton: {
        justifyContent: 'center',
        padding: '0.7rem',
        alignItems: 'center',
        borderRadius: '0.5rem',
        margin: '1.3rem',
        backgroundColor: sharedColorConstants.yellowColor,
    },
    violetButton: {
        backgroundColor: sharedColorConstants.voiletColor,
        justifyContent: 'center',
        padding: '0.7rem',
        alignItems: 'center',
        borderRadius: '0.5rem',
        margin: '1.3rem',
        marginTop: '1rem'
    },
    starView: {
        flexDirection: 'row',
    },

    // model popUp styles

    popUpView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "90%",
        width: "100%"
    },
    popUpCardView: {
        backgroundColor: '#fff',
        padding: 10,
        width: "100%",
        borderRadius: 10
    },
    hyperLink: {
        textDecorationLine: 'underline',
        color: sharedColorConstants.blue,
        fontSize: '0.88rem',
        fontWeight: '400',
    }
})

export default sharedStyles