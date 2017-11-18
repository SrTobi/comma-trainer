import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import {Settings} from './settings';
import {SettingsPanel} from './settingsPanel';
import {CorpusPanel} from './corpusPanel';
import {MainPanel} from './mainPanel';
import { Corpus } from "./corpus";

import "jquery";
import "bootstrap/dist/js/bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";


class GUI extends React.Component<{}, {}> {
	private settings = new Settings()

	constructor(props: any) {
		super(props);

		const addLazy = (name: string, loader: () => Corpus) => {
			this.settings.addCorpus(Corpus.createLazy(name, loader));
		}
		// add default texts
		addLazy("The Adventures of Sherlock Holmes", () => require("./corpora/sherlockHolmes"));
	}

	render() {
		return (
			<div>
				<a href="https://github.com/srtobi/comma-trainer">
					<img
						style={{ position: "absolute", top: 0, right: 0, border: 0 }}
						src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67"
						alt="Fork me on GitHub"
						data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" />
				</a>
				<div className="container">

					<div className="page-header">
						<h1>Comma Trainer <small>by <a href="https://github.com/SrTobi/">SrTobi</a></small></h1>
					</div>
					<div className="panel panel-default config-panel">
						<div className="panel-heading">
							<h3 className="panel-title">
								<a data-toggle="collapse" data-target="#settings-panel">Settings</a>
							</h3>
						</div>
						<div className="panel-body collapse out" id="settings-panel">
							<SettingsPanel settings={this.settings} />
						</div>
					</div>



					<div className="panel panel-default config-panel">
						<div className="panel-heading">
							<h3 className="panel-title">
								<a data-toggle="collapse" data-target="#main-panel">Testing area</a>
							</h3>
						</div>
						<div className="panel-body collapseo in" id="main-panel">
							<MainPanel settings={this.settings} />
						</div>
					</div>



					<div className="panel panel-default config-panel">
						<div className="panel-heading">
							<h3 className="panel-title">
								<a data-toggle="collapse" data-target="#corpus-panel">Corpus</a>
							</h3>
						</div>
						<div className="panel-body collapse out" id="corpus-panel">
							<CorpusPanel settings={this.settings} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var target = document.createElement("div");
ReactDOM.render(<GUI />, target);
document.body.appendChild(target);