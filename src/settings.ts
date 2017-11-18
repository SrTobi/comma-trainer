import {Corpus} from './corpus'
import {observable, computed, action, useStrict} from 'mobx';


export class Settings {
    @observable
    public numContextSentences = 2

    @observable
    public corpora: Corpus[] = []

    @observable
    public currentCorpus: Corpus | undefined = undefined

    @observable
    public showCommasLeft: boolean = true;

    public addCorpus(corpus: Corpus) {
        this.corpora.push(corpus);
        if (!this.currentCorpus) {
            this.currentCorpus = corpus
        }
    }
}