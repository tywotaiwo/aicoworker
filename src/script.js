(function() {
    const vscode = acquireVsCodeApi(); // This should be at the top of your script

    document.addEventListener('DOMContentLoaded', function() {
        const sendButton = document.getElementById('sendButton');
        if (sendButton) {
            sendButton.addEventListener('click', function() {
                const input = document.getElementById('input').value;
                vscode.postMessage({
                    command: 'askAI',
                    text: input
                });
            });
        }
    });

    window.addEventListener('message', event => {
        const message = event.data;
        if (message.command === 'response') {
            document.getElementById('response').innerText = message.text;
        }
    });
})();
