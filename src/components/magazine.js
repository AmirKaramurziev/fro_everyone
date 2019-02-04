import React from "react";
import styles from "./style.css";
class Magazine extends React.Component{
    constructor(props){
        super(props);
        this.state={
            products:[{
                name: "apples",
                price: 100,
                amount: 10,
                buyed_by_current: 0,
            },
            {
                name: "cherry",
                price: 60,
                amount: 20,
                buyed_by_current: 0,
            },
            {
                name: "cheese",
                price: 200,
                amount: 10,
                buyed_by_current: 0,
            }],
            buy_products:[],
            current_money:10000,
            temp:null,
            tenpAmount: 0,
            tempProductText: "",
            deemed: {
                names: [],
                allPrice: 0,
                allAmount: 0
            },
            
            

            // basket:{
            //     products:["amir"],
            //     amount:"",
            //     price:""
            // },
            // money: 2000,
            // a:''
        }
    }
    
    changeAmount(e){
        this.setState({tenpAmount:e.target.value});
    }
    iWantToBuy(e, product){
        
        this.setState({temp:product});
    }
    deem(e){
        var products = this.state.products;
        var tempAllAmount = null;
        var multy = null;
        products.map((index)=>{
            tempAllAmount = tempAllAmount + index.buyed_by_current;

            multy = multy + index.buyed_by_current * index.price;
        })
        console.log(tempAllAmount);
        console.log(multy);
        this.state.buy_products.map((index)=>{
            this.state.deemed.names.push(index);
        })
        
        this.setState({})
    }
    PutProductText(t){
        this.setState({tempProductText:t.target.value});
    }
    PutDown(e){
        var products = this.state.products;
        products.map((index)=>{
            if(index.name === this.state.tempProductText){
                index.buyed_by_current = index.buyed_by_current - 1;
                index.amount = index.amount + 1;
            }
        })
        this.setState({products});
    }
    okey(e){
        localStorage.setItem("product_temp_seted", this.state.temp.name);
        var current_money = this.state.current_money;
        var product_temp = this.state.temp.price;
        var found = false;
        this.state.buy_products.map((index)=>{
            if(index === this.state.temp.name){
                found = true;
            }
        })

        // if(this.state.temp.name === "apples"){
        //     var bought = localStorage.getItem("magazine_apple");
        //     if(bought){
        //         bought = bought * 1 + this.state.tenpAmount * 1;
        //     } else{
        //         bought = this.state.tenpAmount * 1
        //     }
        //     localStorage.setItem("magazine_apple", bought);
        //     console.log(bought);
        // }
        
        if(found === false){
            this.state.buy_products.unshift(this.state.temp.name);
        }
        var tempAmo = this.state.tenpAmount;
        var products=this.state.products;
        var current_money_product_temp = null;
        products.map((index)=>{
            if(this.state.temp.name === index.name){
                index.amount= index.amount - this.state.tenpAmount;
                if(this.state.tenpAmount === 0){
                    index.buyed_by_current = index.buyed_by_current + 1;
                    index.amount = index.amount - 1;
                    current_money_product_temp = current_money - product_temp;
                } else{
                    index.buyed_by_current = index.buyed_by_current + tempAmo*1;
                    current_money_product_temp = current_money - index.price * tempAmo;
                }
            }
            if(index.name === this.state.temp.name){
                var bought = localStorage.getItem("magazine_apple");
                if(bought){
                    bought = bought * 1 + this.state.tenpAmount * 1;
                } else{
                    bought = this.state.tenpAmount * 1
                }
                localStorage.setItem("magazine_apple", bought);
                console.log(bought);
            }
        })
        
        
        
        this.setState({products});
        console.log(this.state.tenpAmount);
        this.setState({temp:null});
        this.setState({current_money:current_money_product_temp});

        if(this.state.tenpAmount === tempAmo){
            this.setState({tenpAmount:""});

        }
    }
    // setToBaApple(e){
    //     var applePrice = this.state.products[0].price;
    //     var yourMoney = this.state.money;
    //     var allPrice = yourMoney - applePrice;
    //     this.setState({money:allPrice});

    //     var ProductsAmount = this.state.products[0].amount - this.state.a;
    //     if(ProductsAmount >= 0){
    //         this.setState({amount:ProductsAmount}); 
    //     } else{
    //         console.log("we need more apple")
    //     }
    //     console.log(this.state.products[0].amount);
    // }
    // inputApp(e){
    //     var a = this.state.a;
    //     this.setState({a:e.target.value});
    // }

    componentDidMount(){
        let temp_getted = localStorage.getItem("product_temp_seted");
        console.log(temp_getted);
        let aplle_amount = localStorage.getItem("magazine_apple")
        console.log("A" * 1)
        var prod = this.state.products;
        prod.map((index)=>{
            if(index.name === temp_getted){
                index.amount = index.amount - aplle_amount;
            }
        })
        this.setState({prod});
    }
    render(){
        return(
            <div className={styles.mainComponent}>
                {this.state.products.map((product)=>{
                    return(
                        <div className={styles.blueClass}>
                            {product.name+" || Price:  "}
                            {product.price+" Amount:  "}
                            {product.amount}
                            <button onClick={(e)=>this.iWantToBuy(e, product)}>GET THIS</button>
                            
                        </div>
                    )
                })}
                {this.state.temp? <div>
                    HOU MUCH {this.state.temp.name} YOU WANT? <br/>
                    <input type="number" max="20" min="0" onChange={(e)=>this.changeAmount(e)} value={this.state.tenpAmount}></input> <br/>
                    <button onClick={(e)=>this.okey(e)}>OK</button>
                    </div>
                  :
                null}
                <div className="buy_current">
                    <div>
                        {this.state.buy_products.map((temp)=>{
                            return(
                                <div>
                                    {temp}
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        {this.state.products.map((amount)=>{
                            return(
                                <div>
                                    {amount.buyed_by_current!==0 ? amount.buyed_by_current:null}
                                </div>
                            )
                        })}
                    </div>
                </div>



                
                



                <div>
                    {/* <div className="secret-container">
                        <p className="secret-shop">
                            welcome to the secret shop
                        </p>
                    </div>
                    <p className="we-have">what we have</p>
                    <p className="products">products</p>
                    <div className="items-block">
                    
                        <div className="blocks">
                            NAME:{this.state.products[0].name} <br/>
                            PRICE:{this.state.products[0].price} <br/>
                            AMOUNT:{this.state.products[0].amount} <br/>
                            <input className="inp" onChange={(e)=>this.inputApp(e)}></input>
                            <button onClick={(e)=>this.setToBaApple(e)}>Get Apple</button>
                        </div>
                        <div className="blocks">
                            NAME:{this.state.products[1].name} <br/>
                            PRICE:{this.state.products[1].price} <br/>
                            AMOUNT:{this.state.products[1].amount} <br/>
                            <button onClick={(e)=>this.setToBaApple(e)}>Get Cherry</button>
                        </div>
                        <div className="blocks">
                            NAME:{this.state.products[2].name} <br/>
                            PRICE:{this.state.products[2].price} <br/>
                            AMOUNT:{this.state.products[2].amount} <br/>
                            <button onClick={(e)=>this.setToBaApple(e)}>Get Cheese</button>
                        </div>
                    </div>
                    <div className="basket">
                        your basket
                        <div className="basket-items">
                            {this.state.basket.amount}

                        </div>
                        <div className="money">
                            your money = {this.state.money}
                        </div>
                    </div> */}
                </div>
                your money {this.state.current_money}
                <div>
                    <input type="text" onChange={(t)=>this.PutProductText(t)}></input>
                    <button onClick={(e)=>this.PutDown(e)}>put down</button>
                </div>
                <button onClick={(e)=>this.deem(e)}>
                    deem all
                </button>
                {this.state.deemed.names.map((index)=>{
                    return(
                        <div>
                            {index}
                        </div>
                    )
                })}
                {this.state.deemed.allAmount !==0 ? this.state.deemed.allAmount : null}
                {this.state.deemed.allPrice !==0 ? this.state.deemed.allPrice : null}
            </div>
        )
    }
}
export default Magazine;