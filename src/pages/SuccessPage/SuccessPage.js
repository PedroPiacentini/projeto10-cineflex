import styled from "styled-components"
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SuccessPage({ idSessao, order }) {
    const [session, setSession] = useState(null);
    const movie = session !== null ? session.movie : null;

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);

        request.then(response => {
            setSession(response.data);
        })
    }, []);

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{movie === null ? "carregando" : movie.title}</p>
                {session !== null ? <p>{session.day.date} - {session.day.weekday}</p> : <div>carregando</div>}
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {order.ids.map(seatId => {
                    return <p key={seatId}>{session !== null ? "Assento " + (1 + seatId - session.seats[0].id) : "carregando"}</p>
                })}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {order.name}</p>
                <p>CPF: {order.cpf}</p>
            </TextContainer>

            <Link to={"/"}><button>Voltar para Home</button></Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`