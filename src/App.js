import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import visa from './visa.png';
import master from './master.png';
import american from './american.png';
import chip from './chip.png';


class App extends Component {

	constructor(){
		super();
		this.state= {
			value:"",
			isVisa:null,
			isMaster:null,
			isAmerican:null,
			result:null,
		}
		this.handleOnChange = this.handleOnChange.bind(this);
		this.validate = this.validate.bind(this);
		this.luhnCheck = this.luhnCheck.bind(this);
		this.reset = this.reset.bind(this)
		this.checkCardType = this.checkCardType.bind(this);
	}

	reset(){
		this.setState({
			value:"",
			isVisa:null,
			isMaster:null,
			isAmerican:null,
			result:null,
		});
	}

	checkCardType(e){
		let value =e.target.value;
		if(e.target.value.length===1 && e.target.value === "4"){
			console.log("visa");
			this.setState({
				value,
				isVisa:true
			});
		}
		else if(e.target.value.length === 2){
			if((e.target.value === "34" || e.target.value === "37")){
				console.log("isAmerican")
				this.setState({
					value,
					isAmerican:true
				});
			}
			else if((e.target.value ==="51" || e.target.value === "52" || e.target.value === "53"|| e.target.value === "54"|| e.target.value === "55")){
				console.log("isMaster")
				this.setState({
					value,
					isMaster:true
				});
			}
			else {
				this.setState({value});	
			}
		}
		else{
			this.setState({value});
		}
	}

	handleOnChange(e){
		e.preventDefault();
		
		let value =e.target.value;
		if(e.target.value.length=== 4 || e.target.value.length=== 9 || e.target.value.length === 14  ){
			value += '-';
		}
		if(e.target.value.length<3){
			this.checkCardType(e);
		}
		else{
			this.setState({value})
		}
	}

	luhnCheck(num){
		num = num.split("").map(item=>{
			return Number(item);
		});
		
		let len = num.length-1;
		let isOdd = false;
		let sum = 0;
		//console.log(typeof num[0]);
		for(let i=len;i>=0;i--){
			if(isOdd){
		//		console.log("odd->"+num[i])
				let temp = num[i];
				temp+=temp;
				if(temp>9){
					temp-=9;
				}
				sum+=temp;
			}
			else{
		//		console.log("even->"+num[i])
				sum+=num[i];
			}
			isOdd=!isOdd;
		//	console.log("sun->"+sum)
		}

		if(sum%10 === 0){
			return true;
		}
		return false;
		//console.log(sum);
	}
	validate(){
		let num = this.state.value;
		num = num.split("-");
		num = num.join("");

		if(num.length=== 0){
			alert("Please enter card number");
		}
		else{
			let result = this.luhnCheck(num);
		this.setState({result});	
		}

		//alert(num);
		
	}


  render() {
  	console.log(this.state)
  	let logo ;
  	let resultDisplay;
  	if(this.state.isVisa){
  		logo = <img src={visa} className="logo" alt="visa-logo"/>
  		console.log('a');
  	}
  	else if(this.state.isMaster){
  		logo = <img src={master} className="logo" alt="mastercard-logo"/>
  	}
  	else if(this.state.isAmerican){
  		logo = <img src={american} className="logo" alt="americancard-logo"/>
  	}

  	if (this.state.result){
  		resultDisplay = <div className="alert alert-success centre" role="alert"> Your Credit Card is Valid </div>
  	}
  	else if (this.state.result === false){
  		resultDisplay = <div className="alert alert-danger" role="alert"> Your Credit Card is Not Valid</div>
  	}

    return (
      <div className="container-fluid">
      		<div className="row-fluid">
      			<nav className="navbar navbar-dark bg-dark">
      				<a className="navbar-brand" href="#">Card Validator</a>
      			</nav>
      		</div>
      		<div className="row">
      			<div className="col-md-4 credit-card">
      					
				
					<div className="row credit-card-row">

						<div className="col-md-8 bank-logo">
							<span className="bank-name">
								XYZ Bank
							</span>

						
						</div>
						<div className="col">{logo}</div>
					</div>

					
					<div className="row credit-card-row">
						<div className="col-md-8">
							<input type="tel" 
							maxLength="19" 
							placeholder="Card Number" 
							pattern="\d*" 
							className="cc-number" 
							onChange={this.handleOnChange}
							value={this.state.value}/>
							</div>
						<div className="col-md-2">
							<img src={chip} className="chip" alt="chip"/>
						</div>
					</div>
					<div className="row credit-card-row">
						<div className="col">
							Valid Till : MM : YYYY
						</div>
					</div>
					<div className="row credit-card-row">
						<div className="col">
							JOHN DOE
						</div>
					</div>
      			</div>
      			
      		</div>
      		<div className="row">
      			<div className="col-md-4">
      				<div className="row">
      					<div className="col">
      						<button className="btn btn-success btn-block" onClick={this.validate}>Valid Card</button>
      					</div>
      					<div className="col">
      						<button className="btn btn-danger btn-block" onClick={this.reset}>Reset</button>
      					</div>
      				</div>		
      			</div>
      		</div>
      		<div className="row">
      			<div className="col-md-4">
      					{resultDisplay}
      			</div>
      		</div>
      		

      </div>
    );
  }
}

export default App;
