import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Clipboard,
  Share,
  BackHandler,
  FlatList,
  ActivityIndicator
} from 'react-native';
// import { QRCode } from 'react-native-custom-qr-codes';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import { TransBar, TopHeader, NumberPad, BottomButton } from '../extension/AppComponents';
import { Color, Config, numberWithCommas, sendToast } from '../extension/AppInit';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IoIcon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import * as Animatable from 'react-native-animatable';
import RiveIcon from '../extension/RiveIcon'
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import Ripple from 'react-native-material-ripple';
import AccountInfoContext from '../context/AccountInfoContext';
import { observer, inject } from 'mobx-react';
import intl from 'react-intl-universal';

@inject('walletStore')
@inject('settingStore')
@observer
class WalletInvitation extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedWallet:{},
    }
  }

  componentDidMount(){
    const {params} = this.props.navigation.state;
    this.setState({
      selectedWallet:params.selectedWallet
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TransBar />
        <LinearGradient colors={Color.gradientColor} style={Config.linearGradient}>
          <TopHeader {...this.props} title={intl.get('ShareWallet.WALLETINVITATION')} 
            isclosebtn={true}/>
            <Text style={[styles.whitelabel,{alignSelf:'center',marginTop:30,marginBottom:20}]}>{intl.get('ShareWallet.WalletInvitation.Msg')}</Text>
            <LinearGradient colors={['#4954AE', '#4A47A9', '#393B73']} style={styles.qrcontainer}>
              <View style={styles.qrcodectn}>
                <QRCode value={this.state.selectedWallet.publicaddress} size={100} color={"#4954AE"} />
              </View>
            </LinearGradient>
            <View style={styles.inputfieldctn}>
              <Text style={styles.inputfield} ellipsizeMode={'tail'} numberOfLines={1}>{this.state.selectedWallet.publicaddress}</Text>
              <TouchableOpacity activeOpacity={1} onPress={()=> this.props.settingStore.copytoclipboard(this.state.selectedWallet.publicaddress)}>
                <RiveIcon name="copy" color={"#fff"} size={22} />
              </TouchableOpacity>
            </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

export default WalletInvitation;

const styles = StyleSheet.create({
  copayeriteminner:{
    flexDirection:'row',
    alignItems:'center'
  },
  copayeritemctn:{
    marginTop:10
  },
  leftright:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row'
  },
  copayerctn:{
    backgroundColor:Color.rowblue,
    borderRadius:10,
    padding:20,
    marginTop:10,
    marginHorizontal:20
  },
  inputfieldctn:{
    marginHorizontal:20,
    marginTop:20,
    // width:'100%',
    maxWidth:400,
    backgroundColor:Color.rowblue,
    borderRadius:10,
    paddingHorizontal:20,
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    minHeight:55,
  },
  inputfield:{
    color:"#fff",
    fontFamily:Config.regulartt,
    fontSize:14,
    width:'80%'
  },
  flexgrow:{
    flexGrow:1,
    flexShrink:1
  },
  centerlize:{
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center"
  },
  exchangebtn:{
    position:'absolute',
    right:20
  },
  receivenumpad:{
    alignSelf:'center',
    marginBottom:20
  },
  receiveamountprice:{
    color:Color.textgrey,
    fontSize:17,
    marginTop:10,
    fontFamily:Config.regulartt
  },
  receiveamountcoin:{
    color:'#fff',
    fontSize:30,
    fontFamily:Config.boldtt,
    marginTop:10
  },
  receiveamountctn:{
    backgroundColor:Color.rowblue,
    borderRadius:20,
    padding:25,
    width:Config.winwidth * 0.8,
    maxWidth:350,
    // alignSelf:'center'
    justifyContent:'center',
    alignItems:'center',
    marginTop:20
  },
  setamountctn:{
    flexGrow:1,
    flexShrink:1,
    // justifyContent:'space-between',
    alignItems:'center'
  },
  indicatorchild:{
    flex:1
  },
  receivectn:{
    justifyContent:'space-between',
    flexDirection:'column',
    // backgroundColor:'#ccc',
    flex:1
  },
  bottomnavinner:{
    alignItems:'center',
    justifyContent:'center'
  },
  whitelabel:{
    color:'#fff',
    marginTop:10,
    fontFamily:Config.regulartt
  },
  bottomnavbtn:{
    backgroundColor:'rgba(56,52,216,0.3)',
    height:50,
    width:50,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center'
  },
  bottomnavbtnctn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingBottom:25,
    width:Config.winwidth * 0.6,
    alignSelf:'center'
  },
  addresskey:{
    color:Color.textgrey,
    fontSize:14,
    width:220,
    paddingTop:20,
    fontFamily:Config.regulartt
  },
  qrcodectn:{
    backgroundColor:"#fff",
    padding:12
  },
  qrcontainer:{
    padding:12,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    alignSelf:'center',
    // marginTop:50
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff',
  }
});
