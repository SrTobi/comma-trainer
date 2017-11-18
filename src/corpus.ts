import {AutoIdAble} from './utils'
import * as sbt from '@knod/sbd';
import * as utils from './utils';

export class CorpusData {
    public readonly sentences: string[];
    public readonly commaSentences: number[];


    private constructor(public readonly text: string) {
        this.sentences = sbt.sentences(text, {parse_type: "strings", newline_boundaries: true})
                            .map(s => s.replace(/ +/g, " "));
        this.commaSentences = this.sentences
                                    .map((s, i) => s.indexOf(",") >= 0? i : undefined)
                                    .filter(a => a != undefined) as number[];
    }

    public pickRandomCommaSentence(contextSize: number): [string, string[]] {
        const cs = this.commaSentences;
        let start = cs.findIndex(i => i >= contextSize);
        if (start < 0) {
            start = 0;
        }
        const index = cs[utils.random(start, cs.length)];
        const contextStart = index - contextSize;
        return [this.sentences[index], this.sentences.slice(contextStart, contextStart + contextSize)]
    }

    public static create(text: string): CorpusData {
        return new CorpusData(text);
    }
}

export class Corpus extends AutoIdAble {
    public constructor(
            public readonly name: string,
            public readonly data: CorpusData
        ) {
        super();
    }

    public pickRandomCommaSentence(contextSize: number): [string, string[]] {
        return this.data.pickRandomCommaSentence(contextSize);
    }

    public static create(name: string, text: string): Corpus {
        return new Corpus(name, CorpusData.create(text));
    }
}