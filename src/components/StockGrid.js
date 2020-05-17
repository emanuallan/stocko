import React, { useState, useEffect } from 'react';
import StockCard from './StockCard';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';



const StockGrid = (props) => {
    // const [resource, setResource] = useState('posts');     //explanation below (breakdown)
    const [stockArr, setStockArr] = useState([]);

    useEffect(() => {
        if (props.newStock) {
            console.log(props.newStock);
            setStockArr([...stockArr, props.newStock]) // function gets called every time it gets rendered to screen and gets updated
        }
    }, [props.newStock]);

    useEffect(() => {
        if (props.delStock) {
            console.log(props.newStock);
            setStockArr(stockArr.filter((stock) => stock.stockSymbol !== props.delStock.stockSymbol));
        }
    }, [props.delStock]);

    return (
        <div>
            <Row style={{ padding: "4% 4% 4% 4%", justifyContent: "center" }}>
                {stockArr.map(stock => {
                    return <Col span={8}>
                        <StockCard
                            stock={stock}
                        />
                    </Col>
                })}
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        newStock: state.stocks.stock,
        delStock: state.stocks.delStock
    }
}

export default connect(mapStateToProps)(StockGrid);