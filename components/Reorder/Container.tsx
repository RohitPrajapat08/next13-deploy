import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";

import { Card } from "./Card";
import { useAppDispatch } from "../../redux/hooks";
import { articleSeriesData } from "../../redux/reducers/GetBlogsdataReducer";

const style = {
  width: 400,
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export const Container = (props: any) => {
  {
    const dispatch = useAppDispatch();
    const [cards, setCards] = useState([]);
    const [statusIndex, setStatusIndex] = useState(0);

    useEffect(() => {
      setCards(props?.articles);
      dispatch(articleSeriesData({ series: props?.articles }));
    }, [props?.articles?.length]);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      );
      setStatusIndex((prev) => prev + 1);
    }, []);

    useEffect(() => {
      dispatch(articleSeriesData({ series: cards }));
    }, [statusIndex]);

    const renderCard = useCallback(
      (card: { value: string; label: string }, index: number) => {
        return (
          <Card
            key={card.value}
            index={index}
            id={card.value}
            text={card.label}
            moveCard={moveCard}
          />
        );
      },
      []
    );

    console.log(cards, "Container Component");

    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    );
  }
};
