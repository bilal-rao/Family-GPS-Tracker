import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import store from './../store/index.js';
import MiddlewareCircle from './../store/middleWares/middlewareCircle.js';
import { Spinner } from 'native-base';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

function mapStateToProps(state) {
    return {
        circleData: state.reducerCircle,
    };
}
class Groups extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }
    componentWillMount() {
        store.dispatch(MiddlewareCircle.asyncCircle());
    }

    componentWillReceiveProps(props) {
        console.log(props);
        this.setState({
            data: props.circleData,
        })
    }

    createGroup = () => {
        Actions.CreateGroup();
    }

    list = (data) => {
        console.log(data)
        Actions.Members({ data: data });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.data[0] ?
                    <ScrollView style={styles.scrollContainer}>
                        {this.state.data.map((val, key) => (
                            <View style={styles.list}>
                                <TouchableOpacity onPress={() => this.list(val)}>
                                    <Text style={styles.friendList}>{val.gName}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <TouchableOpacity style={styles.createGroup} onPress={() => this.createGroup()} >
                            <Text style={{  color: "#fff"}}>Create Group</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    : <View><Spinner /></View>}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => this.createGroup()} >
                        <Text style={styles.textInput}>Create Group</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps)(Groups)
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    createGroup: {
        left:100,height:60,width:150,position:'relative',borderRadius:10, backgroundColor: '#38b759',padding:20, color: "#fff", marginTop: 40 
    },
    list: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'
    },
    header: {
        backgroundColor: '#38b759',
        height: 60
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    friendList: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#38b759'
    },
    inviteList: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    inviteListText: {
        color: 'white'
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        paddingTop: 30,
        backgroundColor: '#38b759',
        borderTopWidth: 5,
        borderTopColor: '#ededed',
    },
    footer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center'
    },
});
