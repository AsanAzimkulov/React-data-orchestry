import { Node } from 'butterfly-dag';
import $ from 'jquery';
// import '../../static/iconfont.css';

// Positioning of nodes

export class PositioningSystem {
  constructor() {
    this.nodeWidth = 200;
    this.nodeOrdinaryHeight = 300;
    this.horizontalShift = 248;
    this.verticalShift = 348;



    this.initialCords = {
      x: 91,
      y: 223,
    }

    this.cords = {
      x: this.initialCords.x - this.horizontalShift,
      y: this.initialCords.y,
    }
  }

  getNextCoords() {

    // const canvasWidth = document.querySelector('.butterfly-selected-canvas').getAttribute('width');
    // const canvasHeight = document.querySelector('.butterfly-selected-canvas').getAttribute('height');
    const canvasWidth = window.innerWidth - 302;
    const canvasHeight = window.innerHeight;

    if (((this.cords.y + this.verticalShift) > canvasHeight) && (this.cords.x + this.horizontalShift + this.nodeWidth) > canvasWidth) {
      this.cords.y = this.initialCords.y;
      this.cords.x = this.initialCords.x;
      return {
        x: this.cords.x,
        y: this.cords.y
      }
    }



    if ((this.cords.x + this.horizontalShift + this.nodeWidth) > canvasWidth) {
      this.cords.x = this.initialCords.x;
      this.cords.y += this.verticalShift;
      return {
        x: this.cords.x,
        y: this.cords.y
      }
    }

    this.cords.x += this.horizontalShift;

    return {
      x: this.cords.x,
      y: this.cords.y
    }
  }
}

let getAttrObj = (namedNodeMap) => {
  return Array.prototype.reduce.call(namedNodeMap, function (pre, item, index, arr) {
    pre[item.nodeName] = item.value;
    return pre;
  }, {});
};

class BaseNode extends Node {
  constructor(opts) {
    super(opts);
    // Redux StateInterface
    this.addField = opts.addField;
    this.editField = opts.editField;
    this.deleteField = opts.deleteField
    // 
    this.options = opts;
    this.childData = opts.childData;
  }
  draw = (opts) => {
    const _this = this;
    let className = this.options.type;
    let container = $(`<div class="relational-section-base-node base-node section"></div>`)
      .css('top', opts.top + 'px')
      .css('left', opts.left + 'px')
      .addClass(className)
      .attr('id', opts.id)

    this._createTitle(container);
    this._createChildNode(container);

    return container[0];
  }

  _createTitle(dom) {
    const _this = this;

    let title = $(`
    <div class='title'>
      <span>${this.options.name}</span>
    </div>`);

    dom.append(title);

    let addInput = $(`<div class="addInput noFields"><input type="text" placeholder="Название"/><button class="addButton"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.813 1.4129C9.813 1.19731 9.72735 0.990541 9.57491 0.838092C9.42246 0.685643 9.21569 0.599998 9.0001 0.599998C8.7845 0.599998 8.57774 0.685643 8.42529 0.838092C8.27284 0.990541 8.18719 1.19731 8.18719 1.4129V8.18709H1.413C1.19741 8.18709 0.99064 8.27274 0.838191 8.42519C0.685742 8.57764 0.600098 8.7844 0.600098 9C0.600098 9.21559 0.685742 9.42236 0.838191 9.57481C0.99064 9.72726 1.19741 9.8129 1.413 9.8129H8.18719V16.5871C8.18719 16.8027 8.27284 17.0095 8.42529 17.1619C8.57774 17.3144 8.7845 17.4 9.0001 17.4C9.21569 17.4 9.42246 17.3144 9.57491 17.1619C9.72735 17.0095 9.813 16.8027 9.813 16.5871V9.8129H16.5872C16.8028 9.8129 17.0096 9.72726 17.162 9.57481C17.3145 9.42236 17.4001 9.21559 17.4001 9C17.4001 8.7844 17.3145 8.57764 17.162 8.42519C17.0096 8.27274 16.8028 8.18709 16.5872 8.18709H9.813V1.4129Z" fill="white" fill-opacity="0.9"/>
    </button><span class="caption">Добавить поле</span>
    </div>`);

    dom.append(addInput);

    dom.find('.addInput').on('click', function (e) {
      if (this.classList.contains('noFields')) {
        this.classList.remove('noFields');


        const fieldNumber = _this.dom.querySelectorAll('.content').length + 1
        const name = `Пункт ${_this.options.type === 'guide' ? 'справочника' : 'раздела'} ` + fieldNumber;

        _this._onAddNode(name);
      }
    });

    dom.find('.addButton').on('click', function (e) {
      e.target.closest('.addInput').classList.remove('noFields');
      const value = e.target.closest('.addInput').querySelector('input').value;
      e.target.closest('.addInput').querySelector('input').value = '';

      _this._onAddNode(value);
    });
    // this._createChildNode(addInput);
    // this._onRemovedNode(title, true);
  }

  _createChildNode(dom) {
    const _this = this;

    $.each(this.childData, (i, { id, name, sourceNodeId, targetNodeId }) => {
      dom.append(`
      <div class="content" data-id="${id}" source-id="${sourceNodeId}" target-id="${targetNodeId}">
        <div class="targetEndPoint butterflie-circle-endpoint" id="${targetNodeId}"></div>
        <span class="remove"><i class="iconfont">&#xe654;</i></span>
        <span class="text">${name}</span>
        <span class="edit"><i class="iconfont">&#xe66d;</i></span>
        <div class="sourceEndPoint butterflie-circle-endpoint" id="${sourceNodeId}"></div>
      </div>`);
    });



    let childNode = dom.find('.content');

    // this._onRemovedNode(childNode);
    // this._onEditNode(childNode);
    // 


    // childNode.on('click', function (e) {
    //   console.log(this)
    //   if (!e.target.classList.contains('iconfont') && !e.target.classList.contains('remove')) {
    //     // Declosure

    //     const fieldIndex = new Array.from(e.target.closest('.relational-section-base-node').querySelectorAll('.content')).indexOf(e.target.classList.contains('.content') ? e.target : e.target.closest('.content'));

    //     _this.options.onClickSecondfield('second', _this.id, fieldIndex);
    //   }
    // })



  }

  mounted = () => {
    this.childData.forEach((({ sourceNodeId, targetNodeId }) => {
      this.addEndpoint({
        id: sourceNodeId,
        type: 'source',
        dom: document.getElementById(sourceNodeId),
      });
      this.addEndpoint({
        id: targetNodeId,
        type: 'target',
        dom: document.getElementById(targetNodeId),
      });
    }));
    this.emit('node-mounted', this.id);
  }

  _onRemovedNode(dom, fullRemove) {
    const _this = this;
    dom.find('.remove').on('click', function (e) {
      const attr = getAttrObj(this.parentNode.attributes);
      _this.childData = _this.childData.filter(item => item.id != attr['data-id']);
      this.parentNode.remove();
      _this.endpoints.forEach((_point) => {
        _point.updatePos();
      });
      _this.removeEndpoint(attr['source-id']);
      _this.removeEndpoint(attr['target-id']);

      if (fullRemove) {
        _this.options.deleteNode(_this.id);
      } else {
        _this.options.deleteField(_this.id, $(this).index() - 1);
        if (!_this.dom.querySelector('.content')) {
          _this.dom.querySelector('.addInput').classList.add('noFields');
        }
      }
    });
  }

  _onEditNode(dom) {
    const _this = this;

    dom.find('.edit').click(function () {
      const oldNode = $(this).prev('.text');
      const oldNodeText = $(this).prev('.text').text();

      const fieldIndex = $(this).parent('.content').index() - 1;

      if ($(oldNode.html()).attr('type') !== 'text') {
        oldNode.html(`<input type=text class=input-text />`);
        $(oldNode).find('input').focus().val(oldNodeText);
        oldNode.children().keyup(function (event) {
          if (event.keyCode === 13 || event.keyCode === 27) {
            const oldInputText = $(this).val();

            oldNode.text(oldInputText);

            _this.childData[fieldIndex] = { ..._this.childData[fieldIndex], name: oldInputText };
            _this.editField(_this.id, fieldIndex, _this.childData[fieldIndex]);
          }
        });
      }
    });
  }

  _generateChildData(name) {
    const nodes = window.myCanv.canv.getDataMap().nodes;
    let lastIdSection = 3 * (nodes.reduce((acc, cur) => {
      return cur.childData.length + acc
    }, 0));


    const numId = lastIdSection;
    const numSourceNodeId = ++lastIdSection;
    const numTargetNodeId = ++lastIdSection;

    return {
      id: 'field-' + numId,
      sourceNodeId: 'source-endpoint-' + numSourceNodeId,
      targetNodeId: 'target-endpoint-' + numTargetNodeId,
      name,
    };
  }

  _onAddNode(value) {
    const _this = this;
    const fieldNumber = _this.dom.querySelectorAll('.content').length + 1
    const name = (value.length === 0 ? `Пункт ${_this.options.type === 'guide' ? 'справочника' : 'раздела'} ` + (fieldNumber) : value);

    const fieldData = _this._generateChildData(name, _this.options.id);

    $(_this.dom).find('.addInput').before(`
        <div class="content" data-id="${fieldData.id}" source-id="${fieldData.sourceNodeId}" target-id="${fieldData.targetNodeId}">
        <div class="targetEndPoint butterflie-circle-endpoint" id="${fieldData.targetNodeId}"></div>
          <span class="text">${name}</span>
          <span class='remove'><i class="iconfont">&#xe654;</i></span>
          <div class="sourceEndPoint butterflie-circle-endpoint" id="${fieldData.sourceNodeId}"></div>
        </div > `);


    this.childData.push(fieldData);

    _this.addField(this.id, fieldData);

    this.childData.forEach((({ sourceNodeId, targetNodeId }) => {
      this.addEndpoint({
        id: sourceNodeId,
        type: 'source',
        dom: document.getElementById(sourceNodeId),

      });
      this.addEndpoint({
        id: targetNodeId,
        type: 'target',
        dom: document.getElementById(targetNodeId),

      });
    }));
    setTimeout(() => console.log('fjdk', this), 2000)

    this._onRemovedNode($(this.dom).find('.content').eq(fieldNumber - 1));

    $(this.dom).find(`div[data-id=${fieldData.id}]`).on('click', function (e) {
      if (!e.target.classList.contains('remove') && !e.target.classList.contains('iconfont')) {
        _this.options.onClickField(_this.id, $(this).index() - 1, _this.options.type);
      }
    })

  }

  updateField(index, value) {
    const field = $(this.dom).find('.text').eq(index);
    field.text(value);

    // this.updateSubNodeC(index, value)
    // this.options.data.content[index] = { ...this.options.data.content[index], content: value }
  }

  // updateBaseNode(index, value) {
  //   const baseNodeTitle = $(this.dom).find('.title span:nth-child(2)').eq(index);
  //   baseNodeTitle.text(value);
  //   this.options.name = value;
  // }

}


export { BaseNode };


