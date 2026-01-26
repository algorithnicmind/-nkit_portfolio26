import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CardStack = ({
    items,
    offset,
    scaleFactor,
}) => {
    const CARD_OFFSET = offset || 10;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState(items);

    useEffect(() => {
        startFlipping();
        return () => clearInterval(interval);
    }, []);

    let interval;

    const startFlipping = () => {
        interval = setInterval(() => {
            setCards((prevCards) => {
                const newArray = [...prevCards];
                newArray.unshift(newArray.pop());
                return newArray;
            });
        }, 5000);
    };

    return (
        <div className="card-stack-container">
            {cards.map((card, index) => {
                return (
                    <motion.div
                        key={card.id}
                        className="card-stack-card glass-card"
                        style={{
                            transformOrigin: "top center",
                        }}
                        animate={{
                            top: index * -CARD_OFFSET,
                            scale: 1 - index * SCALE_FACTOR,
                            zIndex: cards.length - index,
                        }}
                    >
                        <div className="card-stack-content">
                            {card.content}
                        </div>
                        <div className="card-stack-info">
                            <p className="card-stack-name">
                                {card.name}
                            </p>
                            <p className="card-stack-designation">
                                {card.designation}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
