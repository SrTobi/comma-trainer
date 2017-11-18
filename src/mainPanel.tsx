import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from 'mobx-react';
import {observable, when, computed} from 'mobx';
import {Settings} from './settings';
import {Corpus, CorpusData} from './corpus';
import {Editor, EditorState, ContentState} from 'draft-js';
import * as Vis from './visuals';

type ResultChunkType = "stuff" | "correct" | "missing" | "wrong"
interface ResultChunk {
    content: string;
    type: ResultChunkType
}

class TestInstanceResult {
    public constructor(
        public readonly chunks: ResultChunk[],
        public readonly missing: number,
        public readonly wrong: number,
        public readonly correct: number) {

    }

    public get isCorrect() {
        return this.missing == 0 && this.wrong == 0;
    }
}

function countCommas(str: string) {
    return (str.match(/,+/g) || []).length
}

class TestInstance {
    public readonly refSentence: string;
    public readonly testSentence: string;
    public readonly context: string[];
    @observable
    private _result: TestInstanceResult | undefined;
    public readonly commasNeeded: number;

    constructor(public readonly corpus: Corpus, contextSize: number) {
        [this.refSentence, this.context] = corpus.pickRandomCommaSentence(contextSize);
        this.testSentence = this.refSentence.replace(/,/g, "");
        this.commasNeeded = countCommas(this.refSentence)
    }

    @computed
    public get result() {
        return this._result;
    }

    private levenshteinMatrix(a: string, b: string) {
        var matrix = [];

        // increment along the first column of each row
        var i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        var j;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1)); // deletion
                }
            }
        }

        return matrix;
    };

    public check(input: string) {
        const ref = this.refSentence;
        const m = this.levenshteinMatrix(input, ref);

        let i = ref.length, j = input.length;
        let missing = 0, wrong = 0;
        let chunks: ResultChunk[] = []
        const add = (c: string, type: ResultChunkType) => {
            let prev = chunks[0]
            if(prev && prev.type == type) {
                prev.content = c + prev.content;
            } else {
                chunks.unshift({type, content: c})
            }
        }
        while (i > 0 && j > 0) {
            const cur = m[i][j];
            const next = m[i][j] - 1;
            if (i-1 >= 0 && m[i-1][j] == next) {
                add(ref.charAt(i-1), "missing");
                --i;
                ++missing;
            } else if (j-1 >= 0 && m[i][j-1] == next) {
                add(input.charAt(j-1), "wrong");
                --j;
                ++wrong;
            } else if (i-1 >= 0 && j-1 >= 0 && m[i-1][j-1] == cur) {
                const c = ref.charAt(i-1)
                add(c, c == ","? "correct" : "stuff");
                --i; --j;
            } else {
                throw "not possible!!!"
            }
        }
        this._result = new TestInstanceResult(chunks, missing, wrong, this.commasNeeded - missing);
    }
}

@observer
export class MainPanel extends React.Component<{settings: Settings}, {editorState: EditorState}> {

    @observable
    private testInst: TestInstance | undefined;

    constructor(props: {settings: Settings}) {
        super(props);
        
        this.setState({editorState: EditorState.createEmpty()})
        this.waitForNewCorpus();
    }

    private createNewTestInstance() {
        const settings = this.props.settings;
        this.testInst = new TestInstance(settings.currentCorpus!, settings.numContextSentences);
        console.log("Created new instance:");
        console.log(this.testInst.context);
        console.log(this.testInst.refSentence);
        this.setState({editorState: EditorState.createWithContent(ContentState.createFromText(this.testInst.testSentence))});
    }

    private waitForNewCorpus() {
        when(() => this.props.settings.currentCorpus !== undefined, this.createNewTestInstance.bind(this));
        this.testInst = undefined;
    }

    private onEditFieldChange(newEditorState: EditorState) {

        const test = this.testInst!
        const text = newEditorState.getCurrentContent().getPlainText();
        const oldText = this.state.editorState.getCurrentContent().getPlainText();
        const hasContentChanged = text !== oldText;
        console.log("change!");
        if (hasContentChanged) {
            const ok = test.testSentence == text.replace(/,/g, "");

            if(!ok) {
                newEditorState = EditorState.undo(newEditorState);
            }
        }

        this.setState({editorState: newEditorState});
    }

    public render(): JSX.Element {
        const settings = this.props.settings
        const test = this.testInst;
        if (!test) {
            return (<Vis.Message>No corpus selected!</Vis.Message>)
        }

        const text = this.state.editorState.getCurrentContent().getPlainText();
        const result = test.result;
        console.log("result=", result);
        return (
            <div>
                <div className="context-container">
                    {test.context.map(s => s + " ")}
                </div>
                <div className="editor-container">
                    {
                        !result?
                            <Editor editorState={this.state.editorState} onChange={this.onEditFieldChange.bind(this)}/>
                            :
                            result.chunks.map((c) => {switch(c.type) {
                                case "stuff": return <span>{c.content}</span>
                                case "correct": return <span style={{backgroundColor: "greenyellow"}}>{c.content}</span>
                                case "missing": return <span style={{backgroundColor: "yellow"}}>{c.content}</span>
                                case "wrong": return <span style={{backgroundColor: "red"}}>{c.content}</span>
                            }})
                    }
                    
                </div>
                <div>
                    <input
                        type="button"
                        value="Check"
                        disabled={result !== undefined}
                        onClick={() => test.check(text)}
                        />
                    <input
                        type="button"
                        value="Next"
                        onClick={this.createNewTestInstance.bind(this)}
                        />
                </div>
                <div className="info-container">
                    {
                        settings.showCommasLeft? (
                            <span>{countCommas(text)} / {test.commasNeeded} Commas </span>
                        ) : undefined
                    }
                    {
                        result? (
                            <span>{result.wrong} Wrong, {result.missing} Missing, {result.correct} Correct</span>
                        ) : undefined
                    }
                </div>
            </div>
        );
    }
}
