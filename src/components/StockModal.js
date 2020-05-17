import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Input, Tooltip } from 'antd';
import { RightOutlined, DollarOutlined, NumberOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { createStock } from '../actions';

const StockModal = (props) => {
    const [stockSymbol, setStockSymbol] = useState("");
    const [cps, setCPS] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const handleOk = e => {
        const newStock = { stockSymbol, cps: parseFloat(cps), quantity: parseFloat(quantity) }
        props.createStock(newStock);
        props.toggleModal();
        clearAll();
    }

    const clearAll = () => {
        setStockSymbol("");
        setCPS(null);
        setQuantity(null);
    }

    const handleCancel = e => {
        props.toggleModal();
        clearAll();
    };


    return (
        <div>
            <Modal
                title={props.title}
                visible={props.showModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Row>
                    <Col span={12} offset={6}>
                        <Input
                            allowClear
                            placeholder="Stock Symbol"
                            id="stockSymbol"
                            value={stockSymbol}
                            onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                            size="large"
                            prefix={
                                <Tooltip title="Cannot have special characters">
                                    <RightOutlined
                                        style={{
                                            color:
                                                "rgba(0,0,0,.65)",
                                        }}
                                    />
                                </Tooltip>
                            }
                            style={{ marginTop: "3.9%" }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Input
                            allowClear
                            placeholder="Stock Quantity"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            size="large"
                            prefix={
                                <Tooltip title="Cannot be less than 0">
                                    <NumberOutlined
                                        style={{
                                            color:
                                                "rgba(0,0,0,.65)",
                                        }}
                                    />
                                </Tooltip>
                            }
                            style={{ marginTop: "3.9%" }}
                        />
                    </Col>
                    <Col span={12}>
                        <Input
                            allowClear
                            placeholder="Cost Per Share"
                            id="cps"
                            value={cps}
                            onChange={(e) => setCPS(e.target.value)}
                            size="large"
                            prefix={
                                <Tooltip title="Cannot be less than 0">
                                    <DollarOutlined style={{
                                        color:
                                            "rgba(0,0,0,.65)",
                                    }} />
                                </Tooltip>
                            }
                            style={{ marginTop: "3.9%" }}
                        />
                    </Col>
                </Row>
            </Modal>
        </div>
    );
};


export default connect(null, {
    createStock
})(StockModal);