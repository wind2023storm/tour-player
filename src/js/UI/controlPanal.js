/* globals UI */

UI.controlPanel = {};

UI.controlPanel.init = function(visibility) {
    this.progressValue = document.createElement('div');
    this.progressValue.className = 'value';

    this.progressBar = document.createElement('div');
    this.progressBar.className = 'progress-bar';
    this.progressBar.appendChild(this.progressValue);

    this.btnList = document.createElement('div');
    this.btnList.className = 'btn-list';

    this.panel = document.createElement('div');
    this.panel.className = 'panel';

    this.panel.appendChild(this.btnList);
    this.panel.appendChild(this.progressBar);

    this.domElement = document.createElement('div');
    this.domElement.id = 'control-panel';
    this.domElement.appendChild(this.panel);

    this.setProgress(0);
    this.setVisible(visibility);

    document.body.appendChild(this.domElement);
};

UI.controlPanel.setVisible = function(type) {
    if (type) {
        this.domElement.classList.add('visible');
    } else {
        this.domElement.classList.remove('visible');
    }
};

UI.controlPanel.addBtn = function(className, callback, title) {
    var btn = document.createElement('div');
    btn.classList.add('marker', className);
    btn.addEventListener('click', callback, false);
    btn.title = title || '';
    this.btnList.appendChild(btn);
};

UI.controlPanel.setProgress = function(value) {
    if (value >= 1) {
        this.progressBar.classList.add('hidden');
    } else {
        this.progressBar.classList.remove('hidden');
    }

    this.progressValue.style.width = Math.min(value, 1) * 100 + '%';
};
