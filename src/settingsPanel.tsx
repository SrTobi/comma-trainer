import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from 'mobx-react';
import {Settings} from './settings'
import * as Vis from './visuals'

@observer
export class SettingsPanel extends React.Component<{settings: Settings}> {

    private onChangeCorpusSelection(name: string) {
        const settings = this.props.settings;
        settings.currentCorpus = settings.corpora.find(c => c.name == name);
    }

    public render() {
        const settings = this.props.settings;
        const currentCorpus = settings.currentCorpus;
        const corpusName = currentCorpus? currentCorpus.name : "";
        return (
            <div>
                <Vis.SelectForm
                    label="Corpus"
                    value={corpusName}
                    items={settings.corpora.map((c) => {return {value: c.name, data: c.name}})}
                    onChange={this.onChangeCorpusSelection.bind(this)}
                    />
                    
                <Vis.NumberForm
                    value={settings.numContextSentences}
                    label="Context sentences"
                    min={1}
                    max={10}
                    onChange={(newVal) => { settings.numContextSentences = newVal }}
                    />
                
                <Vis.CheckboxForm
                    checked={settings.showCommasLeft}
                    label="Show commas left"
                    onChange={(newVal) => { settings.showCommasLeft = newVal}}
                    />
            </div>
        )
    }
}