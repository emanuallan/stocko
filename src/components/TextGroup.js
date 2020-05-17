import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const TextGroup = (props) => {
    const [totalEquity, setTotalEquity] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);

    useEffect(() => {
        if (props.newStock) {
            setTotalEquity(Number((totalEquity + props.newStock.currentEquity).toFixed(2)));
            setTotalProfit(Number((totalProfit + props.newStock.profit).toFixed(2)));

        }
    }, [props.newStock])


    return (
        <div>
            <h1 style={{ color: 'white' }} > ${totalEquity} </h1>
            <h3 style={totalProfit < 0 ? { color: '#F60300' } : { color: 'rgba(0,248,3, 1)' }} > ${totalProfit} </h3>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        newStock: state.stocks.stock
    }
}

export default connect(mapStateToProps)(TextGroup);