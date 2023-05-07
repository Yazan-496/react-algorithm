import React, {useEffect, useState} from "react";
import styled from "styled-components"
import Card from 'react-bootstrap/Card'

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
    let [Result, setResult] = useState(null)

    function hasRepeatedLetters(str, n) {
        let rep = false;
        let seq = false;
        const result = [];

        const num = '0123456789';
        const abc = 'abcdefghijklmnopqrstuvqxyz';

        if (str?.length < n) return false;

        for (let i = 0; i < str.length; i++) {
            if (i + n > str.length) break;

            const chunk = str.slice(i, i + n);
            const seqABC = abc.indexOf(chunk) > -1;
            const seq123 = num.indexOf(chunk) > -1;

            if (seq123 || seqABC) {
                seq = true;
                result.push(chunk);
            }

            if ([...chunk].every(v => v.toLowerCase() === chunk[0].toLowerCase())) {
                rep = true;
                result.push(chunk);
            }
        }

        return {
            repetition: rep,
            sequential: seq,
            out: result
        };

    }

    useEffect(() => {
        console.log(Result, "result")
    }, [Result])
    return (

        <div>
            <div className="text-center" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <label>Enter Your Statement</label>
                <input style={{
                    width: '75%',
                    textAlign: 'center'
                }} type="text" className="type" onChange={(e) => setStatement(e.target.value)}
                       placeholder="Ex: hi AA"/>
            </div>
            <div className="text-center">
                <Button disabled={statement === null} $primary onClick={hasRepeatedLetters(statement, 3)}>Find repeated
                    chars</Button>
            </div>
            <footer>
                {statement && <Card style={{width: '18rem'}}>
                    <Card.Title><b>Result</b></Card.Title>
                    <Card.Body>
                        <Card.Text>
                            <b>{Result}</b>
                        </Card.Text>
                        <Button onClick={() => {
                            setResult(null)
                            Result = null
                            setStatement(null)
                        }} $danger>Reset</Button>
                    </Card.Body>
                </Card>}
            </footer>
        </div>
    )
}
export default CharComponent