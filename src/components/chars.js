import React, {useEffect, useState} from "react";
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
    let [Object, setObject] = useState([])
    let [arrayRe, setArrayRe] = useState([])

    function findChar(str) {
        let longest = '';
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
                if (chunk?.length > longest?.length) {
                    longest = chunk;
                }
            }
        }
        if (longest?.length > 1) {
            return {char: longest, long: longest?.length, word: str}
        }
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
                if (res !== undefined) {
                    console.log(chars, "chars")
                    chars = [...chars, res]
                }
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
        chars.map((one) => {
            return {word: one.word, char: one.char, long: one.long, id: one.id}
        })
    }

    useEffect(() => {
        // console.log(chars, "chars")
        // console.log(arrayRe, "arrayRe")
    }, [chars])
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
                <Button disabled={statement === null} $primary onClick={
                    hasRepeatedLetters(statement)
                }>Find repeated
                    chars</Button>
            </div>
            <footer>
                {statement && <Card style={{width: '18rem'}}>
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
                                {chars.map((one, i) => {
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
                        <Button onClick={() => {
                            setChars([])
                            setStatement(null)
                            setShow(false)
                            setObject([])
                            setArrayRe([])
                            clearInput()
                        }} $danger>Reset</Button>
                    </Card.Body>
                </Card>}
            </footer>
        </div>
    )
}
export default CharComponent