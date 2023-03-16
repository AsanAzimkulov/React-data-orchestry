import { Node } from 'butterfly-dag';
import $ from 'jquery';
// import '../../static/iconfont.css';

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
    this.addSubNode = opts.addSubNode;
    this.editSubNode = opts.editSubNode;
    this.deleteSubNode = opts.deleteSubNode
    // 
    this.options = opts;
    this.childData = opts.data.content;
  }
  draw = (opts) => {
    const _this = this;
    let className = this.options.type;
    let container = $('<div class="relational-section-base-node base-node section"></div>')
      .css('top', opts.top + 'px')
      .css('left', opts.left + 'px')
      .addClass(className)
      .attr('id', opts.id);

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

    let addInput = $(`<div class="addInput noSubnodes"><input type="text" placeholder="Название"/><button class="addButton"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.813 1.4129C9.813 1.19731 9.72735 0.990541 9.57491 0.838092C9.42246 0.685643 9.21569 0.599998 9.0001 0.599998C8.7845 0.599998 8.57774 0.685643 8.42529 0.838092C8.27284 0.990541 8.18719 1.19731 8.18719 1.4129V8.18709H1.413C1.19741 8.18709 0.99064 8.27274 0.838191 8.42519C0.685742 8.57764 0.600098 8.7844 0.600098 9C0.600098 9.21559 0.685742 9.42236 0.838191 9.57481C0.99064 9.72726 1.19741 9.8129 1.413 9.8129H8.18719V16.5871C8.18719 16.8027 8.27284 17.0095 8.42529 17.1619C8.57774 17.3144 8.7845 17.4 9.0001 17.4C9.21569 17.4 9.42246 17.3144 9.57491 17.1619C9.72735 17.0095 9.813 16.8027 9.813 16.5871V9.8129H16.5872C16.8028 9.8129 17.0096 9.72726 17.162 9.57481C17.3145 9.42236 17.4001 9.21559 17.4001 9C17.4001 8.7844 17.3145 8.57764 17.162 8.42519C17.0096 8.27274 16.8028 8.18709 16.5872 8.18709H9.813V1.4129Z" fill="white" fill-opacity="0.9"/>
    </button><span class="caption">Добавить поле</span>
    </div>`);

    dom.append(addInput);

    dom.find('.addInput').on('click', function (e) {
      if (this.classList.contains('noSubnodes')) {
        this.classList.remove('noSubnodes');


        const subnodeNumber = _this.dom.querySelectorAll('.content').length + 1
        const name = 'Пункт раздела ' + subnodeNumber;

        _this._onAddNode(name);
      }
    });

    dom.find('.addButton').on('click', function (e) {
      e.target.closest('.addInput').classList.remove('noSubnodes');
      const value = e.target.closest('.addInput').querySelector('input').value;
      e.target.closest('.addInput').querySelector('input').value = '';

      _this._onAddNode(value);
    });
    // this._createChildNode(addInput);
    // this._onRemovedNode(title, true);
  }

  _createChildNode(dom) {
    const _this = this;

    $.each(this.childData, (i, { id, content, sourceNodeId, targetNodeId }) => {
      dom.append(`
      <div class="content" data-id="${id}" source-id="${sourceNodeId}" target-id="${targetNodeId}">
        <div class="targetEndPoint butterflie-circle-endpoint" id="${targetNodeId}"></div>
        <span class="remove"><i class="iconfont">&#xe654;</i></span>
        <span class="text">${content}</span>
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

    //     const subNodeIndex = new Array.from(e.target.closest('.relational-section-base-node').querySelectorAll('.content')).indexOf(e.target.classList.contains('.content') ? e.target : e.target.closest('.content'));

    //     _this.options.onClickSecondSubNode('second', _this.id, subNodeIndex);
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
        _this.options.deleteNode('second', _this.id, _this.options.parentSectionId);
      } else {
        _this.options.deleteSubNode('second', _this.id, attr['data-id']);
        if (!_this.dom.querySelector('.content')) {
          _this.dom.querySelector('.addInput').classList.add('noSubnodes');
        }
      }
    });
  }

  _onEditNode(dom) {
    const _this = this;

    dom.find('.edit').click(function () {
      const oldNode = $(this).prev('.text');
      const oldNodeText = $(this).prev('.text').text();

      const subNodeIndex = $(this).parent('.content').index() - 1;

      if ($(oldNode.html()).attr('type') !== 'text') {
        oldNode.html(`<input type=text class=input-text />`);
        $(oldNode).find('input').focus().val(oldNodeText);
        oldNode.children().keyup(function (event) {
          if (event.keyCode === 13 || event.keyCode === 27) {
            const oldInputText = $(this).val();

            oldNode.text(oldInputText);

            _this.childData[subNodeIndex] = { ..._this.childData[subNodeIndex], content: oldInputText };
            _this.editSubNode('second', _this.id, subNodeIndex, _this.childData[subNodeIndex]);
          }
        });
      }
    });
  }

  _onAddNode(value) {
    const _this = this;
    const subnodeNumber = _this.dom.querySelectorAll('.content').length + 1
    const name = (value.length === 0 ? 'Пункт раздела ' + (subnodeNumber) : value);

    const sectionData = _this.options.generateChildData(name, _this.options.id);

    $(_this.dom).find('.addInput').before(`
        <div class="content" data-id="${sectionData.id}" source-id="${sectionData.sourceNodeId}" target-id="${sectionData.targetNodeId}">
        <div class="targetEndPoint butterflie-circle-endpoint" id="${sectionData.targetNodeId}"></div>
          <span class="text">${name}</span>
          <span class='remove'><i class="iconfont">&#xe654;</i></span>
          <div class="sourceEndPoint butterflie-circle-endpoint" id="${sectionData.sourceNodeId}"></div>
        </div > `);


    this.childData.push(sectionData);
    _this.addSubNode('second', this.id, sectionData);

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


    this._onRemovedNode($(this.dom).find('.content'));

    $(this.dom).find('.content').on('click', function (e) {
      if (!e.target.classList.contains('remove') && !e.target.classList.contains('iconfont')) {
        _this.options.onClickSecondSubNode('second', _this.id, ($(this).index() - 1).toString());
      }
    })

  }

  updateNode(index, value) {
    const subNode = $(this.dom).find('.text').eq(index);
    subNode.text(value);
    // this.updateSubNodeC(index, value)
    // this.options.data.content[index] = { ...this.options.data.content[index], content: value }
  }

  updateBaseNode(index, value) {
    const baseNodeTitle = $(this.dom).find('.title span:nth-child(2)').eq(index);
    baseNodeTitle.text(value);
    this.options.name = value;
  }

}


class BaseNodeStatic extends Node {
  constructor(opts) {
    super(opts);
    this.options = opts;
    this.childData = opts.data.content;
  }
  draw = (opts) => {
    document.querySelector(this.options.slotSelector).innerHtml = '';

    let className = this.options.type;
    let container = $('<div class="relational-section-base-node base-node base-node-static"></div>')
      .css('top', opts.top + 'px')
      .css('left', opts.left + 'px')
      .addClass(className)
      .attr('id', opts.id);

    this._createTitle(container);
    this._createChildNode(container);

    return container[0];
  }

  _createTitle(dom) {
    let title = $(`
    <div class='title'>
      <span>${this.options.name}</span>
    </div > `);

    dom.append(title);
  }

  _createChildNode() {
    const dom = document.querySelector(this.options.slotSelector)
    const _this = this;
    $.each(this.childData, (i, { id, content, sourceNodeId, targetNodeId }) => {
      $(this.options.slotSelector).append(`
  <div class="content ${i === 0 ? 'active' : ''}" data-id="${id}" source-id="${sourceNodeId}" target-id="${targetNodeId}" >
        <div class="targetEndPoint butterflie-circle-endpoint" id="${targetNodeId}"></div>
        <div class="first">
        <span class="check"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" rx="10" fill="#2390DF"/>
        <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="white" stroke-opacity="0.18"/>
        <path d="M7.65847 13.0491L5.12981 10.5205C5.00407 10.399 4.83567 10.3318 4.66087 10.3334C4.48608 10.3349 4.31887 10.405 4.19526 10.5286C4.07166 10.6522 4.00154 10.8194 4.00003 10.9942C3.99851 11.169 4.0657 11.3374 4.18714 11.4631L7.18714 14.4631C7.31216 14.5881 7.4817 14.6583 7.65847 14.6583C7.83525 14.6583 8.00479 14.5881 8.12981 14.4631L15.4631 7.12981C15.5846 7.00407 15.6518 6.83567 15.6503 6.66087C15.6487 6.48608 15.5786 6.31887 15.455 6.19526C15.3314 6.07166 15.1642 6.00154 14.9894 6.00003C14.8146 5.99851 14.6462 6.0657 14.5205 6.18714L7.65847 13.0491Z" fill="white"/>
        </svg>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="white" stroke-opacity="0.18"/>
</svg>
</span>
        <span class="text">${content}</span>
        </div>
        <div class="second">
          <span class="settings"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.01066 0.875C8.62225 0.88205 9.2315 0.952717 9.82858 1.08587C10.0892 1.14399 10.2841 1.36126 10.3137 1.62663L10.4555 2.89901C10.5197 3.48322 11.013 3.9257 11.601 3.92632C11.7591 3.92657 11.9154 3.89365 12.0615 3.82902L13.2287 3.3163C13.4714 3.20966 13.7551 3.2678 13.9362 3.46135C14.7797 4.3622 15.4079 5.44263 15.7736 6.62132C15.8524 6.87548 15.7617 7.15169 15.5474 7.30958L14.5129 8.07217C14.2177 8.289 14.0435 8.63333 14.0435 8.99958C14.0435 9.36575 14.2177 9.71008 14.5135 9.92742L15.549 10.6903C15.7632 10.8481 15.8541 11.1243 15.7752 11.3786C15.4097 12.5571 14.7819 13.6374 13.9389 14.5384C13.7578 14.7319 13.4745 14.7902 13.2317 14.6838L12.0597 14.1704C11.7245 14.0237 11.3394 14.0452 11.0226 14.2283C10.7057 14.4114 10.4949 14.7343 10.4546 15.0981L10.3137 16.3703C10.2847 16.6327 10.0939 16.8485 9.83716 16.9096C8.63017 17.1968 7.37258 17.1968 6.16552 16.9096C5.90874 16.8485 5.71802 16.6327 5.68897 16.3703L5.54829 15.1C5.50697 14.7369 5.29577 14.415 4.97917 14.2325C4.66258 14.05 4.27816 14.0286 3.94399 14.1745L2.7718 14.688C2.52901 14.7944 2.24552 14.7361 2.06447 14.5424C1.22101 13.6404 0.593148 12.5588 0.228157 11.379C0.14954 11.1249 0.240373 10.8488 0.454523 10.6911L1.49064 9.92775C1.78576 9.71092 1.96005 9.36658 1.96005 9.00042C1.96005 8.63417 1.78576 8.28983 1.49025 8.07275L0.45479 7.31071C0.240315 7.15287 0.149398 6.87648 0.228298 6.62215C0.593923 5.44346 1.22211 4.36303 2.06559 3.46218C2.24682 3.26863 2.53044 3.21049 2.77319 3.31713L3.94017 3.82977C4.27596 3.97713 4.66199 3.95487 4.9803 3.76891C5.29723 3.58508 5.50822 3.26185 5.54896 2.89803L5.69069 1.62663C5.72029 1.36112 5.91537 1.14378 6.17616 1.08578C6.77392 0.95285 7.38375 0.882208 8.01066 0.875ZM8.01075 2.12492C7.63242 2.12937 7.25508 2.16202 6.882 2.22252L6.79125 3.03682C6.70642 3.79473 6.26718 4.46752 5.60917 4.84919C4.94713 5.23597 4.13996 5.28252 3.43764 4.97431L2.68907 4.64547C2.21246 5.22394 1.83311 5.87612 1.56592 6.5764L2.23076 7.06566C2.84643 7.518 3.21005 8.23642 3.21005 9.00042C3.21005 9.76433 2.84643 10.4827 2.23141 10.9346L1.56552 11.4252C1.83247 12.1267 2.21189 12.7801 2.68882 13.3597L3.4431 13.0293C4.14151 12.7243 4.94319 12.7689 5.60343 13.1495C6.26367 13.5301 6.70408 14.2014 6.7905 14.9605L6.88125 15.7804C7.62267 15.9065 8.38 15.9065 9.12142 15.7804L9.21216 14.9606C9.29617 14.2017 9.73608 13.5281 10.3972 13.1461C11.0582 12.764 11.8615 12.7192 12.5612 13.0254L13.3148 13.3556C13.7913 12.7769 14.1706 12.1246 14.4377 11.4242L13.7727 10.9342C13.1571 10.4819 12.7935 9.7635 12.7935 8.99958C12.7935 8.23558 13.1571 7.51717 13.772 7.06539L14.4361 6.57591C14.1689 5.87551 13.7895 5.2232 13.3128 4.64463L12.5657 4.97281C12.2612 5.10751 11.932 5.17683 11.5994 5.17632C10.3747 5.17503 9.34675 4.25296 9.21308 3.03653L9.12233 2.22225C8.75108 2.16183 8.37767 2.12927 8.01075 2.12492ZM8.00025 5.87496C9.72617 5.87496 11.1252 7.27407 11.1252 9C11.1252 10.7258 9.72617 12.125 8.00025 12.125C6.27435 12.125 4.87523 10.7258 4.87523 9C4.87523 7.27407 6.27435 5.87496 8.00025 5.87496ZM8.00025 7.12496C6.96467 7.12496 6.12523 7.96442 6.12523 9C6.12523 10.0355 6.96467 10.875 8.00025 10.875C9.03575 10.875 9.87525 10.0355 9.87525 9C9.87525 7.96442 9.03575 7.12496 8.00025 7.12496Z" fill="white"/>
          </svg>
          </span>
          <span class="add"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.67742 0.677419C7.67742 0.497757 7.60605 0.325452 7.47901 0.198411C7.35197 0.0713707 7.17966 0 7 0C6.82034 0 6.64803 0.0713707 6.52099 0.198411C6.39395 0.325452 6.32258 0.497757 6.32258 0.677419V6.32258H0.677419C0.497757 6.32258 0.325452 6.39395 0.198411 6.52099C0.0713707 6.64803 0 6.82034 0 7C0 7.17966 0.0713707 7.35197 0.198411 7.47901C0.325452 7.60605 0.497757 7.67742 0.677419 7.67742H6.32258V13.3226C6.32258 13.5022 6.39395 13.6745 6.52099 13.8016C6.64803 13.9286 6.82034 14 7 14C7.17966 14 7.35197 13.9286 7.47901 13.8016C7.60605 13.6745 7.67742 13.5022 7.67742 13.3226V7.67742H13.3226C13.5022 7.67742 13.6745 7.60605 13.8016 7.47901C13.9286 7.35197 14 7.17966 14 7C14 6.82034 13.9286 6.64803 13.8016 6.52099C13.6745 6.39395 13.5022 6.32258 13.3226 6.32258H7.67742V0.677419Z" fill="white"/>
          </svg>
          </span>
        </div>
        <div class="sourceEndPoint butterflie-circle-endpoint" id="${sourceNodeId}"></div>
      </div > `);
    });

    // Positioning of nodes
    const nodeWidth = 200;
    const nodeOrdinaryHeight = 300;
    const horizontalShift = 248;
    const verticalShift = 348;



    const initialCords = {
      x: 91,
      y: 223,
    }

    const cords = {
      x: initialCords.x - horizontalShift,
      y: initialCords.y,
    }

    function calculateCords() {

      const canvasWidth = document.querySelector('.butterfly-selected-canvas').getAttribute('width');
      const canvasHeight = document.querySelector('.butterfly-selected-canvas').getAttribute('height');

      if ((cords.x + horizontalShift + nodeWidth) > canvasWidth) {
        cords.x = initialCords.x;
        cords.y += verticalShift;
        return {
          x: cords.x,
          y: cords.y
        }
      }

      if ((cords.y + verticalShift) > canvasHeight) {
        cords.y = initialCords.y;
        cords.x = initialCords.x;
        return {
          x: cords.x,
          y: cords.y
        }
      }

      cords.x += horizontalShift;

      return {
        x: cords.x,
        y: cords.y
      }
    }

    // 

    _this.options.rawNodes.forEach((rawNodesForSection, i) => {
      rawNodesForSection.forEach(rawNode => {
        _this.emit('customCreateNode', { name: rawNode, parentSectionId: i, cords: calculateCords() });
      })
    })

    $(dom).find('.add').on('click', function () {
      const name = _this.childData.find(({ id }) => id === $(this).parents('.content').attr('data-id')).content;
      _this.emit('customCreateNode', { name: name.length === 0 ? 'Пункт раздела ' + (1 + dom) : name, parentSectionId: $(this).parents('.content').attr('data-id') });
    });

    $(dom).find('.settings').on('click', function (e) {
      // if (e.target.parentNode.classList.contains('settings')) {
      console.log($(this).parents('.content').index())
      _this.options.onClickSection(($(this).parents('.content').index()).toString());
      // }
    })

    $(dom).find('.content').on('click', function (e) {
      if (e.target === this || e.target.classList.contains('text')) {
        $(dom).find('.content').removeClass('active');
        $(this).addClass('active');
        _this.options.setActiveSection($(this).index);
      }
    })

  }

  updateNode(index, value) {
    const dom = document.querySelector(this.options.slotSelector);
    const section = $(dom).find('.text').eq(index);

    section.text(value);
    this.childData[index].content = value;
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
  }


}

export { BaseNode, BaseNodeStatic };


