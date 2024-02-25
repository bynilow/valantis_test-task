import { FC } from 'react';
import styled from 'styled-components'
import { palette } from '../../styles/style';

interface IProductCardProps {
    id: string;
    product: string;
    brand: string;
    price: number;
}


const ProductCard: FC<IProductCardProps> = ({id, product, brand, price}) => {

    return (
        <Card>
            <Info>
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
            </Info>
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

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

`

const Image = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px;
    background: ${palette.lightGray};

`

const Cost = styled.p`
    position: relative;
    font-size: 1rem;
    color: ${palette.green};
    margin-top: 10px;
    align-self: flex-end;
    cursor: pointer;

    &::after{
        content: '';
        position: absolute;
        background-color: ${palette.green};
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
    font-weight: 500;
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
    font-size: 0.7rem;
`

const Card = styled.div`
    position: relative;
    padding: 15px;
    box-shadow: 0 0 5px #0000002f;
    border-radius: 10px; 
    width: 100%;
    height: 26rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;
`

export default ProductCard;