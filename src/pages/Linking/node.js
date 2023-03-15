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
    let className = this.options.type;
    let container = $('<div class="relational-section-base-node base-node"></div>')
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
      <span class="remove"><i class="iconfont">&#xe654;</i></span>
      <span>${this.options.name}</span>
      <span class="add-node"><i class="iconfont">&#xe6a1;</i></span>
    </div>`);

    dom.append(title);
    this._onAddNode(title);
    this._onRemovedNode(title, true);
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

    this._onRemovedNode(childNode);
    this._onEditNode(childNode);
    // 


    dom.on('click', function (e) {
      if ($(e.target).parents(".title").length !== 1 && !e.target.classList.contains('iconfont')) {
        // Declosure

        const subNodeIndex = Array.from(e.target.closest('.relational-section-base-node').querySelectorAll('.content')).indexOf(e.target.closest('.content'));

        _this.options.onClickSecondSubNode('second', _this.id, subNodeIndex);
      }
    })



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
    dom.find('.remove').on('click', function () {
      const attr = getAttrObj(this.parentNode.attributes);
      _this.childData = _this.childData.filter(item => item.id !== attr['data-id']);
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

  _onAddNode(dom) {
    const _this = this;
    dom.find('.add-node').click(() => {
      let code = '';
      const codeLength = 4;
      const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

      for (let i = 0; i < codeLength; i++) {
        const index = Math.floor(Math.random() * 36);
        code += random[index];
      }
      const sectionData = _this.options.generateChildData(code, _this.options.id);


      dom.parent('.base-node').append(`
        <div class="content" data-id="${sectionData.id}" source-id="${sectionData.sourceNodeId}" target-id="${sectionData.targetNodeId}">
        <div class="targetEndPoint butterflie-circle-endpoint" id="${sectionData.targetNodeId}"></div>
          <span class='remove'><i class="iconfont">&#xe654;</i></span>
          <span class="text">${code}</span>
          <span class="edit"><i class="iconfont">&#xe66d;</i></span>
          <div class="sourceEndPoint butterflie-circle-endpoint" id="${sectionData.sourceNodeId}"></div>
        </div>`);


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



      this._onRemovedNode($('.content'));
      this._onEditNode($('.content'));
    });
  }

  updateNode(index, value) {
    const subNode = $(this.dom).find('.text').eq(index);
    subNode.text(value);
    this.options.updateSubNodeC(index, value)
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
    let className = this.options.type;
    let container = $('<div class="relational-section-base-node base-node  base-node-static"></div>')
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

    </div>`);

    dom.append(title);
  }

  _createChildNode(dom) {
    const _this = this;
    $.each(this.childData, (i, { id, content, sourceNodeId, targetNodeId }) => {
      dom.append(`
      <div class="content" data-id="${id}" source-id="${sourceNodeId}" target-id="${targetNodeId}">
        <div class="targetEndPoint butterflie-circle-endpoint" id="${targetNodeId}"></div>

        <span class="text">${content}</span>
      <span class="add">+</span>
        <div class="sourceEndPoint butterflie-circle-endpoint" id="${sourceNodeId}"></div>
      </div>`);
    });

    $(dom).find('.add').on('click', function () {
      _this.emit('customCreateNode', { name: _this.childData.find(({ id }) => id === $(this).parents('.content').attr('data-id')).content, parentSectionId: $(this).parents('.content').attr('data-id') });
    });

    $(dom).find('.content').on('click', function (e) {
      if (!e.target.classList.contains('add')) {
        _this.options.onClickSection(($(this).index() - 1).toString());
      }
    })

  }

  updateNode(index, value) {
    const section = $(this.dom).find('.text').eq(index);

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


