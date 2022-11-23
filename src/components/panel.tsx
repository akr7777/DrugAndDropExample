import s from "./main.module.css";
import {DragEvent} from "react";
import {CardType, sortDirectionType} from "./main-field";
import coockie1 from '../public/Group_1.jpg';
import coockie2 from '../public/Group_2.jpg';

type PanelPropsType = {
    currentCard: CardType | null
    setCurrentCard: (c: CardType | null) => void

    totalCount: number

    cardList: CardType[]
    setCardList: (cArr: CardType[]) => void

    resultList: CardType[];
    setResultList: (cArr: CardType[]) => void,

    sortDirection: sortDirectionType
    setSortDirection: (s: sortDirectionType) => void
}
const Panel = (props: PanelPropsType) => {
    if (props.sortDirection === 'DOWN')
        props.setResultList(props.resultList.reverse());


    function onDragStartHandler(e: DragEvent<HTMLDivElement>, card: CardType) {
        props.setCurrentCard(card);
    }

    function onDropHandler(e: DragEvent<HTMLDivElement>, card: CardType) {
        e.preventDefault();
        e.currentTarget.className = s.cardDiv;
        if (card.id <= props.totalCount)
            props.setCardList(props.cardList.map((c: CardType) => {
                if (props.currentCard && c.id === card.id) {
                    return props.currentCard;
                }
                if (props.currentCard && c.id === props.currentCard.id) {
                    return card;
                }
                return c;
            }));
        else {

            if (props.currentCard && props.currentCard.text === card.value) {
                props.setCardList(props.cardList.map((c: CardType) => {
                    if (props.currentCard && c.id + props.totalCount === card.id)
                        return {...card};
                    return c;
                }))
                props.setResultList(props.resultList.map((c: CardType) => {
                    if (props.currentCard && c.id == props.currentCard.id + props.totalCount)
                        return {...props.currentCard, id: props.currentCard.id + props.totalCount};
                    return c;
                }))
            }
        }
    }

    function onDragEndHandler(e: DragEvent<HTMLDivElement>) {
        e.currentTarget.className = s.cardDiv;
    }

    function onDragLeaveHandler(e: DragEvent<HTMLDivElement>) {
        e.currentTarget.className = s.cardDiv;
    }

    function onDragOverHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.className = s.cardDiv + " " + s.cardOverDiv;
    }

    const isFinished = props.resultList.every(c => c.text.length > 0);

    return <div className={s.panel_div}>
        <img src={coockie1} className={s.img_1}/>
        <img src={coockie2} className={s.img_2}/>
        {/*UPPER DIV*/}
        {/*<div className={s.upperDiv}>*/}
        {/*    {*/}
        {/*        props.cardList*/}
        {/*            .map(card => card.id <= props.totalCount ? <div*/}
        {/*                draggable={true}*/}
        {/*                onDragStart={(e) => onDragStartHandler(e, card)}*/}
        {/*                onDragEnd={(e) => onDragEndHandler(e)}*/}
        {/*                onDragLeave={(e) => onDragLeaveHandler(e)}*/}
        {/*                onDragOver={(e) => onDragOverHandler(e)}*/}
        {/*                onDrop={(e) => onDropHandler(e, card)}*/}
        {/*                key={card.id}*/}

        {/*                className={s.cardDiv}*/}
        {/*            >*/}
        {/*                {card.text}*/}
        {/*            </div> : <div className={s.cardDiv} key={card.id + props.totalCount*2}></div>)*/}
        {/*    }*/}
        {/*</div>*/}

        <div className={s.updiv2}>
        {
            props.cardList.map((card,index) =>
                <div
                    draggable={true}
                    onDragStart={(e) => onDragStartHandler(e, card)}
                    onDragEnd={(e) => onDragEndHandler(e)}
                    onDragLeave={(e) => onDragLeaveHandler(e)}
                    onDragOver={(e) => onDragOverHandler(e)}
                    onDrop={(e) => onDropHandler(e, card)}
                    key={card.id}

                    className={ index%2===0 ? s.cardDiv_lower : s.cardDiv_upper}
                >
                    {card.text}
                </div>)
        }
        </div>

        {/*LOWER DIV*/}
        <div className={s.lowerDiv}>
            {
                props.resultList.map(card =>
                    <div
                        key={card.id}
                        //draggable={true}
                        onDragStart={(e) => onDragStartHandler(e, card)}
                        onDragEnd={(e) => onDragEndHandler(e)}
                        onDragLeave={(e) => onDragLeaveHandler(e)}
                        onDragOver={(e) => onDragOverHandler(e)}
                        onDrop={(e) => onDropHandler(e, card)}

                        className={s.cardDiv}
                    >
                        {card.text}
                    </div>)
            }
        </div>

        {
            isFinished && <div>
                <label>The test is finished!</label>
            </div>
        }
    </div>
}

export default Panel;