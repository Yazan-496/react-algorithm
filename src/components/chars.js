import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components"
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const Input = styled.input`
  padding: 0.5em;
  border-radius: 20px;
  margin: 0.5em;
  color: ${props => props.inputColor ? "green" : "palevioletred"};
  background: ${props => props.backColor ? "#91b191" : "papayawhip"};
  border: none;
`;
const Button = styled.button`
  background-color: ${props => props.$primary ? "palevioletred" : props.$danger ? "#894242" : "yellowgreen"};
  color: white;
  width: 40% !important;
  font-size: 20px;
  border: none;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 20px 20px;
  cursor: pointer;
`;
const CharComponent = () => {
    const [statement, setStatement] = useState(null)
    const [show, setShow] = useState(false)
    let [chars, setChars] = useState([])
    const [finalArr, setFinalArr] = useState([])

    function findChar(str) {
        let longest = [];
        let chunk = '';
        for (let i = 0; i < str?.length; i++) {
            if (i === 0) {
                if (str[i] === str[i + 1]) {
                    chunk += str[i];
                }
            }
            if (i > 0) {
                if (str[i] === str[i - 1]) {
                    chunk += str[i];
                }
                if (str[i] !== str[i - 1]) {
                    chunk = str[i];
                }
                if (longest?.map((one) => chunk?.length > one.length)) {
                    // longest = chunk;
                    longest = [...longest, chunk];
                }
            }
        }
        return longest.map((one) => {
            if (one.length > 1) {
                return {char: one, long: one?.length, word: str}
            }
        })
    }

    function hasRepeatedLetters(str) {
        const words = str?.split(" ");
        for (let i = 0; i < words?.length - 1; i++) {
            words[i] += " ";
        }
        // console.log(words, "words")
        if (words?.length > 0) {
            words.map((one) => {
                const res = findChar(one)
                let ee = res.map((one) => {
                    if (one !== undefined) {
                        chars = [...chars, one]
                        return one
                    }
                })
            })
        }
    }

    function clearInput() {
        const getValue = document.getElementById("inputText");
        if (getValue.value !== "") {
            getValue.value = "";
        }
    }

    function _getResult() {
        return (
            <Card>
                <Card.Title>
                    <div>Result</div>
                </Card.Title>
                <Card.Body>
                    <Card.Text>
                        <div style={{
                            display: "flex", alignContent: 'center',
                            justifyContent: 'center'
                        }}>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>word</th>
                                    <th>char</th>
                                    <th>long</th>
                                </tr>
                                </thead>
                                <tbody>
                                {finalArr.map((one, i) => {
                                    return (<tr key={i}>
                                            <td>
                                                {one.word}
                                            </td>
                                            <td>
                                                {one.char}
                                            </td>
                                            <td>
                                                {one.long}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>)
    }

    useEffect(() => {
        hasRepeatedLetters(statement)
        return () => {
            setFinalArr(chars)
        }

    }, [statement, finalArr])
    return (
        <div>
            <div className="text-center" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <label>Enter Your Statement</label>
                <Input style={{
                    width: '40%',
                    textAlign: 'center'
                }} type="text" id="inputText" className="type" onChange={(e) => setStatement(e.target.value)}
                       placeholder="Ex: hi AA"/>
            </div>
            <div className="text-center">
                <Button disabled={statement === null} $primary onClick={() => setShow(true)}>Find repeated
                    chars</Button>
            </div>
            <div className="text-center">
                <Button onClick={() => {
                    setChars([])
                    setStatement(null)
                    setShow(false)
                    clearInput()
                }} $danger>Reset</Button>
            </div>
            <footer>
                {show && _getResult()}
            </footer>
        </div>
    )
}
export default CharComponent