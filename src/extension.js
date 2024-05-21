const vscode = require('vscode');
const { getWebviewContent, handleWebviewMessages } = require('./webviewUtils');

function activate(context) {
    console.log('AICoworker extension is being activated.');

    const provider = new AICoworkerViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(AICoworkerViewProvider.viewType, provider)
    );

    let helloWorldDisposable = vscode.commands.registerCommand('aicoworker.helloWorld', function () {
        vscode.window.showInformationMessage('Hello World from AICoworker!');
    });

    context.subscriptions.push(helloWorldDisposable);

    let openChatDisposable = vscode.commands.registerCommand('aicoworker.openChat', async () => {
        // Show the view in the sidebar
        await vscode.commands.executeCommand('workbench.view.extension.aicoworker');
    });

    context.subscriptions.push(openChatDisposable);

    console.log('AICoworker extension activated successfully.');
}
class AICoworkerViewProvider {
    static viewType = 'aicoworker.aicoworkerChatView';

    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }

    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]  // Ensuring access to the entire extension directory
        };

        // Correctly pass both webview and extensionUri
        webviewView.webview.html = getWebviewContent(webviewView.webview, this._extensionUri);

        webviewView.webview.onDidReceiveMessage(
            message => handleWebviewMessages(webviewView, message),
            undefined,
            context.subscriptions
        );
    }
}


function deactivate() {
    console.log('AICoworker extension is being deactivated.');
}

module.exports = {
    activate,
    deactivate
};
