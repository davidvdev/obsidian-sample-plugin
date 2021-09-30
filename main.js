import { __awaiter } from "tslib";
import { Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
const DEFAULT_SETTINGS = {
    mySetting: 'default'
};
export default class MyPlugin extends Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('loading plugin');
            yield this.loadSettings();
            this.addRibbonIcon('dice', 'Sample Plugin', () => {
                new Notice('This is a notice!');
            });
            this.addStatusBarItem().setText('Status Bar Text');
            this.addCommand({
                id: 'open-sample-modal',
                name: 'Open Sample Modal',
                // callback: () => {
                // 	console.log('Simple Callback');
                // },
                checkCallback: (checking) => {
                    let leaf = this.app.workspace.activeLeaf;
                    if (leaf) {
                        if (!checking) {
                            new SampleModal(this.app).open();
                        }
                        return true;
                    }
                    return false;
                }
            });
            this.addSettingTab(new SampleSettingTab(this.app, this));
            this.registerCodeMirror((cm) => {
                console.log('codemirror', cm);
            });
            this.registerDomEvent(document, 'click', (evt) => {
                console.log('click', evt);
            });
            this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
        });
    }
    onunload() {
        console.log('unloading plugin');
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}
class SampleModal extends Modal {
    constructor(app) {
        super(app);
    }
    onOpen() {
        let { contentEl } = this;
        contentEl.setText('Woah!');
    }
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}
class SampleSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });
        new Setting(containerEl)
            .setName('Setting #1')
            .setDesc('It\'s a secret')
            .addText(text => text
            .setPlaceholder('Enter your secret')
            .setValue('')
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            console.log('Secret: ' + value);
            this.plugin.settings.mySetting = value;
            yield this.plugin.saveSettings();
        })));
    }
}
