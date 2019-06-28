/* globals Tour, Lang, UI, BrouserInfo */

Tour.setMouseMenu = function() {
    if (this.options.mouseMenu) {
        UI.mouseMenu.init();

        var itemList = [];
        var metaKey = BrouserInfo.apple ? '⌘' : 'Alt';
        var info = 'Tour-Player v' + Tour.version.join('.') + ' (' +
        {webgl: 'WebGL', css: 'CSS', canvas: 'Canvas'}[this.options.rendererType] + 'Renderer)';

        var Item = UI.mouseMenu.Item;
        var ctrl = this.controls;

        itemList.push(new Item(ctrl.back, Lang.get('mousemenu.back'), metaKey + '+' + Lang.get('key.left')));
        itemList.push(new Item(ctrl.forward, Lang.get('mousemenu.forward'), metaKey + '+' + Lang.get('key.right')));
        itemList.push(new Item(ctrl.reload, Lang.get('mousemenu.reload'), 'Ctrl+R'));

        itemList.push(new UI.mouseMenu.Hr());
        itemList.push(new Item(ctrl.zoomIn, Lang.get('mousemenu.zoomin'), 'Shift, +'));
        itemList.push(new Item(ctrl.zoomOut, Lang.get('mousemenu.zoomout'), 'Ctrl, -'));
        itemList.push(new Item(ctrl.autoRotate, Lang.get('mousemenu.autorotate'), 'R, ' + Lang.get('key.spase')));
        itemList.push(new Item(ctrl.fullscreen, Lang.get('mousemenu.fullscreen'), 'F11'));

        if (this.options.rendererType != 'css') {
            itemList.push(new UI.mouseMenu.Hr());
            itemList.push(new Item(ctrl.download, Lang.get('mousemenu.saveimage'), metaKey + '+S'));
        }

        itemList.push(new UI.mouseMenu.Hr());
        this.toggleMenuItem = new Item(ctrl.toggleMenu, Lang.get('mousemenu.hidemenu'), 'M');
        itemList.push(this.toggleMenuItem);
        itemList.push(new Item(ctrl.getCode, Lang.get('mousemenu.getcode')));
        itemList.push(new Item(ctrl.opennewtab, Lang.get('mousemenu.newtab')));
        itemList.push(new Item(ctrl.visitSite, Lang.get('mousemenu.visitsite') + ' tour-360.ru'));

        itemList.push(new UI.mouseMenu.Hr());
        itemList.push(new UI.mouseMenu.Item(false, info));
        itemList[itemList.length - 1].setDisable(true);

    } else if (this.options.mouseMenu !== undefined) {
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
        });
    }
};
