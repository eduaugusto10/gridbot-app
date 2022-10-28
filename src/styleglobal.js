import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  font-size: 16px;
  width: 300px;
  height: 40px;
  margin: 10px;
  padding-left: 15px;
`;

export const Title = styled.span`
  font-size: 36px;
  margin-top: 10px;
`;
export const Text = styled.span`
  font-size: 16px;
  margin-top: 10px;
`;

export const View = styled.div`
  flex-direction: row;
`;
export const Div = styled.div`
  display: flex;
  flex-direction: ${props => props.buttons ? "row" : "column"};
`;
export const Button = styled.button`
  font-size: 16px;
  width: ${props => props.delete ? "220px" : "120px"};
  height: 40px;
  margin: 10px;
  background-color:${props => props.delete ? "red" : "#c4c4c4"};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
export const MicroButton = styled.button`
  font-size: 16px;
  width: 80px;
  height: 30px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${props => props.delete ? "red" : "blue"};
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid black;
  &:hover {
    opacity: 0.6;
  }
`;

export const List = styled.li`
  display: grid;
  grid-template-columns: 22% 22% 10% 10% 10% 22%;
  grid-gap: 10px;
`;
