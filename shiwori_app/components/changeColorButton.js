import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';

/**
 * 押すとボタンの色とタイトルが変わるボタン
 * style,title,pushed_title,color,pushed_colorを指定してください。
 */
class changeColorButton extends React.Component {
    state = { title :this.props.title,color:this.props.color,pushed:false}
    _onPress(title,changed_title,color,pushedcolor){
        if(this.state.pushed){
            this.setState({pushed:false});
            this.setState({title:title});
            this.setState({color:color});
        }else{
            this.setState({pushed:true})
            this.setState({title:changed_title})
            this.setState({color:pushedcolor});
        }
    }
    render() {
        let style = this.props.style;
        if(style==undefined)style ={}
        let title = "title";
        let pushed_title = "東京高専";
        let color = this.props.color;
        let pushed_color  = this.props.pushed_color; 
        return (
        <View>
            <Button
                style = {style}
                onPress={()=>this._onPress(title,pushed_title,color,pushed_color)}
                title= "タイトル"
                color={this.state.color}
            />
        </View>
        );
    }
}
export default changeColorButton;