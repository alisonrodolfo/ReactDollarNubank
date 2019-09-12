/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
const API = 'https://economia.awesomeapi.com.br/all/USD-BRL';




import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Input,
  SearchBar,

} from 'react-native';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dolar: "1", ptax: "4", iof: "6.38", spread: "4", total: "0.00"};
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then((data) => {
      var dist = data.USD.ask;


                var cotacao = Math.round(parseFloat(dist.replace(',', '.').replace(/"/g, '')) * 100) / 100;
                this.setState({ ptax: cotacao.toString()});

                var dolar1 = this.state.dolar;
                this.state.dolar = dolar1.toString().replace(",", ".");

                var iof1 = this.state.iof;
                this.state.iof = iof1.toString().replace(",", ".");
                var spread1 = this.state.spread;;
                this.state.spread = spread1.toString().replace(",", ".");


                var sum1 = parseFloat(this.state.dolar) * parseFloat(this.state.ptax);
                var sum2 = (sum1/100) * parseFloat(this.state.spread);
                var sum3 = sum1 + sum2;
                var sum4 = (sum3/100) * parseFloat(this.state.iof);
                var sum5 = sum4 + sum3;
                this.setState({ total: sum5.toFixed(2).toString()});


    })
    .catch(console.log)

  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>

            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <Text style={styles.homeTitle}>Dólar Nubank</Text>
              <View style={styles.formGroup}>
              <View style={styles.sectionContainer}>

                <Text style={styles.sectionTitle}>Valor USD</Text>

                <TextInput style={styles.formControl} placeholder="USD" keyboardType="numeric"
                    onChangeText={text => onChangeText(text)}
                    value={this.state.dolar}
                     //value={dolar}
                    />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Valor Final R$</Text>
                <TextInput style={styles.formControl} placeholder="R$" keyboardType="numeric"
                      onChangeText={text => onChangeText(text)}
                    value={this.state.total}
                    />
              </View>



              </View>

              <View style={styles.vars}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Dólar PTAX</Text>
                <TextInput style={styles.varsInput} keyboardType="numeric"
                      onChangeText={text => onChangeText(text)}
                      value={this.state.ptax}
                    />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>IOF (%)</Text>
                <TextInput style={styles.varsInput} keyboardType="numeric"
                      onChangeText={text => onChangeText(text)}
                    value={this.state.iof}
                    />
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Spread (%)</Text>
                <TextInput style={styles.varsInput} keyboardType="numeric"
                      onChangeText={text => onChangeText(text)}
                    value={this.state.spread}
                    />
              </View>
              <Text style={styles.varsText} >Valor representa o montante total que virá na fatura, já incluído spread e IOF.</Text>
            </View>


            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );

  }



};






const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  formGroup: {
    marginBottom: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    },
  entradaDados:{
    flex: 1,
    flexDirection: 'row'
  },
  vars: {
    flex: 1,
    marginBottom: 30,
  },
  varsText: {
    textAlign: 'center'
  },
  varsInput: {
    height: 50,
    width: 150,
    borderColor: '#6E2B77',
    borderWidth: 1,
    borderRadius: 20,
  },
  formControl: {
    height: 50,
    width: 150,
    borderColor: '#6E2B77',
    borderWidth: 1,
    borderRadius: 20,

    },
  sectionContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  homeTitle: {
    fontSize: 36,
    fontWeight: '600',
    color: '#8a05be',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
