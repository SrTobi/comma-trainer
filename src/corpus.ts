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
            private readonly source: CorpusData | (() => Corpus)
        ) {
        super();
    }

    private _data: CorpusData | undefined = undefined;

    public get data(): CorpusData {
        if (this._data) {
            return this._data;
        }

        if (typeof this.source === "function") {
            console.log(`load lazy corpus ${this.name}`)
            let corpus = this.source();
            if (corpus.name != this.name) {
                console.warn(`Loaded corpus '${corpus.name}' into '${this.name}'`)
            }
            this._data = corpus.data;
        } else {
            this._data = this.source;
        }
        return this._data;
    }

    public pickRandomCommaSentence(contextSize: number): [string, string[]] {
        return this.data.pickRandomCommaSentence(contextSize);
    }

    public static create(name: string, text: string): Corpus {
        return new Corpus(name, CorpusData.create(text));
    }

    public static createLazy(name: string, loader: () => Corpus) {
        return new Corpus(name, loader)
    }
}
