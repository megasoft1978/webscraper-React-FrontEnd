import React from 'react';
import ReactWordcloud, { MinMaxPair, Optional, Options } from 'react-wordcloud';

function ArticlesComponent(props: any) {
    const { articles } = props;

    const getWordCloudWords = (article: ArticleRow) => {
        let wordsCloud: WordCloud[] = [];

        let wordCloudWords = article.wordcloud_words.split(' ');
        let wordCloudScores = article.wordcloud_scores.split(' ');

        // let minValue = parseFloat(wordCloudScores[0]);
        // let maxValue = parseFloat(wordCloudScores[0]);
        // let maxWord = wordCloudWords[0];

        // for (let j = 1; j < wordCloudWords.length; j++) {
        //   if (parseFloat(wordCloudScores[j]) < minValue) {
        //     minValue = parseFloat(wordCloudScores[j]);
        //   }

        //   if (parseFloat(wordCloudScores[j]) > maxValue) {
        //     maxValue = parseFloat(wordCloudScores[j]);
        //     maxWord = wordCloudWords[j];
        //   }
        // }

        // console.log(`minValue: ${minValue}, maxValue: ${maxValue}`);

        for (let j = 0; j < wordCloudWords.length; j++) {
            wordsCloud.push({
                text: wordCloudWords[j],
                value: parseFloat(wordCloudScores[j])//maxWord === wordCloudWords[j] ? 1 : (parseFloat(wordCloudScores[j]) / maxValue) - 0.01
            } as WordCloud)
        }

        // console.log('wordsCloud', wordsCloud);

        return wordsCloud;
    }

    const size: MinMaxPair = [300, 300];
    const options: Optional<Options> = {
        fontFamily: "Times New Roman",
        fontWeight: "bold",
        fontSizes: [20, 40],
        rotationAngles: [0, 90],
        rotations: 2,
        // colors: ['orange', 'black', 'gray', 'lightgray'],
        enableTooltip: false,
    };

    const callbacks = {
        // getWordColor: (word: Word) => {
        //   return word.value === 1 ? "orange" : interpolateColor('D3D3D3', '696969', word.value);
        // },
    }

    // const interpolateColor = (a: string, b: string, amount: number) => {

    //   var ah = parseInt(a.replace(/#/g, ''), 16),
    //     ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
    //     bh = parseInt(b.replace(/#/g, ''), 16),
    //     br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
    //     rr = ar + amount * (br - ar),
    //     rg = ag + amount * (bg - ag),
    //     rb = ab + amount * (bb - ab);

    //   return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
    // }

    return (
        <div className="p-d-flex p-flex-wrap p-justify-center">
            {
                articles.map((article: ArticleRow, index: number) => (
                    <div key={index.toString()} >
                        <div className="box p-m-2 p-p-0" style={{ width: "300px", height: "300px" }} onClick={(e) => window.open(article.url, "_blank")} >
                            <ReactWordcloud words={getWordCloudWords(article)} size={size} minSize={size} options={options} callbacks={callbacks} />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ArticlesComponent;
