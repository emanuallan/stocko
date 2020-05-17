
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from 'react-redux';
import { Row, Col, Button, Switch } from 'antd';
import { PlusCircleOutlined, MonitorOutlined } from '@ant-design/icons';
import StockModal from './StockModal';
import { deleteStock } from '../actions';
import 'chartjs-plugin-datalabels';

import '../index.css';

const StockGraph = (props) => {
    const [stockArr, setStockArr] = useState([]);
    const [showModal, toggleModal] = useState(false);
    const [equityView, setEquityView] = useState(false);

    useEffect(() => {
        if (props.newStock) {
            console.log(props.newStock);
            setStockArr([...stockArr, props.newStock]) // function gets called every time it gets rendered to screen and gets updated
        }
    }, [props.newStock]);

    useEffect(() => {
        if (props.delStock) {
            console.log(props.newStock);
            setStockArr(stockArr.filter((stock) => stock.stockSymbol !== props.delStock));
        }
    }, [props.delStock]);

    let totalEquity = 0;
    let totalProfit = 0;

    for (let i = 0; i < stockArr.length; i++) {
        let stock = stockArr[i];
        totalProfit += Math.abs(stock.profit);
        totalEquity += stock.currentEquity;
    }

    let data = {};
    let options = {}

    if (equityView) {
        data = {
            labels: stockArr.map((stock) => stock.companyName),
            datasets: [
                {
                    backgroundColor: stockArr.map((stock) => stock.profit < 0 ? 'rgb(247, 101, 118, 0.4)' : 'rgba(75,192,192,0.4)'),
                    borderColor: stockArr.map((stock) => stock.profit < 0 ? 'rgb(246,3,0)' : 'rgba(0,248,3, 1)'),
                    data: stockArr.map((stock) => stock.currentEquity)
                }
            ]
        };
        options = {
            legend: {
                position: 'right',
                labels: {
                    fontSize: 14,
                    fontColor: '#fff'
                }
            },
            plugins: {
                datalabels: {
                    color: 'white',
                    labels: {
                        title: {
                            color: 'white',
                        },
                    },
                    formatter: function (value, context) {
                        const perc = Number(((value / totalEquity) * 100).toFixed(2)) + '%';
                        return context.chart.data.labels[context.dataIndex] + " : " + perc;
                    }
                }
            }
        };

    } else {
        data = {
            labels: stockArr.map((stock) => stock.companyName),
            datasets: [
                {
                    backgroundColor: stockArr.map((stock) => stock.profit < 0 ? 'rgb(247, 101, 118, 0.4)' : 'rgba(75,192,192,0.4)'),
                    borderColor: stockArr.map((stock) => stock.profit < 0 ? 'rgb(246,3,0)' : 'rgba(0,248,3, 1)'),
                    data: stockArr.map((stock) => stock.profit),
                }
            ],
        };

        options = {
            legend: {
                position: 'left',
                labels: {
                    fontSize: 16,
                    fontColor: '#fff'
                }
            },
            plugins: {
                datalabels: {
                    color: 'white',
                    labels: {
                        title: {
                            color: 'white',
                            font: {
                                weight: 'bold',
                            }
                        },
                    },
                    formatter: function (value, context) {
                        const perc = Number(((value / totalProfit) * 100).toFixed(2)) + '%';
                        return context.chart.data.labels[context.dataIndex] + " : " + perc;
                    }
                }
            }
        };
    }

    const switchView = () => {
        setEquityView(!equityView);
    }

    const toggleModalHelper = () => {
        toggleModal(!showModal);
    }


    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                {equityView ? <h2 style={{ color: "white" }}>Equity Pie Chart </h2> : <h2 style={{ color: "white" }}> Profit Pie Chart</h2>}
            </div>
            <Col style={{ padding: "0 3% 0 0", float: "right" }}>
                <Row>
                    <Button type="primary" shape="round" onClick={toggleModalHelper} icon={<PlusCircleOutlined />} size="large">
                        New Stock
                    </Button>
                </Row>
                <Row style={{ marginTop: "15%" }}>
                    <Switch className="ant-switch-inner" style={{ marginTop: "5%" }} unCheckedChildren="E" checkedChildren="P" defaultChecked onChange={switchView} />
                </Row>
            </Col>

            <Doughnut data={data} options={options} />
            <StockModal
                showModal={showModal}
                title="Add New Stock"
                toggleModal={toggleModalHelper}
            />
        </div >
    )
};

const mapStateToProps = (state) => {
    return {
        newStock: state.stocks.stock,
        delStock: state.stocks.delStock
    }
}

export default connect(mapStateToProps, { deleteStock })(StockGraph);