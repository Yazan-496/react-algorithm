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
const ArrayComponent = () => {
    const [arrayNumbers, setArrayNumbers] = useState([])
    const [lengthNums, setLengthNums] = useState(null)
    const [largest, setLargest] = useState(null)
    const [smallest, setSmallest] = useState(null)
    const [middle, setMiddle] = useState(null)
    const [secondMiddle, setSecondMiddle] = useState(null)
    const _generateRandom = () => {
        setMiddle(null)
        setSecondMiddle(null)
        setSmallest(null)
        setLargest(null)
        let Random = []
        for (let i = 0; i < lengthNums; i++) {
            const index = Math.floor(Math.random() * 100)
            Random.push(index)
        }
        setArrayNumbers(Random)
    }
    const _calculateNumbers = () => {
        const sorted = arrayNumbers.sort((a, b) =>
            a > b ? -1 : 1)
        setArrayNumbers(sorted)
        const lengthArr = sorted.length
        setLargest(sorted[0])
        setSmallest(sorted[lengthArr - 1])
       if( lengthArr % 2 === 1 ){
           setMiddle(sorted[(lengthArr - 1) / 2])
       }  else {
           setSecondMiddle(sorted[(lengthArr - 2) / 2])
           setMiddle(sorted[(lengthArr) / 2])
       }

    }
    useEffect(() => {
        // console.log(arrayNumbers, "arrayNumbers")
    }, [arrayNumbers])
    return (
        <div>
            <div className="text-center" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <label>Enter count of numbers</label>
                <input style={{
                    width: '25%',
                    textAlign: 'center'
                }} type="number" className="type" onChange={(e) => setLengthNums(e.target.value)}
                       placeholder="Ex: 99"/>
            </div>
            <div className="text-center">
                <Button disabled={lengthNums === null} $primary onClick={_generateRandom}>Generate</Button>
            </div>
            <div className="text-center">
                <Button disabled={arrayNumbers.length === 0} onClick={_calculateNumbers}>Calculate</Button>
            </div>
            <div>{arrayNumbers.length > 0 && arrayNumbers.map((num, ind) => {
                return (
                    <Input className="input" inputColor={largest ? "91b191" : ""} backColor={largest ? "91b191" : ""}
                           key={ind} type="number" onChange={(e) => {
                        const array2 = arrayNumbers.map((val, i) => i === ind ? parseInt(e.target.value) : parseInt(val));
                        setArrayNumbers(array2)
                    }} value={num}/>
                )
            })}
            </div>
            <footer>
                {largest && <Card style={{width: '18rem'}}>
                    <Card.Title><b>Result</b></Card.Title>
                    <Card.Body>
                        <Card.Text>
                            <b>Largest number is: {largest}</b>
                        </Card.Text>
                        <Card.Text>
                            <b>Smallest number is: {smallest}</b>
                        </Card.Text>
                        <Card.Text>
                            <b> Middle number is: {middle} {`,` + secondMiddle ? secondMiddle : "000"}</b>
                        </Card.Text>
                        <Button onClick={() => {
                            setArrayNumbers([])
                            setLargest(null)
                        }} $danger>Reset</Button>
                    </Card.Body>
                </Card>}
            </footer>
        </div>
    )
}
export default ArrayComponent