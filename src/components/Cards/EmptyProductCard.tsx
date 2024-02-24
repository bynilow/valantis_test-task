import { FC } from 'react';
import styled from 'styled-components'

interface IEmptyProductCard {

}

const EmptyProductCard: FC<IEmptyProductCard> = ({}) => {

    return (
        <Card>
            
        </Card>
    );
}

const Card = styled.div`
    width: 20rem;
    height: 26rem;
`

export default EmptyProductCard;