/* globals Tour, THREE */

/**
 * Устанавливает текстуру указанной панорамы
 *
 * @param {Number} id идентификатор панорамы
 */
Tour.setTexture = function(id) {
    var loader = new THREE.ImageLoader();
    loader.load(this.options.path + id + '/thumbnail/0.jpg', function(img) {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        for (var i = 0; i < 6; i++) {
            var planeId = this.options.tileset[i];
            var imgeURL = this.options.path + id + '/' + this.options.imageType + '/' + planeId + '.jpg';
            var tile = ctx.getImageData(planeId * img.height, 0, img.height, img.height);

            if (this.options.rendererType == 'css') {
                var tempcanvas = document.createElement('canvas');
                tempcanvas.width = tempcanvas.height = img.height;
                var tempctx = tempcanvas.getContext('2d');
                tempctx.putImageData(tile,0,0);
                this.mesh.children[i].element.src = tempcanvas.toDataURL('image/jpeg');
            } else {
                var texture = new THREE.Texture(tile);
                texture.needsUpdate = true;
                this.mesh.material.materials[i].map = this.options.rendererType != 'canvas' ? texture : tile;
            }

            this.setPlane(i, imgeURL);
        }
    }.bind(this), false, function() {
        Tour.log('Ошибка загрузки панорамы');
    });
};