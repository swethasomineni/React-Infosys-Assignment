import React from "react";
import axios from 'axios';
import { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";

const Coin = () => {
    const [coins, setCoins] = useState([]);
    const [coinDetails, setCoinDetails] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=10&page=1&sparkline=false`, { crossDomain: true })
            .then(res => {
                console.log(res.data);
                setCoins(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);
    const getCoinDetails = (data) => () => {
        console.log(data);
        setShow(true);
        axios.get(`https://api.coingecko.com/api/v3/coins/${data.id}`)
            .then(res => {
                console.log(res.data);
                setCoinDetails(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h2>Coins and Details</h2>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Current Price</th>
                        <th>High 24 hour Price</th>
                        <th>Low 24 hour Price</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map(item => {

                        return (
                            <tr onClick={getCoinDetails(item)}>
                                <td><img src={item.image} height={20} width={20} /></td>
                                <td>{item.name}</td>
                                <td>{item.symbol}</td>
                                <td>{item.current_price}</td>
                                <td>{item.high_24h}</td>
                                <td>{item.low_24h}</td>
                            </tr>
                        )

                    })}

                </tbody>
            </Table>
            <Modal size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Coin Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Hashing Algorithm</th>
                                <th>Description</th>
                                <th>Market cap in Euro</th>
                                <th>Homepage</th>
                                <th>Genesis Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>{coinDetails.name}</td>
                                <td>{coinDetails.symbol}</td>
                                <td>{coinDetails.hashing_algorithm}</td>
                                <td>{coinDetails?.description?.en}</td>
                                <td>{coinDetails?.market_cap_rank}</td>
                                <td>{coinDetails?.developer_score}</td>
                                <td>{coinDetails?.genesis_date}</td>
                            </tr>

                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )


}

export default Coin;
