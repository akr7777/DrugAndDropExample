import s from "./main.module.css";
import {useState, DragEvent, useEffect} from "react";
import Settings from "./settings";
import Panel from "./panel";

export type CardType = {
    id: number,
    text: string,
    value: string,
}
export type TypeType = 0 | 9 | 19 | 50 | 99 | 999;
const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const COUNT_DEFAULT_VALUE = 3;
export const TYPE_DEFAULT_VALUE:TypeType = 0;
export type sortDirectionType = 'UP' | 'DOWN'

const setTextByType = (type: TypeType) => {
    //console.log('setTextByType, type', type)
    if (type === 0)
        return ABC[Math.floor(Math.random() * ABC.length)];
    if (type === 9)
        return String(Math.floor(Math.random() * (10 - 1) + 1));
    if (type === 19)
        return String(Math.floor(Math.random() * (20 - 10) + 10));
    if (type === 50)
        return String(Math.floor(Math.random() * (51 - 20) + 20));
    if (type === 99)
        return String(Math.floor(Math.random() * (100 - 51) + 51));
    if (type === 999)
        return String(Math.floor(Math.random() * (1000 - 100) + 100));
    return ''
}

const MainField = () => {

    const [totalCount, setTotalCount] = useState<number>(COUNT_DEFAULT_VALUE);
    const [type, setType] = useState<TypeType>(TYPE_DEFAULT_VALUE);
    const [sortDirection, setSortDirection] = useState<sortDirectionType>('UP')

    const cardInitState: CardType[] = [];
    for (let i = 1; i <= totalCount; i++) {
        const newElem = {
            id: i,
            text: setTextByType(type),
            value: ''
        }
        cardInitState.push(newElem)
    }
    useEffect(() => {
        setCardList(cardInitState);
        setResultList(resultState);
        // if (sortDirection === "UP")
        //     setResultList(resultState)
        // if (sortDirection === "DOWN")
        //     setResultList(resultState.reverse());
        setSortDirection(sortDirection);
    }, [totalCount, type])


    let resultState: CardType[] = [...cardInitState]
        .sort((a, b) => {
            if ((/^-?\d+$/.test(a.text) && (/^-?\d+$/.test(b.text)))) return Number(a.text) - Number(b.text)
            if (a.text < b.text) return -1
            if (a.text > b.text) return 1
            return 0;
        })
        .map((el) => {
            return {...el, id: el.id + totalCount, text: '', value: el.text}
        })
    if (sortDirection === 'DOWN')
        resultState = resultState.reverse();

    const [cardList, setCardList] = useState<CardType[]>(cardInitState);
    const [resultList, setResultList] = useState<CardType[]>(resultState);
    const [currentCard, setCurrentCard] = useState<CardType | null>(null);

    // function onDragStartHandler(e: DragEvent<HTMLDivElement>, card: CardType) {
    //     setCurrentCard(card);
    // }
    //
    // function onDropHandler(e: DragEvent<HTMLDivElement>, card: CardType) {
    //     e.preventDefault();
    //     e.currentTarget.className = s.cardDiv;
    //     if (card.id <= totalCount)
    //         setCardList(cardList.map((c: CardType) => {
    //             if (currentCard && c.id === card.id) {
    //                 return currentCard;
    //             }
    //             if (currentCard && c.id === currentCard.id) {
    //                 return card;
    //             }
    //             return c;
    //         }));
    //     else {
    //
    //         if (currentCard && currentCard.text === card.value) {
    //         setCardList(cardList.map((c: CardType) => {
    //             if (currentCard && c.id + totalCount === card.id)
    //                 return {...card};
    //             return c;
    //         }))
    //         setResultList(resultList.map((c: CardType) => {
    //             if (currentCard && c.id == currentCard.id + totalCount)
    //                 return {...currentCard, id: currentCard.id + totalCount};
    //             return c;
    //         }))
    //         }
    //     }
    // }
    //
    // function onDragEndHandler(e: DragEvent<HTMLDivElement>) {
    //     e.currentTarget.className = s.cardDiv;
    // }
    //
    // function onDragLeaveHandler(e: DragEvent<HTMLDivElement>) {
    //     e.currentTarget.className = s.cardDiv;
    // }
    //
    // function onDragOverHandler(e: DragEvent<HTMLDivElement>) {
    //     e.preventDefault();
    //     e.currentTarget.className = s.cardDiv + " " + s.cardOverDiv;
    // }
    //
    // const isFinished = resultList.every(c => c.text.length > 0);

    return <div className={s.mainDiv}>

        {/*SETTINGS*/}
        <Settings
            totalCount={totalCount}
            setTotalCount={setTotalCount}

            type={type}
            setType={setType}

            sortDirection={sortDirection}
            setSortDirection={setSortDirection}

            resultList={resultList}
            setResultList={setResultList}

            cardList={cardList}
        />

        {/*/!*UPPER DIV*!/*/}
        {/*<div className={s.upperDiv}>*/}
        {/*    {*/}
        {/*        cardList*/}
        {/*            .map(card => card.id <= totalCount ? <div*/}
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
        {/*            </div> : <div className={s.cardDiv} key={card.id+totalCount*2}></div>)*/}
        {/*    }*/}
        {/*</div>*/}

        {/*/!*LOWER DIV*!/*/}
        {/*<div className={s.lowerDiv}>*/}
        {/*    {*/}
        {/*        resultList.map(card =>*/}
        {/*            <div*/}
        {/*                key={card.id}*/}
        {/*                //draggable={true}*/}
        {/*                onDragStart={(e) => onDragStartHandler(e, card)}*/}
        {/*                onDragEnd={(e) => onDragEndHandler(e)}*/}
        {/*                onDragLeave={(e) => onDragLeaveHandler(e)}*/}
        {/*                onDragOver={(e) => onDragOverHandler(e)}*/}
        {/*                onDrop={(e) => onDropHandler(e, card)}*/}

        {/*                className={s.cardDiv}*/}
        {/*            >*/}
        {/*                {card.text}*/}
        {/*            </div>)*/}
        {/*    }*/}
        {/*</div>*/}

        {/*{ sortDirection && <label>sortDirection TRUE</label> }*/}
        {/*{ !sortDirection && <label>sortDirection FALSE</label> }*/}
        {/*{*/}
        {/*    isFinished && <div>*/}
        {/*        <label>The test is finished!</label>*/}
        {/*    </div>*/}
        {/*}*/}

        <Panel
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            totalCount={totalCount}
            cardList={cardList}
            setCardList={setCardList}
            resultList={resultList}
            setResultList={setResultList}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
        />

    </div>;

}

export default MainField;