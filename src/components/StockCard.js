import React, { useState, useEffect } from 'react';
import { Card, Avatar, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { deleteStock } from '../actions/index';


const { Meta } = Card;
const greenPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEUA/wFDWfA+AAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC';
const redPic = 'https://kitchenaid-h.assetsadobe.com/is/image/content/dam/business-unit/global-assets/color-swatches/Images/H1.png';

const StockCard = (props) => {
    return (
        <Card
            style={{ marginLeft: "5%", marginRight: "5%", borderColor: "#111111", background: "#111111", color: "#FAFAFA" }}
            cover={
                <img
                    alt="example"
                    style={{ height: "0.5rem" }}
                    src={props.profit < 0 ? redPic : greenPic}
                />
            }
            actions={[
                // <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" onClick={() => props.deleteStock(props.stock)} />,
            ]}
        >
            <Meta
                avatar={<Avatar style={{ float: 'right' }} src={props.stock.companyLogo} />}
                title={<h1 style={{ textAlign: 'left', color: 'white' }}>{props.stock.stockSymbol}</h1>}
                description={props.description}
            />
            <h1 style={{ marginTop: "15%", textAlign: "center", color: "#FAFAFA" }}> {props.stock.companyName} </h1>
            <h2 style={props.stock.profit < 0 ? { color: '#F60300', marginTop: '14%', textAlign: 'center' } : { color: 'rgba(0,248,3, 1)', marginTop: '14%', textAlign: 'center' }}> ${props.stock.profit}</h2>
            <p>
                Current Price PS: ${props.stock.cpps}
            </p>
            <p>
                Cost PS: ${props.stock.cps}
            </p>
            <p>
                Quantity: {props.stock.quantity}
            </p>
            <p>
                Current Equity: ${props.stock.currentEquity}
            </p>
        </Card >
    );
};


export default connect(null, { deleteStock })(StockCard);