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
      <span class="titleText">${this.options.name}</span><span class="nodeSettings"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.01066 0.875C8.62225 0.88205 9.2315 0.952717 9.82858 1.08587C10.0892 1.14399 10.2841 1.36126 10.3137 1.62663L10.4555 2.89901C10.5197 3.48322 11.013 3.9257 11.601 3.92632C11.7591 3.92657 11.9154 3.89365 12.0615 3.82902L13.2287 3.3163C13.4714 3.20966 13.7551 3.2678 13.9362 3.46135C14.7797 4.3622 15.4079 5.44263 15.7736 6.62132C15.8524 6.87548 15.7617 7.15169 15.5474 7.30958L14.5129 8.07217C14.2177 8.289 14.0435 8.63333 14.0435 8.99958C14.0435 9.36575 14.2177 9.71008 14.5135 9.92742L15.549 10.6903C15.7632 10.8481 15.8541 11.1243 15.7752 11.3786C15.4097 12.5571 14.7819 13.6374 13.9389 14.5384C13.7578 14.7319 13.4745 14.7902 13.2317 14.6838L12.0597 14.1704C11.7245 14.0237 11.3394 14.0452 11.0226 14.2283C10.7057 14.4114 10.4949 14.7343 10.4546 15.0981L10.3137 16.3703C10.2847 16.6327 10.0939 16.8485 9.83716 16.9096C8.63017 17.1968 7.37258 17.1968 6.16552 16.9096C5.90874 16.8485 5.71802 16.6327 5.68897 16.3703L5.54829 15.1C5.50697 14.7369 5.29577 14.415 4.97917 14.2325C4.66258 14.05 4.27816 14.0286 3.94399 14.1745L2.7718 14.688C2.52901 14.7944 2.24552 14.7361 2.06447 14.5424C1.22101 13.6404 0.593148 12.5588 0.228157 11.379C0.14954 11.1249 0.240373 10.8488 0.454523 10.6911L1.49064 9.92775C1.78576 9.71092 1.96005 9.36658 1.96005 9.00042C1.96005 8.63417 1.78576 8.28983 1.49025 8.07275L0.45479 7.31071C0.240315 7.15287 0.149398 6.87648 0.228298 6.62215C0.593923 5.44346 1.22211 4.36303 2.06559 3.46218C2.24682 3.26863 2.53044 3.21049 2.77319 3.31713L3.94017 3.82977C4.27596 3.97713 4.66199 3.95487 4.9803 3.76891C5.29723 3.58508 5.50822 3.26185 5.54896 2.89803L5.69069 1.62663C5.72029 1.36112 5.91537 1.14378 6.17616 1.08578C6.77392 0.95285 7.38375 0.882208 8.01066 0.875ZM8.01075 2.12492C7.63242 2.12937 7.25508 2.16202 6.882 2.22252L6.79125 3.03682C6.70642 3.79473 6.26718 4.46752 5.60917 4.84919C4.94713 5.23597 4.13996 5.28252 3.43764 4.97431L2.68907 4.64547C2.21246 5.22394 1.83311 5.87612 1.56592 6.5764L2.23076 7.06566C2.84643 7.518 3.21005 8.23642 3.21005 9.00042C3.21005 9.76433 2.84643 10.4827 2.23141 10.9346L1.56552 11.4252C1.83247 12.1267 2.21189 12.7801 2.68882 13.3597L3.4431 13.0293C4.14151 12.7243 4.94319 12.7689 5.60343 13.1495C6.26367 13.5301 6.70408 14.2014 6.7905 14.9605L6.88125 15.7804C7.62267 15.9065 8.38 15.9065 9.12142 15.7804L9.21216 14.9606C9.29617 14.2017 9.73608 13.5281 10.3972 13.1461C11.0582 12.764 11.8615 12.7192 12.5612 13.0254L13.3148 13.3556C13.7913 12.7769 14.1706 12.1246 14.4377 11.4242L13.7727 10.9342C13.1571 10.4819 12.7935 9.7635 12.7935 8.99958C12.7935 8.23558 13.1571 7.51717 13.772 7.06539L14.4361 6.57591C14.1689 5.87551 13.7895 5.2232 13.3128 4.64463L12.5657 4.97281C12.2612 5.10751 11.932 5.17683 11.5994 5.17632C10.3747 5.17503 9.34675 4.25296 9.21308 3.03653L9.12233 2.22225C8.75108 2.16183 8.37767 2.12927 8.01075 2.12492ZM8.00025 5.87496C9.72617 5.87496 11.1252 7.27407 11.1252 9C11.1252 10.7258 9.72617 12.125 8.00025 12.125C6.27435 12.125 4.87523 10.7258 4.87523 9C4.87523 7.27407 6.27435 5.87496 8.00025 5.87496ZM8.00025 7.12496C6.96467 7.12496 6.12523 7.96442 6.12523 9C6.12523 10.0355 6.96467 10.875 8.00025 10.875C9.03575 10.875 9.87525 10.0355 9.87525 9C9.87525 7.96442 9.03575 7.12496 8.00025 7.12496Z" fill="white"/>
      </svg>
      </span>
    </div>`);

    dom.append(title);

    let addInput = $(`<div class="addInput noFields"><input type="text" placeholder="Название"/><button class="addButton"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.813 1.4129C9.813 1.19731 9.72735 0.990541 9.57491 0.838092C9.42246 0.685643 9.21569 0.599998 9.0001 0.599998C8.7845 0.599998 8.57774 0.685643 8.42529 0.838092C8.27284 0.990541 8.18719 1.19731 8.18719 1.4129V8.18709H1.413C1.19741 8.18709 0.99064 8.27274 0.838191 8.42519C0.685742 8.57764 0.600098 8.7844 0.600098 9C0.600098 9.21559 0.685742 9.42236 0.838191 9.57481C0.99064 9.72726 1.19741 9.8129 1.413 9.8129H8.18719V16.5871C8.18719 16.8027 8.27284 17.0095 8.42529 17.1619C8.57774 17.3144 8.7845 17.4 9.0001 17.4C9.21569 17.4 9.42246 17.3144 9.57491 17.1619C9.72735 17.0095 9.813 16.8027 9.813 16.5871V9.8129H16.5872C16.8028 9.8129 17.0096 9.72726 17.162 9.57481C17.3145 9.42236 17.4001 9.21559 17.4001 9C17.4001 8.7844 17.3145 8.57764 17.162 8.42519C17.0096 8.27274 16.8028 8.18709 16.5872 8.18709H9.813V1.4129Z" fill="white" fill-opacity="0.9"/>
    </button><span class="caption">Добавить поле</span>
    </div>`);

    dom.append(addInput);

    dom.find('.nodeSettings').on('click', function (e) {
      _this.options.onClickNode(_this.id);
    });

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

  updateBaseNode(index, value) {
    const baseNodeTitle = $(this.dom).find('.title span:nth-child(1)').eq(index);
    baseNodeTitle.text(value);
    this.options.name = value;
  }

}


export { BaseNode };


