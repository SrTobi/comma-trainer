import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {Settings} from './settings';
import {Corpus, CorpusData} from './corpus';
import * as Vis from './visuals';


const MinCommaSentences = 10;

@observer
export class CorpusPanel extends React.Component<{settings: Settings}> {

    @observable
    private corpus: CorpusData = CorpusData.create("");

    @observable
    private name = ""

    @observable
    private corpusText = ""


    private submitCorpus(corpusData: CorpusData) {
        this.props.settings.addCorpus(new Corpus(this.name, corpusData));

        // reset form
        this.name = "";
        this.corpusText = "";
    }

    private onCorpusTextChange(text: string) {
        this.corpusText = text;
        this.corpus = CorpusData.create(text)
    }
    
    public render() {
        const corpus = this.corpus;
        const settings = this.props.settings;
        const nameExistsAlready = settings.corpora.some((c) => c.name.toUpperCase() == this.name.toUpperCase());
        const nameOk = this.name.length > 0 && !nameExistsAlready;
        const enoughCommaSentences = corpus.commaSentences.length >= MinCommaSentences;
        const submitEnabled = nameOk && enoughCommaSentences;

        return (
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={this.name}
                        onChange={(e) => this.name = e.target.value}
                        />
                    <Vis.Message show={nameExistsAlready}>Name already exists!</Vis.Message>
                </div>
                <div>
                    <textarea
                        placeholder="Enter your own text here"
                        onChange={(e) => this.onCorpusTextChange(e.target.value)}
                        value={this.corpusText}
                        >
                    </textarea>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Characters: </td><td>{this.corpusText.length}</td>
                            </tr>
                            <tr>
                                <td>Sentences: </td><td>{corpus.sentences.length}</td>
                            </tr>
                            <tr>
                                <td>Sentences with comma: </td><td>{corpus.commaSentences.length}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <Vis.Message show={!enoughCommaSentences}>The Corpus should have at least {MinCommaSentences} sentences with commas!</Vis.Message>
                </div>
                <div>
                    <input
                        type="button"
                        value="Submit Corpus"
                        disabled={!submitEnabled}
                        onClick={() => {this.submitCorpus(this.corpus!)}}
                        />
                </div>
            </div>
        )
    }
}