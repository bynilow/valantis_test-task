import { FC } from 'react';
import styled from 'styled-components'

interface IProductCardProps {
    id: string;
    product: string;
    brand: string;
    price: number;
}


const ProductCard: FC<IProductCardProps> = ({id, product, brand, price}) => {

    return (
        <Card>
            <Image />
            <Id>
                {id}
            </Id>
            <Name>
                {product}
            </Name>
            <Brand>
                {brand}
            </Brand>
            <Cost>
                {
                    price.toLocaleString('ru', {
                        style: 'currency',
                        currency: 'rub',
                        minimumFractionDigits: 0
                    })
                }
            </Cost>
        </Card>
    );
}


const Image = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px;
    background: #c0c0c0;

`

const Cost = styled.p`
    position: relative;
    font-size: 1rem;
    color: green;
    margin-top: 10px;
    align-self: flex-end;
    cursor: pointer;

    &::after{
        content: '';
        position: absolute;
        background-color: green;
        bottom: -5px;
        right: 0;
        width: 0%;
        height: 1px;
        transition: 0.1s;
    }

    transition: 0.1s;
    &:hover {
        &::after{
            width: 100%;
        }  
    }
`

const Brand = styled.p`
    
`

const Name = styled.p`
    font-size: 1rem;
    line-height: 1;
`

const Id = styled.p`
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
`

const Card = styled.div`
    position: relative;
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    height: 26rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export default ProductCard;