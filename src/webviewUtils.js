const { getOpenAIResponse } = require('./openaiService');

const vscode = require('vscode');

function getWebviewContent(webview, extensionUri) {
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src', 'script.js'))
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AICoworker Chat</title>
        <!-- Content Security Policy -->
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src ${webview.cspSource} 'unsafe-eval'; style-src ${webview.cspSource} 'unsafe-inline';">
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }
            h1 { color: #5a5a5a; }
            textarea { width: calc(100% - 22px); padding: 10px; box-sizing: border-box; }
            button { background-color: #007acc; color: white; border: none; padding: 10px 20px; margin-top: 10px; cursor: pointer; }
            button:hover { background-color: #005a9c; }
            #response { margin-top: 20px; padding: 10px; background-color: white; border: 1px solid #ccc; }
        </style>
    </head>
    <body>
        <h1>AICoworker Chat</h1>
        <textarea id="input" rows="4"></textarea><br>
        <button id="sendButton">Ask AI</button>
        <h2>Response:</h2>
        <div id="response"></div>
        <script src="${scriptUri}"></script>
    </body>
    </html>
    `;
}


async function handleWebviewMessages(panel, message) {
    switch (message.command) {
        case 'askAI':
            const aiResponse = await getOpenAIResponse(message.text);
            panel.webview.postMessage({ command: 'response', text: aiResponse });
            break;
    }
}

module.exports = { getWebviewContent, handleWebviewMessages };
